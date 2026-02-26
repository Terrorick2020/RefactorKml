import { useSelector, useDispatch } from 'react-redux';
import { type TRootDispatch, selectGis, setItemLayout } from '@/shared/store';
import type { IUseCheck } from './types';


export function useCheck(): IUseCheck {
  const { isAutoSave, layersList } = useSelector(selectGis).itemLayout;
  const dispatch = useDispatch<TRootDispatch>();

  const setIsAutoSave = (newValue: boolean): void => {
    dispatch(setItemLayout({
      isAutoSave: newValue,
      ...(!newValue && {cache: JSON.stringify(layersList)}),
    }))
  }

  return { isAutoSave,  setIsAutoSave }
}
