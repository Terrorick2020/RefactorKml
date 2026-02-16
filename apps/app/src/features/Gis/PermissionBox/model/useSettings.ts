import { useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { selectGisItemTools, selectGis, setItemLayoutTools, EGisCursorType } from '@/shared/store';
import { type ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import type { TUseSettings } from './types';


const selPermisBox = createSelector(
  [selectGis, selectGisItemTools],
  (gis, gisTools) => ({
    img: gis.itemLayout.img,
    cursorType: gisTools.cursorType,
    penType: gisTools.penType,
    zoom: gisTools.zoom,
  })
);

export const useSettings: TUseSettings = (dispatch) => {
  const { img, cursorType, penType, zoom } = useSelector(selPermisBox);
  const trnsRef = useRef<ReactZoomPanPinchRef | null>(null);
  const zoomCache = useRef<number>(zoom);

  const setZoomState = (ref: ReactZoomPanPinchRef | null): void => {
    if(!ref) return;
    const newValue = ref.state.scale * 100;
    zoomCache.current = newValue;
    dispatch(setItemLayoutTools({ zoom: newValue }));
  };

  const isTransform = cursorType === EGisCursorType.Transform;

  useLayoutEffect(() => {
    if (!trnsRef.current) return;
    const diff = zoom - zoomCache.current;
    if (diff === 0) return;
    const step = Math.abs(diff) / 100;

    if (diff > 0) trnsRef.current.zoomIn(step);
    else trnsRef.current.zoomOut(step);
    zoomCache.current = zoom;
  }, [zoom]);

  return {
    trnsRef,
    isTransform,
    penType,
    setZoomState,
  }
}
