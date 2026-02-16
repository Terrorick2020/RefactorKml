import type { TBaseSetStateFn, IBaseHook } from '@/shared/types';
import { type TRootUseDispatch } from '@/shared/store';


export type TUseClearLayers = IBaseHook<TUseClearLayersArgs, IUseClearLayersReturn>;
export type TUseClearLayersArgs = [ TRootUseDispatch ];

export interface IUseClearLayersReturn {
  disable: boolean
  clearLayers: TBaseSetStateFn<void>
}
