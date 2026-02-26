import {
  PolygonContext,
  getPolygonFromDraw,
  simplify,
  mergePolygonsSingle,
  diffPolygonsSingle,
  type TUsePointInner,
  type TUseDrawInner,
  type TUseScissInner,
} from '.';

import {
  useState,
  useContext,
  useCallback,
  useRef,
  type PointerEvent
} from 'react';

import { throttle } from 'lodash';
import { EISPListType, type IPolygonPointsList } from '..';
import type { IPoint } from '@/shared/types';


export const usePointInner: TUsePointInner = (_, svgRef) => {
  const context = useContext(PolygonContext);

  const onPointMove = throttle((event: PointerEvent<SVGSVGElement>): void => {
    if (!context.calcValue.current) return;

    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();

      const isOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (isOutside) {
        onPointUp(event);
        return;
      }
    }

    const dx = event.clientX - context.calcValue.current.downPointValue.x;
    const dy = event.clientY - context.calcValue.current.downPointValue.y;
    context.setPointFromEvent.current(dx, dy);
  }, 10);

  const onPointUp = (event: PointerEvent<SVGSVGElement>): void => {
    context.setPLFigure.current();
    context.calcValue.current = null;
    event.stopPropagation();
  };

  return { onPointMove, onPointUp };
};

export const useDrawInner: TUseDrawInner = (polyRef, svgRef, drawWidth, pointsList, setPointsList) => {
  const initDown = useRef<boolean>(false);
  const [drawPath, setDrawPath] = useState<string | null>(null);
  const [cursorPoint, setCursorPoint] = useState<IPoint | null>(null);

  const onDrowDown = (_: PointerEvent<SVGSVGElement>): void => {
    initDown.current = true;
  }

  const onDrawMove = throttle((event: PointerEvent<SVGSVGElement>): void => {
    if (!svgRef.current) return;
    
    const svg = svgRef.current;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse()!);

    setCursorPoint({ x: svgPoint.x, y: svgPoint.y });

    if(initDown.current) setDrawPath(
      prev => prev
        ? `${prev} L ${svgPoint.x} ${svgPoint.y}`
        : `M ${svgPoint.x} ${svgPoint.y}`
    );
  }, 14)

  const onDrowUp = (_: PointerEvent<SVGSVGElement>): void => {
    initDown.current = false;

    if (polyRef.current && drawPath) {
      const matches = drawPath.match(/-?\d+(\.\d+)?/g) ?? [];
      const points: IPoint[] = matches
        .map(Number)
        .reduce<IPoint[]>((acc, val, i, arr) => {
          if (i % 2 === 0) {
            acc.push({ x: val, y: arr[i + 1] });
          }
          return acc;
        }, []);
      const rect = polyRef.current.getBoundingClientRect();
      const result = getPolygonFromDraw(
        points,
        drawWidth,
        rect.width,
        rect.height,
      )

      const simplCoeff = 3;
      const outSimpl= simplify(result.outer, simplCoeff);
      const holSimpl = result.holes.map(h => simplify(h, simplCoeff));

      let uptIndxs: number[] = [];
      let resMartItem: IPolygonPointsList = {
        outerCoords: outSimpl,
        innerCoords: holSimpl.length ? holSimpl : undefined,
      };

      for(let i = 0; i < pointsList.length; i++) {
        const innerRes = mergePolygonsSingle(
          {
            outerCoords: pointsList[i].outerCoords,
            innerCoords: pointsList[i].innerCoords,
          },
          resMartItem,
        )

        if(!innerRes) continue;

        resMartItem = innerRes;
        uptIndxs.push(i);
      }

      if(!uptIndxs.length) {
        setPointsList(EISPListType.Add)(resMartItem);
      } else if(uptIndxs.length === 1) {
        setPointsList(EISPListType.Upt, uptIndxs[0])(resMartItem);
      } else {
        setPointsList(EISPListType.Set)(
          [
            ...pointsList.filter((_, index) => !uptIndxs.includes(index)),
            resMartItem,
          ]
        );
      };
    };

    setDrawPath(null);
  }

  const onDrowLeave = (event: PointerEvent<SVGSVGElement>): void => {
    onDrowUp(event);
    setCursorPoint(null);
  }

  return { drawPath, cursorPoint, onDrowDown, onDrawMove, onDrowUp, onDrowLeave };
};

export const useScissInner: TUseScissInner = (_polyRef, svgRef, pointsList, setPointsList) => {
  const [scissorPoints, setScissorPoints] = useState<IPoint[]>([]);
  const [isClosed, setIsClosed] = useState(false);

  const getMousePosition = (e: PointerEvent): IPoint | null => {
    const svg = svgRef.current;
    if (!svg) return null;

    const rect = svg.getBoundingClientRect();

    return {
      x: ((e.clientX - rect.left) / rect.width) * svg.viewBox.baseVal.width,
      y: ((e.clientY - rect.top) / rect.height) * svg.viewBox.baseVal.height,
    };
  };

  const isNearFirstPoint = (point: IPoint) => {
    if (!scissorPoints.length) return false;

    const first = scissorPoints[0];
    const dist = Math.sqrt(
      Math.pow(point.x - first.x, 2) +
      Math.pow(point.y - first.y, 2)
    );

    return dist < 10;
  };

  const onScissorsDown = useCallback(
    (e: PointerEvent) => {
      if (isClosed) return;

      const point = getMousePosition(e);
      if(!point) return;

      if (scissorPoints.length >= 3 && isNearFirstPoint(point)) {
        setIsClosed(true);

        const uptVals: {
          del: number[],
          upt: Record<number, IPolygonPointsList>,
        } = { del: [], upt: {} };

        const pSList = { outerCoords: scissorPoints };

        for (let i = 0; i < pointsList.length; i++) {
          const pLItem = {
            outerCoords: pointsList[i].outerCoords,
            innerCoords: pointsList[i].innerCoords,
          };

          const diffRes = diffPolygonsSingle(pLItem, pSList);

          if (!diffRes) continue;
          if (diffRes === 'empty') {
            uptVals.del.push(i);
          } else {
            uptVals.upt[i] = diffRes;
          }
        }

        const uptKeys = Object.keys(uptVals.upt);

        if (uptVals.del.length || uptKeys.length) {
          if (uptVals.del.length === 0 && uptKeys.length === 1) {
            const curIndx = Number(uptKeys[0]);
            setPointsList(EISPListType.Upt, curIndx)(uptVals.upt[curIndx]);
          } else {
            setPointsList(EISPListType.Set)(
              pointsList
                .filter((_, index) => !uptVals.del.includes(index))
                .map((item, index) =>
                  uptVals.upt[index]
                    ? uptVals.upt[index]
                    : {
                        outerCoords: item.outerCoords,
                        innerCoords: item.innerCoords,
                      }
                )
            );
          }
        }

        setScissorPoints([]);
        setIsClosed(false);
        return;
      }

      setScissorPoints(prev => [...prev, point]);
    },
    [scissorPoints, isClosed, pointsList, setPointsList]
  );

  const polylinePath =
    scissorPoints.length > 1
      ? `M ${scissorPoints
          .map(p => `${p.x} ${p.y}`)
          .join(" L ")}`
      : null;

  return {
    polylinePath,
    scissorPoints,
    onScissorsDown,
  }
}
