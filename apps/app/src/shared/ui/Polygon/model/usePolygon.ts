import { useRef } from 'react';
import type { TUsePolygon } from '.';


export const usePolygon: TUsePolygon = () => {
  const polyRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  return { polyRef, svgRef }
}
