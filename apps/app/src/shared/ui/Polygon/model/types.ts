import type { RefObject, MouseEvent } from 'react';
import type { TBaseSetStateFn, IBaseHook, IPoint } from '@/shared/types';


export type TUsePolygonBox = IBaseHook<TUsePolygonBoxArgs, IUsePolygonBoxReturn>;
export type TUsePolygonBoxArgs = [ IPoint[] ];

export interface IUsePolygonBoxReturn {
  boxRef: RefObject<HTMLDivElement | null>
  polygonPoints: string
  key: string
}


export type TUsePoints = IBaseHook<TUsePointsArgs, IUsePointsReturn>;
export type TUsePointsArgs = [ IPoint[], number, TBaseSetStateFn<IPoint[]> ];

export interface IUsePointsReturn {
  svgRef: RefObject<SVGSVGElement | null>
  circlePoints: IPointWF[]
  onMouseDown: (id: string, e: MouseEvent<SVGCircleElement>) => void
  onMouseMove: TBaseSetStateFn<MouseEvent<SVGSVGElement>>
  onMouseUp: TBaseSetStateFn<void>
}

export interface IPointWF extends IPoint {
  id: string
  isFake: boolean
}


export type TUseMarker = IBaseHook<TUseMarkerArgs, IUseMarkerReturn>;
export type TUseMarkerArgs = [ TBaseSetStateFn<IPoint[]> ];

export interface IUseMarkerReturn {
  drawPath: string | null
  handleDrawStart: TBaseSetStateFn<MouseEvent<SVGSVGElement>>
  handleDrawMove: TBaseSetStateFn<MouseEvent<SVGSVGElement>>
  handleDrawEnd: TBaseSetStateFn<MouseEvent<SVGSVGElement>>
}