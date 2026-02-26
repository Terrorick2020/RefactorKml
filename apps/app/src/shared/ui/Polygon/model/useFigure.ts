import {
  useId,
  useMemo,
  useContext,
  useState,
  useEffect,
  useRef,
  type PointerEvent,
} from 'react';

import {
  PolygonContext,
  EPointFigType,
  type TUsePathFigure,
  type TUsePointsFigure,
  type IPointPF,
  type IPointPFInner,
} from '.';

import { v4 as uuidv4 } from 'uuid';
import type { IPoint } from '@/shared/types';


export const usePathFigure: TUsePathFigure = (outerCoords, innerCoords) => {
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

export const usePointsFigure: TUsePointsFigure = (outerCoords, innerCoords, sepСoeff, setPointsList) => {
  const context = useContext(PolygonContext);
  const newSelValue = useRef<IPoint | null>(null);
  const [outerPoints, setOuterPoints] = useState<IPointPF[]>([]);
  const [innerPoints, setInnerPoints] = useState<IPointPFInner[]>([]);

  const onPointDowm = ( id: string, type: EPointFigType,  event: PointerEvent<SVGCircleElement> ): void => {
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
    context.setPointFromEvent.current = setPointFromEvent;
    context.setPLFigure.current = setPLFigure;
  };

  const setPointFromEvent = (dx: number, dy: number) => {
    const calcValue = context.calcValue.current;
    if(!calcValue) return;

    const newXVal = calcValue.selPointValue.x + dx;
    const newYVal = calcValue.selPointValue.y + dy;

    switch(calcValue.selPointType) {
      case EPointFigType.Outer:
        setOuterPoints(prev =>
          prev.map(item => item.id === calcValue.selPointId
            ? {
              ...item,
              isFake: false,
              x: newXVal,
              y: newYVal,
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
              x: newXVal,
              y: newYVal,
            }
            : item
          )
        )
        break;
    }

    newSelValue.current = {
      x: newXVal,
      y: newYVal,
    };
  }

  const setPLFigure = (): void => {
    const ctxRes = context.calcValue.current;
    const newValRes = newSelValue.current;
    if(!ctxRes || !newValRes) return;
    const outer: IPoint[] = [];
    const inner: IPoint[][] = [];

    switch(ctxRes.selPointType) {
      case EPointFigType.Outer:
        for(let item of outerPoints) {
          if(item.id === ctxRes.selPointId) {
            outer.push({
              x: newValRes.x,
              y: newValRes.y,
            })
            continue;
          } else if(item.isFake) continue;
          
          outer.push({
            x: item.x,
            y: item.y,
          })
        }
        break;
      case EPointFigType.Inner:
        if(!innerCoords) return;
        const targInner = innerPoints.find(item => item.id === ctxRes.selPointId);
        if(!targInner) return;
        const targetInnerList = innerPoints.filter(item => item.exterIndx === targInner.exterIndx);
        if(!targetInnerList.length) return;

        for(let [index, item] of innerCoords.entries()) {
          if(index !== targInner.exterIndx) {
            inner.push(item);
            continue;
          }

          const innerInner: IPoint[] = [];
          for(let targItem of targetInnerList) {
            if(targItem.id === ctxRes.selPointId) {
              innerInner.push({
                x: newValRes.x,
                y: newValRes.y,
              })
              continue;
            } else if(targItem.isFake) continue;

            innerInner.push({
              x: targItem.x,
              y: targItem.y,
            });
          }

          inner.push(innerInner);
        }
        break;
    }

    setPointsList({
      outerCoords: outer.length ? outer : outerCoords,
      innerCoords: inner.length ? inner : innerCoords,
    })
  }

  useEffect(() => {
    if(!outerCoords.length) return;

    const pointsWithMid: IPointPF[] = [];

    for(let i = 0; i < outerCoords.length; i++) {
      const current = outerCoords[i];
      const next = outerCoords[(i + 1) % outerCoords.length];

      pointsWithMid.push({
        id: uuidv4(),
        isFake: false,
        type: EPointFigType.Outer,
        x: current.x,
        y: current.y,
      });

      for(let j = 1; j < Math.max(sepСoeff, 1); j++) {
        const t = j / sepСoeff;

        pointsWithMid.push({
          id: uuidv4(),
          isFake: true,
          type: EPointFigType.Outer,
          x: current.x + (next.x - current.x) * t,
          y: current.y + (next.y - current.y) * t,
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
          id: uuidv4(),
          isFake: false,
          type: EPointFigType.Inner,
          exterIndx: itemIndx,
          x: current.x,
          y: current.y,
        });

        for(let j = 1; j < Math.max(sepСoeff, 1); j++) {
          const t = j / sepСoeff;

          pointsWithMid.push({
            id: uuidv4(),
            isFake: true,
            type: EPointFigType.Inner,
            exterIndx: itemIndx,
            x: current.x + (next.x - current.x) * t,
            y: current.y + (next.y - current.y) * t,
          });
        }
      }
    });

    setInnerPoints(pointsWithMid);

    return () => setInnerPoints([]);
  }, [ innerCoords, sepСoeff ]);

  return { outerPoints, innerPoints, onPointDowm }
}
