import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGis, setCahe, type TRootDispatch } from '@/shared/store';
import type { TUseSave } from './types';


export const useSave: TUseSave = () => {
  const dispatch = useDispatch<TRootDispatch>()
  const { isAutoSave, cache, layersList, img } = useSelector(selectGis).itemLayout;

  const saveUpdates = (): void => {
    const newCahe = `{"layersList": ${JSON.stringify(layersList)}, "img": ${JSON.stringify(img)}}`;
    dispatch(setCahe(newCahe));
  }

  const isDisabled = useMemo(() => {
    const result = isAutoSave ||
      cache === `{"layersList": ${JSON.stringify(layersList)}, "img": ${JSON.stringify(img)}}`;
    return result
  }, [layersList, img]);

  return { isDisabled, saveUpdates }
}
