import { useId } from 'react';
import { useSelector } from 'react-redux';
import { selectGisItemList, setItemLayoutLList } from '@/shared/store';
import type { TUseList } from './types';
import type { IPoint, TBaseSetStateFn } from '@/shared/types';


export const useList: TUseList = (dispatch) => {
  const keyId = useId();
  const layersList = useSelector(selectGisItemList);

  const setPointsList = (id: string): TBaseSetStateFn<IPoint[]> => {
    return (pointsList: IPoint[]) => {
      dispatch(setItemLayoutLList({
        id: id,
        coordinats: pointsList
      }))
    }
  }
  
  return { keyId, layersList, setPointsList }
}
