import { useSelector } from 'react-redux';
import { selectGis, resetItemLayout } from '@/shared/store';
import { useRef, useEffect } from 'react';
import type { TUseClearLayers } from './types';


export const useClearLayers: TUseClearLayers = ( dispatch ) => {
  const kashLayers = useRef<string | null>(null);

  const itemLayout = useSelector(selectGis).itemLayout;

  const clearLayers = (): void => {
    dispatch(resetItemLayout());
  };

  useEffect(() => {
    kashLayers.current = JSON.stringify(itemLayout);

    return () => {
      kashLayers.current = null;
    }
  }, [])

  const disable = JSON.stringify(itemLayout) === kashLayers.current;

  return { disable, clearLayers }
}
