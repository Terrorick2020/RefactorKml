import { useRef, useMemo, useId } from 'react';
import type { TUsePolygonBox } from './types';


export const usePolygonBox: TUsePolygonBox = (pointsList) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const key = useId();

  const polygonPoints = useMemo((): string => {
    return pointsList
        .map(point => `${point.x},${point.y}`)
        .join(' ');
  }, [pointsList]);

  return { boxRef, polygonPoints, key }
}
