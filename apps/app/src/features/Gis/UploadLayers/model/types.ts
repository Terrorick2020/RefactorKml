export interface IParsTifReturn {
  img: string;
  meta: IParsTifMeta;
}

export interface IParsTifMeta {
  tiePoints: TiePoint[];
  pixelScale: number[];
  tifCrs: string;
  height: number;
  width: number;
}

export interface TiePoint {
  i: number;
  j: number;
  k: number;
  x: number;
  y: number;
  z: number;
}
