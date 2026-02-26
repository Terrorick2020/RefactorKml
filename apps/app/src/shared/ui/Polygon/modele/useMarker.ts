import {
  useState,
  useRef,
  type MouseEvent,
} from 'react';

import type { TUseMarker, IIntersection } from './types';
import type { IPoint } from '@/shared/types';


const parseDrawPath = (path: string): IPoint[] => {
  const points: IPoint[] = [];

  const commands = path.match(/[ML]\s*[^ML]+/g);
  if (!commands) return points;

  for (const cmd of commands) {
    const coords = cmd.slice(1).trim().split(/\s+/).map(Number);
    if (coords.length === 2) {
      points.push({ x: coords[0], y: coords[1] });
    }
  }

  return points;
};

const filterPoints = (points: IPoint[], smoothingCoeff: number = 1): IPoint[] => {
  if (points.length <= 2) return points;

  const step = Math.max(1, Math.round(smoothingCoeff));
  return points.filter((_, index) => index % step === 0 || index === points.length - 1);
};

const getConvexHull = (points: IPoint[]): IPoint[] => {
  if (points.length <= 3) return points;

  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);

  const cross = (o: IPoint, a: IPoint, b: IPoint) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

  const lower: IPoint[] = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: IPoint[] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }

  upper.pop();
  lower.pop();

  return lower.concat(upper);
};

const getLineIntersection = (A: IPoint, B: IPoint, C: IPoint, D: IPoint): IPoint | null => {
  const a1 = B.y - A.y;
  const b1 = A.x - B.x;
  const c1 = a1 * A.x + b1 * A.y;

  const a2 = D.y - C.y;
  const b2 = C.x - D.x;
  const c2 = a2 * C.x + b2 * C.y;

  const det = a1 * b2 - a2 * b1;
  if (det === 0) return null;

  const x = (b2 * c1 - b1 * c2) / det;
  const y = (a1 * c2 - a2 * c1) / det;

  const onSegment = (P: IPoint, Q: IPoint, R: IPoint) =>
    R.x >= Math.min(P.x, Q.x) - 1e-6 &&
    R.x <= Math.max(P.x, Q.x) + 1e-6 &&
    R.y >= Math.min(P.y, Q.y) - 1e-6 &&
    R.y <= Math.max(P.y, Q.y) + 1e-6;

  if (onSegment(A, B, { x, y }) && onSegment(C, D, { x, y })) {
    return { x, y };
  }
  return null;
};

const getPolygonIntersections = (poly1: IPoint[], poly2: IPoint[]): IIntersection[] => {
  const intersections: IIntersection[] = [];

  for (let i = 0; i < poly1.length; i++) {
    const nextBIndx = (i + 1) % poly1.length;
    const A = poly1[i];
    const B = poly1[nextBIndx];

    for (let j = 0; j < poly2.length; j++) {
      const nextDIndx = (j + 1) % poly2.length;
      const C = poly2[j];
      const D = poly2[nextDIndx];

      const pt = getLineIntersection(A, B, C, D);
      if (pt) {
        intersections.push({
          poly1Indxs: {
            start: i,
            end: nextBIndx,
          },
          poly2Indxs: {
            start: j,
            end: nextDIndx,
          },
          point: pt,
        });
      }
    }
  }

  return intersections;
};

export const useMarker: TUseMarker = (pointsList, sepСoeff, setPointsList) => {
  const [drawPath, setDrawPath] = useState<string | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  const getSVGPoint = (e: MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse());
  };

  const handleDrawStart = (e: MouseEvent<SVGSVGElement>) => {
    if (e.target instanceof SVGCircleElement) return;

    isDrawingRef.current = true;
    const { x, y } = getSVGPoint(e);
    setDrawPath(`M ${x} ${y}`);
  };

  const handleDrawMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!isDrawingRef.current) return;

    const { x, y } = getSVGPoint(e);
    setDrawPath(prev => prev ? `${prev} L ${x} ${y}` : null);
  };

  const handleDrawEnd = () => {
    isDrawingRef.current = false;
    if (!drawPath) return;

    const pointsArray = parseDrawPath(drawPath);
    if(!pointsArray.length) return;

    const smoothCoeff = pointsArray.length > 20 ? sepСoeff * 2 : sepСoeff;
    const smoothedPoints = filterPoints(pointsArray, smoothCoeff);
    const hullPoints = getConvexHull(smoothedPoints);
    const intersectPoints = getPolygonIntersections(pointsList, hullPoints);

    if(intersectPoints.length > 1) {
      
    }

    setDrawPath(null);
  };

  return { drawPath, handleDrawStart, handleDrawMove, handleDrawEnd }
}
