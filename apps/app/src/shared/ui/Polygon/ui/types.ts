import type { IPoint } from '@/shared/types'
import type { IUsePolygonPoleRef, IUsePolygonSvgRef } from '../model'


interface IPolygonBaseProps {
  sepСoeff?: number;
  pointRad?: number;
  lineWidth?: number;
  bgColor?: string;
  lineColor?: string;
}

interface IPolyFigureParrentProps extends IPolygonBaseProps {
  pointsList: (IPolygonPointsList & { [key: string]: any })[];
  setPointsList: ISetPointsList;
  imgWidth: number;
  imgHeight: number;
  isSow?: boolean;
  isActive?: boolean;
  workType?: EPolygonWorkType;
  drawWidth?: number;
}

export type ISetPointsList = {
  (type: EISPListType.Upt, indx: number): ISetPLFigure<IPolygonPointsList>
  (type: EISPListType.Add): ISetPLFigure<IPolygonPointsList>
  (type: EISPListType.Set): ISetPLFigure<IPolygonPointsList[]>
}

export enum EISPListType {
  Set = 'set',
  Upt = 'upt',
  Add = 'add',
}

export interface IPolygonPointsList {
  outerCoords: IPoint[];
  innerCoords?: IPoint[][];
}

export interface IPolygonProps extends IPolyFigureParrentProps {}

export enum EPolygonWorkType {
  Figure = 'figure',
  Draw = 'marker',
  Scissors = 'scissors',
}

export interface IPolygonInnerProps extends IPolyFigureParrentProps {
  polyRef: IUsePolygonPoleRef;
  svgRef: IUsePolygonSvgRef;
}

export type ISetPLFigure<T extends IPolygonPointsList | IPolygonPointsList[]> = (newValue: T) => void;

export interface IPolygonFigureProps extends IPolygonBaseProps {
  setPointsList: ISetPLFigure<IPolygonPointsList>;
  outerCoords: IPoint[];
  innerCoords?: IPoint[][];
  showPoints?: boolean;
}
