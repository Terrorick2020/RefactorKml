import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { type ISettingsState, EThemes } from './types';


const initialState: ISettingsState = {
  theme: EThemes.Dark,
}

const settingsSliceName = 'settings';

const settingsSlice = createSlice({
  name: settingsSliceName,
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<EThemes>) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (_builder) => {},
})

export const { setTheme } = settingsSlice.actions;
export { settingsSliceName }
export default settingsSlice.reducer;
