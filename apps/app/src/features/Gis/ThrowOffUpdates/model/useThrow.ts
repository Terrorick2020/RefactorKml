import { useDispatch, useSelector } from 'react-redux';
import { selectGis, setItemLayout } from '@/shared/store';
import type { TRootDispatch } from '@/shared/store';


export const useThrow = () => {
  const { isAutoSave, cache, layersList, img } = useSelector(selectGis).itemLayout;
  const dispatch = useDispatch<TRootDispatch>();

  const isDisabled = isAutoSave ||
    cache === `{"layersList": ${JSON.stringify(layersList)}, "img": ${JSON.stringify(img)}}`;

  const throwUpdates = (): void => {
    const parseData = JSON.parse(cache);

    if(!parseData.layersList || !parseData.img) return;

    dispatch(setItemLayout({
      layersList: parseData.layersList,
      img: parseData.img,
      cache: JSON.stringify(parseData),
    }))
  }

  return { isDisabled, throwUpdates }
}
