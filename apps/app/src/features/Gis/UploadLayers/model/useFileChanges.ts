import {
  setItemLayout,
  EGisCursorType,
  selectGis,
  type TRootDispatch,
  type IGSItemLayoutLLItem,
  type IGisLLItemPolygon,
} from '@/shared/store';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { XMLParser } from 'fast-xml-parser';
import { fromArrayBuffer } from 'geotiff';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { EPolygonWorkType } from '@/shared/ui';
import { dirSystemLayout, xmlParsCfg } from '@/shared/config';
import { type TFolderContextValue, FolderContext } from '@/entities';
import type { IParsTifReturn, TiePoint, IParsTifMeta } from './types'; 
import type { ChangeEvent } from 'react';
import type { IFileTree, IKmlParsedFormat, IPoint } from '@/shared/types';

import proj4 from 'proj4';


function geoToPixel(
  lon: number,
  lat: number,
  tiePoints: TiePoint[],
  pixelScale: number[],
  tifCrs: string,
): { x: number; y: number } | null {
  if (!tiePoints?.length || !pixelScale?.length) return null;

  const [xGeo, yGeo] = proj4('EPSG:4326', tifCrs, [lon, lat]);

  const tie = tiePoints[0];

  const scaleX = pixelScale[0];
  const scaleY = pixelScale[1];

  if (!scaleX || !scaleY) return null;

  const x = tie.i + (xGeo - tie.x) / scaleX;
  const y = tie.j - (yGeo - tie.y) / scaleY;

  return { x, y };
}

function isValidDirName(dirName: string): boolean {
  for(const item of dirSystemLayout) {
    if(item.name !== dirName) continue;
    return true;
  }
  
  return false;
}

function isValidFile(dirName: string, fileName: string): boolean {
  const targetDir = dirSystemLayout.find(item => item.name === dirName);
  if(!targetDir) return false;

  if(!targetDir.targFileNames) {
    const parts = fileName.split('.');
    const fileExp = '.' + parts[parts.length - 1];
    return targetDir.targFileTypes.includes(fileExp);
  }

  return targetDir.targFileNames.includes(fileName)
}

const onfilesChanges = (event: ChangeEvent<HTMLInputElement>): TFolderContextValue => {
  const files: File[] = Array.from(event.target.files ?? []);
  const tree: IFileTree = {};

  for(const file of files) {
    const pathParts = file.webkitRelativePath.split('/');
    const dirName = `/${pathParts[1]}`;

    if(!tree[dirName]) {
      const dirIsValid = isValidDirName(dirName);
      if(!dirIsValid) continue;
      tree[dirName] = [];
    }

    const fileIsValid = isValidFile(dirName, file.name);
    if(!fileIsValid) continue;

    tree[dirName].push(file);
  }

  if(Object.keys(tree).length !== dirSystemLayout.length) return null;

  for (let treeKey of Object.keys(tree)) {
    const targetDir = dirSystemLayout.find(item => item.name === treeKey);
    const resValid = tree[treeKey].length < (targetDir?.targFileTypes.length || 1);

    if(resValid) return null;
  }

  return tree;
}

async function parseKmlToJson<T = Record<string, any>>(file: File, cfg={}): Promise<T | null> {
  const text = await file.text();
  const parser = new XMLParser(cfg);

  try { return parser.parse(text) as T }
  catch (err) { return null }
}

async function parseTifToImg (file: File): Promise<IParsTifReturn | null> {
  const arrayBuffer = await file.arrayBuffer();
  const tiff = await fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();

  const width = image.getWidth();
  const height = image.getHeight();
  const samplesPerPixel = image.getSamplesPerPixel();

  const tiePoints = await image.getTiePoints() as TiePoint[];
  const pixelScale: number[] | undefined = image.fileDirectory.hasTag('ModelPixelScale')
    ? await image.fileDirectory.loadValue('ModelPixelScale')
    : undefined;
  const geoKeys = image.getGeoKeys();

  if(!tiePoints || !pixelScale || !geoKeys) return null;

  let tifCrs: string | null = null; 

  if (geoKeys.ProjectedCSTypeGeoKey) {
    tifCrs = `EPSG:${geoKeys.ProjectedCSTypeGeoKey}`;
  } else if (geoKeys.GeographicTypeGeoKey) {
    tifCrs = `EPSG:${geoKeys.GeographicTypeGeoKey}`;
  }

  if(!tifCrs) return null;

  const raster = await image.readRasters({ interleave: true });

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if(!ctx) return null;

  const rgba = new Uint8ClampedArray(width * height * 4);

  for (let i = 0, j = 0; i < raster.length; i += samplesPerPixel, j += 4) {
    if (samplesPerPixel === 1) {
      const val = raster[i];
      rgba[j] = val;
      rgba[j + 1] = val;
      rgba[j + 2] = val;
    } else {
      rgba[j] = raster[i];
      rgba[j + 1] = raster[i + 1];
      rgba[j + 2] = raster[i + 2];
    }

    rgba[j + 3] = 255;
  }

  const imgData = new ImageData(rgba, width, height);
  ctx.putImageData(imgData, 0, 0);
  
  return {
    img: canvas.toDataURL('image/png'),
    meta: {
      tiePoints,
      pixelScale,
      tifCrs: tifCrs,
      width,
      height,
    }
  }
}

