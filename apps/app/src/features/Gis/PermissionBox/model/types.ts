import type { RefObject } from 'react';
import type { IBaseHook, TBaseSetStateFn } from '@/shared/types';
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import type { TRootUseDispatch, IGSItemLayoutTifImg, IGSItemLayoutLLItem } from '@/shared/store';
import type { EPolygonWorkType, ISetPointsList } from '@/shared/ui';


export type TUseSettings = IBaseHook<TUseSettingsArgs, IUseSettingsReturn>;
export type TUseSettingsArgs = [ TRootUseDispatch ];

export interface IUseSettingsReturn {
  tifImg: IGSItemLayoutTifImg | null;
  trnsRef: RefObject<ReactZoomPanPinchRef | null>;
  isTransform: boolean;
  penType: EPolygonWorkType;
  setZoomState: TBaseSetStateFn<ReactZoomPanPinchRef | null>;
}

export type TUseList = IBaseHook<TUseListArgs, IUseListReturn>;
export type TUseListArgs = [ TRootUseDispatch ];

export interface IUseListReturn {
  keyId: string;
  layersList: IGSItemLayoutLLItem[];
  setPointsList: (id: string) => ISetPointsList;
}
