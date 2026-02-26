import {
  union as martUinion,
  diff as martDiff,
  type Geometry
} from 'martinez-polygon-clipping';

import { isoContours } from 'marching-squares';
import type { IPoint } from '@/shared/types';
import type { PolygonWithHoles } from '.';
import type { IPolygonPointsList } from '..';


export function getPolygonFromDraw(
  points: IPoint[],
  drawWidth: number,
  canvasWidth: number,
  canvasHeight: number,
): PolygonWithHoles {
  if (points.length < 2) return { outer: [], holes: [] };

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = drawWidth;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const bitmap: number[][] = [];
  for (let y = 0; y < canvas.height; y++) {
    bitmap[y] = [];
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      bitmap[y][x] = data[idx + 3] > 0 ? 1 : 0;
    }
  }

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      bitmap[y][x] = bitmap[y][x] ? 0 : 1;
    }
  }

  const contoursRaw = isoContours(bitmap, [0.5])[0]; 
  if (!contoursRaw || contoursRaw.length === 0) return { outer: [], holes: [] };

  contoursRaw.sort((a, b) => b.length - a.length);
  const outer = contoursRaw[0].map(([x, y]) => ({ x, y }));
  const holes = contoursRaw.slice(1).map(contour =>
    contour.map(([x, y]) => ({ x, y }))
  );

  return { outer, holes };
}

export function simplify(points: IPoint[], tolerance = 2): IPoint[] {
  if (points.length < 3) return points;

  const sqDist = (p1: IPoint, p2: IPoint) =>
    (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;

  const getPerpendicularDistance = (pt: IPoint, lineStart: IPoint, lineEnd: IPoint) => {
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    if (dx === 0 && dy === 0) return Math.sqrt(sqDist(pt, lineStart));
    const t = ((pt.x - lineStart.x) * dx + (pt.y - lineStart.y) * dy) / (dx * dx + dy * dy);
    const proj = { x: lineStart.x + t * dx, y: lineStart.y + t * dy };
    return Math.sqrt(sqDist(pt, proj));
  };

  const rdp = (pts: IPoint[], start: number, end: number, tol: number, out: IPoint[]) => {
    let maxDist = 0;
    let index = 0;
    for (let i = start + 1; i < end; i++) {
      const d = getPerpendicularDistance(pts[i], pts[start], pts[end]);
      if (d > maxDist) {
        maxDist = d;
        index = i;
      }
    }
    if (maxDist > tol) {
      rdp(pts, start, index, tol, out);
      rdp(pts, index, end, tol, out);
    } else {
      out.push(pts[start]);
    }
  };

  const result: IPoint[] = [];
  rdp(points, 0, points.length - 1, tolerance, result);
  result.push(points[points.length - 1]);
  return result;
}

function toMartinez(outer: IPoint[], inner?: IPoint[][]): Geometry {
  const polygon: [[number, number][], ...[number, number][][]] = [
    outer.map(p => [p.x, p.y] as [number, number]),
    ...(inner ? inner.map(hole => hole.map(p => [p.x, p.y] as [number, number])) : [])
  ];
  return polygon;
}

export function mergePolygonsSingle(
  polygonA: { outerCoords: IPoint[], innerCoords?: IPoint[][] },
  polygonB: { outerCoords: IPoint[] },
): IPolygonPointsList | null  {
  const polyA = toMartinez(polygonA.outerCoords, polygonA.innerCoords);
  const polyB = toMartinez(polygonB.outerCoords );
  const unionResult = martUinion(polyA, polyB);

  if (
    !unionResult ||
    unionResult.length !== 1
  ) return null;

  const combinedOuter: IPoint[] = (unionResult[0][0] as [number, number][]).map(
    ([x, y]) => ({ x, y })
  );
  const combinedHoles: IPoint[][] = [];

  for (const polygon of unionResult) {
    const [first, ...rest] = polygon as [[number, number][], ...[number, number][][]];
    if (rest.length) {
      combinedHoles.push(...rest.map(r => r.map(([x, y]) => ({ x, y }))));
    }

    if (polygon !== unionResult[0]) {
      combinedHoles.push(first.map(([x, y]) => ({ x, y })));
    }
  }

  return {
    outerCoords: combinedOuter,
    innerCoords: combinedHoles.length ? combinedHoles : undefined
  };
}

export function diffPolygonsSingle(
  polygonA: { outerCoords: IPoint[]; innerCoords?: IPoint[][] },
  polygonB: { outerCoords: IPoint[] },
): IPolygonPointsList | 'empty' | null {
  const polyA = toMartinez(polygonA.outerCoords, polygonA.innerCoords);
  const polyB = toMartinez(polygonB.outerCoords);

  const result = martDiff(polyA, polyB);

  if (!result) return null;
  if (result.length === 0) return 'empty';
  if (result.length > 1) return null;

  const polygon = result[0] as number[][][];

  if (!polygon || polygon.length === 0) return 'empty';

  const [outer, ...holes] = polygon;

  return {
    outerCoords: outer.map(([x, y]) => ({ x, y })),
    innerCoords: holes.length
      ? holes.map(hole =>
          hole.map(([x, y]) => ({ x, y }))
        )
      : undefined
  };
}
