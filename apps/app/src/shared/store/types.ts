import type { Reducer } from '@reduxjs/toolkit';
import type { UseDispatch } from 'react-redux';
import type { rootStore } from './store';
import type { ISettingsState, IGisState } from './slices';


export enum ERootActionType {
  Set = 'set',
  Reset = 'reset',
}

export interface IRootState {
  settings: ISettingsState,
  gis: IGisState,
}

export type TRootStateReducer = Reducer<IRootState>;
export type TRootDispatch = typeof rootStore.dispatch;
export type TRootUseDispatch = ReturnType<UseDispatch<TRootDispatch>>;
export type TReducerFn<T> = (payload: T) => {payload: T, type: string};
