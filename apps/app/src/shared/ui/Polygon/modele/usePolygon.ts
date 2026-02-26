import {
  useState,
  useRef,
  useContext,
  type MouseEvent,
  type RefObject,
} from 'react';

import { PolygonContext } from './useContext';
import { throttle } from 'lodash';


export const useSettingsPolygon = () => {
  const polyRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  return { polyRef, svgRef }
}

export const usePointPolygon = (
  polyRef: RefObject<HTMLDivElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
) => {
  const context = useContext(PolygonContext);

  const onPointMove = (event: MouseEvent<SVGSVGElement>): void => {
    if(!context.calcValue.current) return;

    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();

      const isOutside =
        event.clientX < rect.left  ||
        event.clientX > rect.right ||
        event.clientY < rect.top   ||
        event.clientY > rect.bottom;

      if (isOutside) {
        onPointerUp(event);
        return;
      }
    }

    const dx = event.clientX - context.calcValue.current.downPointValue.x;
    const dy = event.clientY - context.calcValue.current.downPointValue.y;
    context.setPointFromEvent.current(dx, dy);
  }

  const onPointerUp = (event: MouseEvent<SVGSVGElement>): void => {
    event.stopPropagation();
    context.calcValue.current = null;
  };

  return { onPointMove, onPointerUp }
}

export const useDrawPolygon = (
  polyRef: RefObject<HTMLDivElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
) => {
  const [drawPath, setDrawPath] = useState<string | null>(null);

  return { drawPath };
}
