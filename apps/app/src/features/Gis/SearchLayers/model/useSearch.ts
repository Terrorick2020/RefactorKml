import { useSelector } from 'react-redux';
import { selectGis, setItemLayout } from '@/shared/store';
import type { TUseSearch } from './types';


export const useSearch: TUseSearch = ( dispatch ) => {
  const { query } = useSelector(selectGis).itemLayout;

  const setQuery = (newQuery: string): void => {
    dispatch(setItemLayout({ query:  newQuery}));
  };

  return { query, setQuery }
}
