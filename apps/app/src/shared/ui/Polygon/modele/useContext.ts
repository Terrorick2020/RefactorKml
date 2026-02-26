import { createContext, useRef, type RefObject } from 'react';
import { EPointFigType } from './useFigure';
import type { IPoint } from '@/shared/types';


export interface IPolygonContext {
  calcValue: RefObject<IPolyCtxCalcValue | null>;
  setPointFromEvent: RefObject<(dx: number, dy: number) => void>;
}

export interface IPolyCtxCalcValue {
  selPointId: string;
  selPointType: EPointFigType;
  selPointValue: IPoint;
  downPointValue: IPoint;
}

export const PolygonContext = createContext<IPolygonContext>({
  calcValue: { current: null },
  setPointFromEvent: { current: ()=>{} },
});

export const usePolygonContext = () => {
  const calcValue = useRef<IPolyCtxCalcValue | null>(null);
  const setPointFromEvent = useRef<(dx: number, dy: number) => void>(()=>{});

  return { calcValue, setPointFromEvent }
}
