import type { TRootUseDispatch } from '@/shared/store';
import type { TBaseSetStateFn, IBaseHook } from '@/shared/types';


export type TUsePermission = IBaseHook<TUsePermissionArgs, IUsePermissionReturn>;
export type TUsePermissionArgs = [ TRootUseDispatch ];

export interface IUsePermissionReturn {
  zoom: number
  changeZoom: TBaseSetStateFn<-1 | 1>
}
