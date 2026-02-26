import type { IBaseDirTmpl } from '@/shared/types';


export const dirSystemLayout: IBaseDirTmpl[] = [
  {
    name: '/aux_',
    targFileTypes: ['.tif'],
    targFileNames: [
      'cropped_dem.tif',
      'cropped_raster.tif',
      'cropped_raster_orig_scale.tif'
    ],
    targSettFileName: 'cropped_raster.tif',
  },
  {
    name: '/DEM',
    targFileTypes: ['.tif'],
  },
  {
    name: '/layers',
    targFileTypes: ['.kml'],
    targFileNames: ['result.kml'],
    targSettFileName: 'result.kml',
  }
]

export const xmlParsCfg = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  parseTagValue: true,
};
