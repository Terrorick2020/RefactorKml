import { useSelector } from 'react-redux';
import { AppAnime } from '@/shared/config';
import { selectGisItemTools, setItemLayoutTools } from '@/shared/store';
import type { TUsePermission } from './types';


export const usePermission: TUsePermission = ( dispatch ) => {
  const { zoom } = useSelector(selectGisItemTools);

  const changeZoom = (direction: 1 | -1): void => {
    const max = AppAnime.gisItemPermistValue.max;
    const min = AppAnime.gisItemPermistValue.min;
    const step = AppAnime.gisItemPermistValue.step;

    const newZoom = zoom + step * direction;
    const result = Math.min(Math.max(newZoom, min), max);

    dispatch(setItemLayoutTools({ zoom: result }));
  };

  return { zoom, changeZoom }
}
