import type { IRootState } from '../types';

export const selectSettings = (state: IRootState) => state.settings;
export const selectGis = (state: IRootState) => state.gis;
export const selectGisItemTools = (state: IRootState) => state.gis.itemLayout.tools;
export const selectGisItemList = (state: IRootState) => state.gis.itemLayout.layersList;
export const selectGisItemLImg = (state: IRootState) => state.gis.itemLayout.tifImg;