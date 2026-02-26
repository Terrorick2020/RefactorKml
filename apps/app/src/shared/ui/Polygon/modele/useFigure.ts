import {
  useMemo,
  useState,
  useEffect,
  useId,
  useContext,
  useLayoutEffect,
  type MouseEvent,
} from 'react';

import { PolygonContext } from './useContext';
import { v4 as uuidv4 } from 'uuid';
import type { IPoint } from '@/shared/types';


export const usePathFigure = (outerCoords: IPoint[], innerCoords: IPoint[][] | undefined) => {
  const keyId = useId();

  const pathData = useMemo((): string => {
    const build = (points: IPoint[]) =>
      points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ") + " Z";

    let d = build(outerCoords);

    if (innerCoords?.length) {
      innerCoords.forEach(hole => {
        if (hole.length) {
          d += " " + build(hole);
        }
      });
    }

    return d;
  }, [ outerCoords, innerCoords ]);

  const fillRule = innerCoords && innerCoords.length
    ? ('evenodd' as const)
    : ('nonzero' as const);

  return { keyId, pathData, fillRule }
}


export enum EPointFigType {
  Inner = 'inner',
  Outer = 'outer',
}

export interface IPointPF extends IPoint {
  id: string;
  isFake: boolean;
  type: EPointFigType;
}

export interface IPointPFInner extends IPointPF {
  exterIndx: number;
}

export const usePointsFigure = (outerCoords: IPoint[], innerCoords: IPoint[][] | undefined, sepСoeff: number) => {
  const context = useContext(PolygonContext);
  const [outerPoints, setOuterPoints] = useState<IPointPF[]>([]);
  const [innerPoints, setInnerPoints] = useState<IPointPFInner[]>([]);

  const onPointDowm = ( id: string, type: EPointFigType,  event: MouseEvent<SVGCircleElement> ): void => {
    let targetPoint: IPointPF | IPointPFInner | undefined;

    switch(type) {
      case EPointFigType.Outer:
        targetPoint = outerPoints.find(item => item.id === id);
        break;
      case EPointFigType.Inner:
        targetPoint = innerPoints.find(item => item.id === id);
        break;
    }

    if(!targetPoint) return;

    context.calcValue.current = {
      selPointId: id,
      selPointType: targetPoint.type,
      selPointValue: { x: targetPoint.x, y: targetPoint.y },
      downPointValue: { x: event.clientX, y: event.clientY },
    }
  };

  const setPointFromEvent = (dx: number, dy: number) => {
    const calcValue = context.calcValue.current;
    if(!calcValue) return;

    switch(calcValue.selPointType) {
      case EPointFigType.Outer:
        setOuterPoints(prev =>
          prev.map(item => item.id === calcValue.selPointId
            ? {
              ...item,
              isFake: false,
              x: calcValue.selPointValue.x + dx,
              y: calcValue.selPointValue.y + dy,
            }
            : item
          )
        )
        break;
      case EPointFigType.Inner:
        setInnerPoints(prev =>
          prev.map(item => item.id === calcValue.selPointId
            ? {
              ...item,
              isFake: false,
              x: calcValue.selPointValue.x + dx,
              y: calcValue.selPointValue.y + dy,
            }
            : item
          )
        )
        break;
    }
  }

  useEffect(() => {
    if(!outerCoords.length) return;

    const pointsWithMid: IPointPF[] = [];

    for(let i = 0; i < outerCoords.length; i++) {
      const current = outerCoords[i];
      const next = outerCoords[(i + 1) % outerCoords.length];

      pointsWithMid.push({
        ...current,
        id: uuidv4(),
        isFake: false,
        type: EPointFigType.Outer,
      });

      for(let j = 1; j < Math.max(sepСoeff, 1); j++) {
        const t = j / sepСoeff;

        pointsWithMid.push({
          x: current.x + (next.x - current.x) * t,
          y: current.y + (next.y - current.y) * t,
          id: uuidv4(),
          isFake: true,
          type: EPointFigType.Outer,
        });
      }
    }

    setOuterPoints(pointsWithMid);

    return () => setOuterPoints([]);
  }, [ outerCoords, sepСoeff ]);

  useEffect(() => {
    if(!innerCoords || !innerCoords.length) return;

    const pointsWithMid: IPointPFInner[] = [];

    innerCoords.forEach((item, itemIndx) => {
      for(let i = 0; i < item.length; i++) {
        const current = item[i];
        const next = item[(i + 1) % item.length];

        pointsWithMid.push({
          ...current,
          id: uuidv4(),
          isFake: false,
          type: EPointFigType.Inner,
          exterIndx: itemIndx,
        });

        for(let j = 1; j < Math.max(sepСoeff, 1); j++) {
          const t = j / sepСoeff;

          pointsWithMid.push({
            x: current.x + (next.x - current.x) * t,
            y: current.y + (next.y - current.y) * t,
            id: uuidv4(),
            isFake: true,
            type: EPointFigType.Inner,
            exterIndx: itemIndx,
          });
        }
      }
    });

    setInnerPoints(pointsWithMid);

    return () => setInnerPoints([]);
  }, [ innerCoords, sepСoeff ]);

  useLayoutEffect(() => {
    context.setPointFromEvent.current = setPointFromEvent;
  }, []);

  return { outerPoints, innerPoints, onPointDowm }
}
