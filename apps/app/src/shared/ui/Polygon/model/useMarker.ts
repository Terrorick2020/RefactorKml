import {
  useState,
  useRef,
  type MouseEvent,
} from 'react';

import type { TUseMarker } from './types';


export const useMarker: TUseMarker = () => {
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
  };

  return { drawPath, handleDrawStart, handleDrawMove, handleDrawEnd }
}
