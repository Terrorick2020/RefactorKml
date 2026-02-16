import type { TBaseSetStateFn, IPoint } from '@/shared/types'

export interface IPolygonProps {
  pointsList: IPoint[]
  isSow?: boolean
  isActive?: boolean
  bgColor?: string
  sepСoeff?: number
  strMarWid?: number
  workType?: EPolygonWorkType
  setPointsList?: TBaseSetStateFn<IPoint[]>
}

export enum EPolygonWorkType {
  Figure = 'figure',
  Draw = 'marker',
}
