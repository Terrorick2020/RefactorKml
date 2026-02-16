import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  EGisCursorType,
  type IGisState,
  type IGisStateItemLayout,
  type IGisStateILTools,
  type IGisStateILLayersListItem,
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
    layersList: [
      {
        id: "sdvsdvsdvsdv",
        fileName: "hello.tif",
        label: "Слой 1",
        color: "red",
        isShow: true,
        isActive: false,
        coordinats: [
          { x: 0, y: 100 },
          { x: 100, y: 500 },
          { x: 2, y: 340 },
        ],
      },
      {
        id: "sdv",
        fileName: "hello.tif",
        label: "Слой 2",
        color: "blue",
        isShow: true,
        isActive: true,
        coordinats: [
          { x: 500, y: 100 },
          { x: 500, y: 500 },
          { x: 550, y: 340 },
        ],
      },
    ],
    img: null,
    cache: '',
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
    setItemLayoutLList: (
      state,
      action: PayloadAction<
        Partial<IGisStateILLayersListItem> & { id: string }
      >,
    ) => {
      state.itemLayout.layersList = state.itemLayout.layersList.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      );
    },
    setActiveLLItem: (
      state,
      action: PayloadAction<Pick<IGisStateILLayersListItem, 'id' | 'isActive'>>
    ) => {
      state.itemLayout.layersList = state.itemLayout.layersList.map((item) =>
        item.id === action.payload.id
          ? { ...item, isActive: action.payload.isActive }
          : { ...item, isActive: false },
      );
    },
    setCahe: (
      state,
      action: PayloadAction<string>
    ) => {
      state.itemLayout.cache = action.payload;
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
  setItemLayoutLList,
  resetItemLayout,
  setActiveLLItem,
  setCahe,
} = settingsSlice.actions;
export { gisSliceName };
export default settingsSlice.reducer;
