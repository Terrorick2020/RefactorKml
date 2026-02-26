import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGisItemList } from '@/shared/store';
import { FolderContext } from '@/entities';

export const useSend = (value: number) => {
  const context = useContext(FolderContext);
  const [load, setLoad] = useState<boolean>(false);
  const layersList = useSelector(selectGisItemList);

  const onSend = async () => {

  }

  const isDisabled = !layersList.length;

  return { load, isDisabled, onSend }
}