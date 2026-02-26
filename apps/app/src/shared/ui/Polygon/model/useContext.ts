import { createContext, useRef } from 'react';
import type { IPolygonContext, IPolyCtxCalcValue } from '.';


export const PolygonContext = createContext<IPolygonContext>({
  calcValue: { current: null },
  setPointFromEvent: { current: ()=>{} },
  setPLFigure: { current: ()=>{} },
});

export const usePolygonContext = () => {
  const calcValue = useRef<IPolyCtxCalcValue | null>(null);
  const setPointFromEvent = useRef<(dx: number, dy: number) => void>(()=>{});
  const setPLFigure = useRef<() => void>(()=>{});

  return { calcValue, setPointFromEvent, setPLFigure }
}

