import type { TBaseSetStateFn, IBaseHook } from '@/shared/types';
import { type TRootUseDispatch, EGisCursorType } from '@/shared/store';


export type TUseCurSel = IBaseHook<TUseCurSelArgs, IUseCurSelReturn>;
export type TUseCurSelArgs = [ TRootUseDispatch ];

export interface IUseCurSelReturn {
  cursorType: EGisCursorType
  setCursorType: TBaseSetStateFn<EGisCursorType>
}

