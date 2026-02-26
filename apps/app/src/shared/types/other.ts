export interface IFileTree {
  [folder: string]: File[];
}

export type TAttrKey<Pref extends string, Name extends string> = `${Pref}${Name}`;

export interface IKmlParsedFormat<Pref extends string = ''> {
  '?xml': TKmlXml<Pref>;
  kml: TKmlKml<Pref>;
  [key: string]: any;
}

type TKmlXml<Pref extends string> =  {
  [K in TAttrKey<Pref, 'encoding' | 'version' | any>]: string;
}

type TKmlKml<Pref extends string> = {
  [K in TAttrKey<Pref, 'xmlns' | 'xmlns:xsd' | 'xmlns:xsi'| any>]: string;
} & { Document: IKmlKmlDocument<Pref>; [key: string]: any; };

interface IKmlKmlDocument<Pref extends string> {
  Folder: IKmlKmlDocumentFolder<Pref>| IKmlKmlDocumentFolder<Pref>[];
  [key: string]: any;
}

interface IKmlKmlDocumentFolder<Pref extends string> {
  name: string;
  Placemark: ITDocFolderPlacemark<Pref>[];
  [key: string]: any;
}

interface ITDocFolderPlacemark<Pref extends string> {
  name: string;
  visibility: boolean;
  Style: ITFoldPlacemarkStyle;
  ExtendedData: ITFoldPlacemarkExtendedData<Pref>[];
  Polygon: ITFoldPlacemarkPolygon<Pref>;
  [key: string]: any;
}

interface ITFoldPlacemarkStyle {
  LineStyle: ITStyleLine;
  PolyStyle: ITStylePoly;
  [key: string]: any;
}

interface ITStyleLine {
  color: string;
  width: number;
  [key: string]: any;
}

interface ITStylePoly {
  color: string;
  fill: string;
  outline: boolean;
  [key: string]: any;
}

interface ITFoldPlacemarkExtendedData<Pref extends string> {
  Data: ITExtDataData<Pref>[];
  [key: string]: any;
}

type ITExtDataData<Pref extends string> = {
  [K in TAttrKey<Pref, 'name' | any>]: string;
} & {
  displayName: string
  value: string | number;
  [key: string]: any;
}

interface ITFoldPlacemarkPolygon<Pref extends string> {
  outerBoundaryIs: ITFoldBoundaryIs<Pref>;
  innerBoundaryIs?: ITFoldBoundaryIs<Pref> | ITFoldBoundaryIs<Pref>[];
  [key: string]: any;
}

type ITFoldBoundaryIs<Pref extends string> = {
  [K in TAttrKey<Pref, 'xsi:type' | any>]: string;
} & {
  LinearRing: ITOuterLinearRig
  [key: string]: any;
}

interface ITOuterLinearRig {
  coordinates: string;
  [key: string]: any;
}
