import { useRef, type MouseEvent, useState, useEffect } from 'react';
import type { TUsePoints, IPointWF } from './types';
import type { IPoint } from '@/shared/types';


export const usePoints: TUsePoints = (pointsList, sepСoeff, setPointsList) => {
  const [circlePoints, setCirclePoints] = useState<IPointWF[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const initialMovePoint = useRef<IPoint | null>(null);
  const startPoint = useRef<IPoint | null>(null);
  const selectedId = useRef<string | null>(null);

  const onMouseDown = (id: string, event: MouseEvent<SVGCircleElement>): void => {
    selectedId.current = id;
    initialMovePoint.current = {
      x: event.clientX,
      y: event.clientY,
    }

    const point = circlePoints.find(p => p.id === id);
    if (point) {
      startPoint.current = { x: point.x, y: point.y };
    }
  }

  const onMouseMove = (event: MouseEvent<SVGSVGElement>): void => {
    if(
      selectedId.current === null ||
      startPoint.current === null ||
      initialMovePoint.current === null
    ) return;


    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();

      const isOutside =
        event.clientX <= rect.left ||
        event.clientX >= rect.right ||
        event.clientY <= rect.top ||
        event.clientY >= rect.bottom;

      if (isOutside) {
        onMouseUp();
        return;
      }
    }

    const id = selectedId.current;
    const dx = event.clientX - initialMovePoint.current.x;
    const dy = event.clientY - initialMovePoint.current.y;

    setCirclePoints(prev =>
      prev.map(item =>
        item.id === id
          ? {
            ...item,
            isFake: false,
            x: startPoint.current!.x + dx,
            y: startPoint.current!.y + dy,
          }
          : item
      )
    )
  }

  const onMouseUp = (): void => {
    setPointsList(
      circlePoints
        .filter(item => !item.isFake)
        .map(item => ({ x: item.x, y: item.y }))
    );
    selectedId.current = null;
    startPoint.current = null;
    initialMovePoint.current = null;
  }

  useEffect(() => {
    if (pointsList.length === 0) {
      setCirclePoints([]);
      return;
    };

    const pointsWithMid: IPointWF[] = [];

    for(let i = 0; i < pointsList.length; i++) {
      const current = pointsList[i];
      const next = pointsList[(i + 1) % pointsList.length];

      pointsWithMid.push({
        ...current,
        id: `real-${i}`,
        isFake: false
      });

      for(let j = 1; j < Math.max(sepСoeff, 1); j++) {
        const t = j / sepСoeff;

        pointsWithMid.push({
          x: current.x + (next.x - current.x) * t,
          y: current.y + (next.y - current.y) * t,
          id: `fake-${i}-${j}`,
          isFake: true,
        });
      }
    }

    setCirclePoints(pointsWithMid);

    return () => {
      setCirclePoints([]);
    }
  }, [pointsList, sepСoeff])

  return { svgRef, circlePoints, onMouseDown, onMouseMove, onMouseUp }
}
