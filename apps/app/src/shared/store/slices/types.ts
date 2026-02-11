export interface ISettingsState {
  theme: EThemes
}

export enum EThemes {
  Light = 'light',
  Dark = 'dark',
}

export interface IGisState {
  itemLayout: IGisStateItemLayout
}

export interface IGisStateItemLayout {
  isAutoSave: boolean
  tools: {
    cursorType: EGisCursorType,
    penType: EGisPenType
    zoom: number
  }
}

export enum EGisCursorType {
  Scroll = 'scroll',
  Scale = 'scale',
}

export enum EGisPenType {
  Pen = 'pen',
  Marker = 'marker',
}
