import type { IBaseDirTmpl } from '@/shared/types';


export const dirSystemLayout: IBaseDirTmpl[] = [
  {
    name: '/aux_',
    targetFileType: ['.tif']
  },
  {
    name: '/Dem',
    targetFileType: ['.tif']
  },
  {
    name: '/layers',
    targetFileType: ['.kml']
  }
]
