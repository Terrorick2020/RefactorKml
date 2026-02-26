import { useDispatch, useSelector } from 'react-redux';
import { selectGis, setItemLayout } from '@/shared/store';
import type { TRootDispatch } from '@/shared/store';


export const useThrow = () => {
  const { isAutoSave, cache, layersList } = useSelector(selectGis).itemLayout;
  const dispatch = useDispatch<TRootDispatch>();

  const isDisabled = isAutoSave || !layersList.length || cache !== JSON.stringify(layersList);

  const throwUpdates = (): void => {
    dispatch(setItemLayout({
      layersList: JSON.parse(cache),
    }))
  }

  return { isDisabled, throwUpdates }
}
