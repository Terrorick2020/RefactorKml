import {
  selectGis,
  selectGisItemList,
  setLayersListItem,
  setLayersListItemActive,
  type TRootDispatch,
  type IGSItemLayoutLLItem,
} from '@/shared/store';

import { useId, useMemo } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TUseList, TUseListItem } from './types';


const selListLayers = createSelector(
  [selectGis, selectGisItemList],
  (gis, gisItemList) => ({
    query: gis.itemLayout.query,
    layersList: gisItemList
  })
);

export const useList: TUseList = () => {
  const keyId = useId();
  const { query, layersList } = useSelector(selListLayers);

  const resList = useMemo((): IGSItemLayoutLLItem[]  => {
    if(!query) return layersList;

    return layersList.filter(item => item.name.includes(query));
  }, [query, layersList]);
  
  return { keyId, resList }
}

export const useListItem: TUseListItem = (id, isShow, isActive) => {
  const dispatch = useDispatch<TRootDispatch>();

  const setColorItem = (color: string): void => {
    dispatch(setLayersListItem({ id, color }))
  }

  const setShow = (): void => {
    dispatch(setLayersListItem({ id, isShow: !isShow }))
  }

  const setActive = (): void => {
    dispatch(setLayersListItemActive({id, isActive: !isActive}))
  }

  return { setColorItem, setShow, setActive }
}
