import type { TBaseSetStateFn, IBaseHook } from '@/shared/types';


export type TUseSave = IBaseHook<TUseSaveArgs, IUseSaveReturn>;
export type TUseSaveArgs = [];

export interface IUseSaveReturn {
  isDisabled: boolean
  saveUpdates: TBaseSetStateFn<any>
}
