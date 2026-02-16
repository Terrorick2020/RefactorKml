import type { TBaseSetStateFn, IBaseHook } from '@/shared/types';
import type { EPolygonWorkType } from '@/shared/ui';
import { type TRootUseDispatch } from '@/shared/store';


export type TUsePenSel = IBaseHook<TUsePenSelArgs, IUsePenSelReturn>;
export type TUsePenSelArgs = [ TRootUseDispatch ];

export interface IUsePenSelReturn {
  penType: EPolygonWorkType
  setPenType: TBaseSetStateFn<EPolygonWorkType>
}
