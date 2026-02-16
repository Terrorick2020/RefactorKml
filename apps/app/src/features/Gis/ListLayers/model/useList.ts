import {
  selectGis,
  selectGisItemList,
  setItemLayoutLList,
  setActiveLLItem,
  type TRootDispatch,
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

  const resList = useMemo(() => {
    if(!query) return layersList;

    return layersList.filter(item => item.label.includes(query));
  }, [query]);
  
  return { keyId, resList }
}

export const useListItem: TUseListItem = (id, isActive) => {
  const dispatch = useDispatch<TRootDispatch>();

  const setColorItem = (color: string): void => {
    dispatch(setItemLayoutLList({ id, color }))
  }

  const setShow = (): void => {
    dispatch(setItemLayoutLList({ id, isShow: true }))
  }

  const setActive = (): void => {
    dispatch(setActiveLLItem({id, isActive: !isActive}))
  }

  return { setColorItem, setShow, setActive }
}
