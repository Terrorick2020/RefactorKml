import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { resetItemLayout, selectGisItemList } from '@/shared/store';
import { FolderContext } from '@/entities';
import type { TUseClearLayers } from './types';


export const useClearLayers: TUseClearLayers = ( dispatch ) => {
  const context = useContext(FolderContext);
  const layersList = useSelector(selectGisItemList);

  const clearLayers = (): void => {
    context.setValue(null);
    dispatch(resetItemLayout());
  };

  const isDisable = !layersList.length;

  return { isDisable, clearLayers }
}
