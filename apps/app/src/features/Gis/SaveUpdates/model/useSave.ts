import { useDispatch, useSelector } from 'react-redux';
import { selectGis, setCahe, type TRootDispatch } from '@/shared/store';
import type { TUseSave } from './types';


export const useSave: TUseSave = () => {
  const dispatch = useDispatch<TRootDispatch>()
  const { isAutoSave, cache, layersList } = useSelector(selectGis).itemLayout;

  const saveUpdates = (): void => {
    const newCahe = JSON.stringify(layersList);
    dispatch(setCahe(newCahe));
  }

  const isDisabled = isAutoSave || !layersList.length || cache === JSON.stringify(layersList);

  return { isDisabled, saveUpdates }
}
