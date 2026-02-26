import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  EGisCursorType,
  type IGisState,
  type IGisStateItemLayout,
  type IGisStateILTools,
  type IGSItemLayoutTifImg,
  type IGSItemLayoutLLItem,
} from "./types";

import { EPolygonWorkType } from "@/shared/ui";


const initialState: IGisState = {
  itemLayout: {
    isAutoSave: false,
    query: "",
    tools: {
      cursorType: EGisCursorType.Scroll,
      penType: EPolygonWorkType.Figure,
      zoom: 100,
    },
    cache: '',
    tifImg: null,
    layersList: [],
  },
};

const gisSliceName = "gisSlice";

const settingsSlice = createSlice({
  name: gisSliceName,
  initialState,
  reducers: {
    setItemLayout: (
      state,
      action: PayloadAction<Partial<IGisStateItemLayout>>,
    ) => {
      state.itemLayout = { ...state.itemLayout, ...action.payload };
    },
    setItemLayoutTools: (
      state,
      action: PayloadAction<Partial<IGisStateILTools>>,
    ) => {
      state.itemLayout.tools = { ...state.itemLayout.tools, ...action.payload };
    },
    setCahe: (
      state,
      action: PayloadAction<string>
    ) => {
      state.itemLayout.cache = action.payload;
    },
    setLayersListItem: (
      state,
      action: PayloadAction<Partial<IGSItemLayoutLLItem> & { id: string }>
    ) => {
      state.itemLayout.layersList = state.itemLayout.layersList.map(
        item => item.id === action.payload.id
        ? { ...item, ...action.payload}
        : item
      )
    },
    setLayersListItemActive: (
      state,
      action: PayloadAction<{ id: string, isActive: boolean }>
    ) => {
      state.itemLayout.layersList = state.itemLayout.layersList.map(
        item => item.id === action.payload.id
        ? { ...item, isActive: action.payload.isActive, isShow: action.payload.isActive }
        : { ...item,  isActive: false }
      )
    },
    setTifImg: (state, actoion: PayloadAction<IGSItemLayoutTifImg>) => {
      state.itemLayout.tifImg = actoion.payload;
    },
    resetItemLayout: (state) => {
      state.itemLayout = initialState.itemLayout;
    },
  },
  extraReducers: (_builder) => {},
});

export const {
  setItemLayout,
  setItemLayoutTools,
  setLayersListItem,
  setLayersListItemActive,
  resetItemLayout,
  setCahe,
  setTifImg,
} = settingsSlice.actions;
export { gisSliceName };
export default settingsSlice.reducer;
