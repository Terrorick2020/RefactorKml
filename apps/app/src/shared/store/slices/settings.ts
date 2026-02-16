import { createSlice } from '@reduxjs/toolkit';

import { type ISettingsState, EThemes } from './types';


const initialState: ISettingsState = {
  theme: EThemes.Dark,
}

const settingsSliceName = 'settingsSlice';

const settingsSlice = createSlice({
  name: settingsSliceName,
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === EThemes.Light 
        ? EThemes.Dark
        : EThemes.Light;
    },
  },
  extraReducers: (_builder) => {},
})

export const { toggleTheme } = settingsSlice.actions;
export { settingsSliceName }
export default settingsSlice.reducer;
