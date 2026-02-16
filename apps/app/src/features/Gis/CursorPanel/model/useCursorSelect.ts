import { useSelector } from 'react-redux';
import { selectGisItemTools, setItemLayoutTools, EGisCursorType } from '@/shared/store';
import type { TUseCurSel } from './types';


export const cursorTypeColor = {
  active: '#486694ff',
  unActive: 'transparent',
} as const;

export const getBtnBg = (value: boolean): string => value
  ? cursorTypeColor.active
  : cursorTypeColor.unActive;

export const useCursorSelect: TUseCurSel = ( dispatch ) => {
  const { cursorType } = useSelector(selectGisItemTools);

  const setCursorType = ( newCursorType: EGisCursorType ): void => {
    dispatch(setItemLayoutTools({ cursorType: newCursorType }));
  }

  return { cursorType,  setCursorType }
}
