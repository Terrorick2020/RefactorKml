import {
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import {
  EGisCursorType,
  EGisPenType,
  type IGisState,
  type IGisStateItemLayout
} from './types';


const initialState: IGisState = {
  itemLayout: {
    isAutoSave: false,
    tools: {
      cursorType: EGisCursorType.Scroll,
      penType: EGisPenType.Pen,
      zoom: 100,
    }
  }
};

const gisSliceName = 'gisSlice';

const settingsSlice = createSlice({
  name: gisSliceName,
  initialState,
  reducers: {
    setItemLayout: (state, action: PayloadAction<Partial<IGisStateItemLayout>>) => {
      state.itemLayout = { ...state.itemLayout, ...action.payload };
    },
    resetItemLayout: state => {
      state.itemLayout = initialState.itemLayout;
    }
  },
  extraReducers: (_builder) => {},
})

export const { setItemLayout, resetItemLayout } = settingsSlice.actions;
export { gisSliceName }
export default settingsSlice.reducer;
