import { useSelector } from 'react-redux';
import { selectGisItemTools, setItemLayoutTools } from '@/shared/store';
import type { EPolygonWorkType } from '@/shared/ui';
import type { TUsePenSel } from './types';


export const penTypeColor = {
  active: '#489486ff',
  unActive: 'transparent',
} as const;

export const getBtnBg = (value: boolean): string => value
  ? penTypeColor.active
  : penTypeColor.unActive;

export const usePenSelect: TUsePenSel = ( dispatch ) => {
  const { penType } = useSelector(selectGisItemTools);

  const setPenType = ( newPenType: EPolygonWorkType ): void => {
    dispatch(setItemLayoutTools({ penType: newPenType }));
  }

  return { penType,  setPenType }
}