function pCFStrList(list: string[], meta: IParsTifMeta): { resList: IPoint[], isErr: boolean } {
  const resList: IPoint[] = [];
  let isErr = false;

  for(let cOItem of list) {
    const [lonStr, latStr] = cOItem.split(',', 2);

    const lon = parseFloat(lonStr);
    const lat = parseFloat(latStr);

    if(isNaN(lon) || isNaN(lat)) {
      isErr = true;
      continue;
    }

    const result = geoToPixel(lon, lat, meta.tiePoints, meta.pixelScale, meta.tifCrs)

    if(!result) continue;

    resList.push(result);
  }

  return { resList, isErr };
}

function parseToLayersList(kmlJson: IKmlParsedFormat<"@_">, meta: IParsTifMeta): IGSItemLayoutLLItem[] {
  const result: IGSItemLayoutLLItem[] = [];

  const folderList = Array.isArray(kmlJson.kml.Document.Folder)
    ? kmlJson.kml.Document.Folder
    : [ kmlJson.kml.Document.Folder ];

  for(let folderItem of folderList) {
    const placeRes: IGisLLItemPolygon[] = [];
    let fakeColor: string = '';

    const placemarkList = Array.isArray(folderItem.Placemark)
      ? folderItem.Placemark
      : [ folderItem.Placemark ];
    
    for(let placeItem of placemarkList) {
      if(!fakeColor) {
        const target = placeItem.Style.PolyStyle.color;

        if(!target) fakeColor = '#000000';
        else fakeColor = `#${target}`.substring(0, 7);
      };
      let innerCoords: IPoint[][] | undefined;

      const outerList = placeItem
        .Polygon
        .outerBoundaryIs
        .LinearRing
        .coordinates
        .trim()
        .split(' ');
      const innerItem = placeItem.Polygon.innerBoundaryIs;
      const outerCoords = pCFStrList(outerList, meta).resList;

      if(innerItem) {
        innerCoords = [];
        const innerList = Array.isArray(innerItem)
          ? innerItem
          : [ innerItem ];

        for(let cIItem of innerList) {
          const inner = cIItem
            .LinearRing
            .coordinates
            .trim()
            .split(' ');
          
          const innerResList = pCFStrList(inner, meta);

          if(innerResList.resList.length) innerCoords.push(innerResList.resList);
        }

        if(!innerCoords.length) innerCoords = undefined;
      }

      placeRes.push({
        id: uuidv4(),
        name: placeItem.name,
        lineColor: placeItem.Style.LineStyle.color,
        lineWidth: placeItem.Style.LineStyle.width,
        outerCoords,
        innerCoords,
      })
    }

    result.push({
      id: uuidv4(),
      name: folderItem.name,
      isShow: false,
      isActive: false,
      color: fakeColor,
      polygons: placeRes,
    })
  }

  return result;
}

export const useFileChanges = () => {
  const { tifImg, layersList } = useSelector(selectGis).itemLayout;
  const [load, setLoad] = useState<boolean>(false);
  const dispatch = useDispatch<TRootDispatch>();
  const folderCtx = useContext(FolderContext);
  

  const syncStore = async (kmlFile: File, tifFile: File): Promise<void> => {
    const [ kmlRes, tifRes ] = await Promise.all([
      parseKmlToJson<IKmlParsedFormat<"@_">>(kmlFile, xmlParsCfg),
      parseTifToImg(tifFile),
    ])

    if(!kmlRes || !tifRes) {
      alert("Произошла ошибка при обработке файлов!");
    } else {
      const layersList = parseToLayersList(kmlRes, tifRes.meta);
    
      dispatch(setItemLayout({
        layersList,
        tifImg: {
          img: tifRes.img,
          selfSize: {
            width: tifRes.meta.width,
            height: tifRes.meta.height,
          },
        },
        tools: {
          cursorType: EGisCursorType.Scroll,
          penType: EPolygonWorkType.Figure,
          zoom: 100,
        }
      }))
    }

    setLoad(false);
  };

  const filesChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLoad(true);
    const result = onfilesChanges(event);
    event.target.value = '';

    if(!result) {
      alert('Неправильрный формат содержания папки!');
      setLoad(false);
      return;
    } else {
      folderCtx.setValue(result);

      const targetKml = result['/layers'][0];
      const targetTif = result['/aux_'].find(item => item.name === 'cropped_raster.tif');

      if(!targetKml || !targetTif) {
        alert('Ошибка обработки загруженных файлов');
        setLoad(false);
        return;
      }

      syncStore(targetKml, targetTif);
    }
  }

  const isDisable = !!layersList.length && !!tifImg || load;

  return { load, isDisable, filesChange }
}
