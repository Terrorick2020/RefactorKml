import { useId } from 'react';
import { useSelector } from 'react-redux';
import { EISPListType } from '@/shared/ui';
import { v4 as uuid } from 'uuid';
import { selectGisItemList, setLayersListItem } from '@/shared/store';
import type { TUseList } from './types';
import type { IPolygonPointsList, ISetPLFigure } from '@/shared/ui';


export const useList: TUseList = (dispatch) => {
  const keyId = useId();
  const layersList = useSelector(selectGisItemList);

  const setPointsList = (id: string) => {
    const targLayer = layersList.find(item => item.id === id);
    if(!targLayer) return ()=>()=>{};

    function handler(type: EISPListType.Upt, indx: number): ISetPLFigure<IPolygonPointsList>;
    function handler(type: EISPListType.Add): ISetPLFigure<IPolygonPointsList>;
    function handler(type: EISPListType.Set): ISetPLFigure<IPolygonPointsList[]>;

    function handler(type: EISPListType, indx?: number) {
      if (!targLayer) return () => {}

      switch(type) {
        case EISPListType.Upt:
          if(indx === undefined) return ()=>{};

          return (newValue: IPolygonPointsList) => {
            dispatch(setLayersListItem({
              id,
              polygons: targLayer.polygons.map((item, index) => index === indx
                ? { ...item, ...newValue}
                : item
              )
            }))
          }
        case EISPListType.Add:
          return (newValue: IPolygonPointsList) => {
            dispatch(setLayersListItem({
              id,
              polygons: [
                ...targLayer.polygons,
                {
                  id: uuid(),
                  name: `${targLayer.name}_${targLayer.polygons.length}`,
                  lineColor: targLayer.polygons[0].lineColor,
                  lineWidth: targLayer.polygons[0].lineWidth,
                  ...newValue,
                }
              ]
            }))
          }
        case EISPListType.Set:
          return (newValue: IPolygonPointsList[]) => {
            dispatch(setLayersListItem({
              id,
              polygons: newValue.map((item, index) => ({
                id: uuid(),
                name: `${targLayer.name}_${index}`,
                lineColor: targLayer.polygons[0].lineColor,
                lineWidth: targLayer.polygons[0].lineWidth,
                ...item,
              }))
            }))
          }
      }
    }

    return handler;
  }
  
  return { keyId, layersList, setPointsList }
}
