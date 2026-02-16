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
  layersList: IGisStateILLayersListItem[];
  img: IGisStateILLayersImg | null;
  cache: string
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

export interface IGisStateILLayersListItem {
  id: string;
  fileName: string;
  label: string;
  color: string;
  isShow: boolean;
  isActive: boolean
  coordinats: IPoint[];
}

export interface IGisStateILLayersImg {
  initial: IGisILLayersImgVal;
  target: IGisILLayersImgVal;
}

export interface IGisILLayersImgVal {
  width: number;
  height: number;
}
