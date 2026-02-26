import type { RefObject, PointerEvent } from 'react';
import type { IBaseHook, IPoint, TBaseSetStateFn } from '@/shared/types';
import type { ISetPLFigure, ISetPointsList, IPolygonPointsList } from '..';


export type TUsePolygon = IBaseHook<TUsePolygonArgs, IUsePolygonReturn>;
export type TUsePolygonArgs = [];

export interface IUsePolygonReturn {
  polyRef: IUsePolygonPoleRef;
  svgRef: IUsePolygonSvgRef;
}

export type IUsePolygonPoleRef = RefObject<HTMLDivElement | null>;
export type IUsePolygonSvgRef = RefObject<SVGSVGElement | null>;


export interface IPolygonContext {
  calcValue: RefObject<IPolyCtxCalcValue | null>;
  setPointFromEvent: RefObject<(dx: number, dy: number) => void>;
  setPLFigure: RefObject<() => void>
}

export interface IPolyCtxCalcValue {
  selPointId: string;
  selPointType: EPointFigType;
  selPointValue: IPoint;
  downPointValue: IPoint;
}

export enum EPointFigType {
  Inner = 'inner',
  Outer = 'outer',
}


export type TUsePointInner = IBaseHook<TUsePointInnerArgs, IUsePointInnerReturn>;
export type TUsePointInnerArgs = [
  RefObject<HTMLDivElement | null>,
  RefObject<SVGSVGElement | null>,
];

export interface IUsePointInnerReturn {
  onPointMove: TBaseSetStateFn<PointerEvent<SVGSVGElement>>;
  onPointUp: TBaseSetStateFn<PointerEvent<SVGSVGElement>>;
}

export type TUseDrawInner = IBaseHook<TUseDrawInnerArgs, IUseDrawInnerReturn>;
export type TUseDrawInnerArgs = [
  RefObject<HTMLDivElement | null>,
  RefObject<SVGSVGElement | null>,
  number,
  (IPolygonPointsList & { [key: string]: unknown })[],
  ISetPointsList,
];

export interface IUseDrawInnerReturn {
  drawPath: string | null;
  cursorPoint: IPoint | null;
  onDrowDown: TBaseSetStateFn<PointerEvent<SVGSVGElement>>;
  onDrawMove: TBaseSetStateFn<PointerEvent<SVGSVGElement>>;
  onDrowUp: TBaseSetStateFn<PointerEvent<SVGSVGElement>>;
  onDrowLeave: TBaseSetStateFn<PointerEvent<SVGSVGElement>>;
}

export type TUseScissInner = IBaseHook<TUseScissInnerArgs, IUseScissInnerReturn>;
export type TUseScissInnerArgs = [
  RefObject<HTMLDivElement | null>,
  RefObject<SVGSVGElement | null>,
  (IPolygonPointsList & { [key: string]: unknown })[],
  ISetPointsList,
];

export interface IUseScissInnerReturn {
  polylinePath: string | null;
  scissorPoints: IPoint[];
  onScissorsDown: TBaseSetStateFn<PointerEvent<SVGSVGElement>>;
}

export type PolygonWithHoles = {
  outer: IPoint[];
  holes: IPoint[][];
};

export type TUsePathFigure = IBaseHook<TUsePathFigureArgs, IUsePathFigureReturn>;
export type TUsePathFigureArgs = [
  IPoint[],
  IPoint[][] | undefined,
];

export interface IUsePathFigureReturn {
  keyId: string;
  pathData: string;
  fillRule: "nonzero" | "evenodd";
}

export type TUsePointsFigure = IBaseHook<TUsePointsFigureArgs, IUsePointsFigureReturn>;
export type TUsePointsFigureArgs = [
  IPoint[],
  IPoint[][] | undefined,
  number,
  ISetPLFigure<IPolygonPointsList>,
];

export interface IUsePointsFigureReturn {
  outerPoints: IPointPF[];
  innerPoints: IPointPFInner[];
  onPointDowm: (id: string, type: EPointFigType,  event: PointerEvent<SVGCircleElement> ) => void
}

export interface IPointPF extends IPoint {
  id: string;
  isFake: boolean;
  type: EPointFigType;
}

export interface IPointPFInner extends IPointPF {
  exterIndx: number;
}