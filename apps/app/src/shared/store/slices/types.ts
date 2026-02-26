import type { IPoint } from "@/shared/types";
import type { EPolygonWorkType } from "@/shared/ui";
export interface ISettingsState {
  theme: EThemes;
}

export enum EThemes {
  Light = "light",
  Dark = "dark",
}

export interface IGisState {
  itemLayout: IGisStateItemLayout;
}

export interface IGisStateItemLayout {
  isAutoSave: boolean;
  query: string;
  tools: IGisStateILTools;
  cache: string;
  tifImg: IGSItemLayoutTifImg | null;
  layersList: IGSItemLayoutLLItem[];
}

export interface IGSItemLayoutTifImg {
  img: string
  selfSize: IImgSize
}

export interface IImgSize {
  width: number
  height: number
}

export interface IGSItemLayoutLLItem {
  id: string;
  name: string;
  isShow: boolean;
  isActive: boolean;
  color: string;
  polygons: IGisLLItemPolygon[];
}

export interface IGisLLItemPolygon {
  id: string;
  name: string;
  lineColor: string;
  lineWidth: number;
  outerCoords: IPoint[];
  innerCoords?: IPoint[][];
}

export interface IGisStateILTools {
  cursorType: EGisCursorType;
  penType: EPolygonWorkType;
  zoom: number;
}

export enum EGisCursorType {
  Scroll = "scroll",
  Transform = "transform",
}
