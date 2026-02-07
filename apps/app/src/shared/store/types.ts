import type { Reducer } from '@reduxjs/toolkit';
import type { rootStore } from './store';
import type { ISettingsState } from './slices';


export enum ERootActionType {
  Set = 'set',
  Reset = 'reset',
}

export interface IRootState {
  settings: ISettingsState,
}

export type TRootStateReducer = Reducer<IRootState>;
export type TRootDispatch = typeof rootStore.dispatch;
export type TReducerFn<T> = (payload: T) => {payload: T, type: string};
