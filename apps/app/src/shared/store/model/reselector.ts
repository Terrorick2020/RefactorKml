import type { IRootState } from '../types';

export const selectSettings = (state: IRootState) => state.settings;
export const selectGis = (state: IRootState) => state.gis;
