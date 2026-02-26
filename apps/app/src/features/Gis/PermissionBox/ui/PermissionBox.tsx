import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useSettings, useList } from '../model';
import { Polygon } from '@/shared/ui';
import { AppAnime } from '@/shared/config';
import { useDispatch } from 'react-redux';
import type { JSX } from 'react';
import type { TRootDispatch } from '@/shared/store';

import styles from './PermissionBox.module.scss';


function PermissionBox(): JSX.Element {
    const dispatch = useDispatch<TRootDispatch>();
    const { keyId, layersList, setPointsList } = useList(dispatch);
    const {
        tifImg,
        trnsRef,
        isTransform,
        penType,
        setZoomState,
    } = useSettings(dispatch);

    return (
        <div className={ `${styles['permission-box']} ${isTransform ? '' : styles['scroll-type']} ` }>
            { tifImg && layersList.length
                ? <TransformWrapper
                    ref={ trnsRef }
                    initialScale={ 1 }
                    minScale={ AppAnime.gisItemPermistValue.min / 100 }
                    maxScale={ AppAnime.gisItemPermistValue.max / 100 }
                    limitToBounds={ false }
                    panning={{ disabled: isTransform }}
                    wheel={{ disabled: isTransform }}
                    pinch={{ disabled: isTransform }}
                    doubleClick={{ disabled: isTransform }}
                    onZoom={ setZoomState }
                  >
                    <TransformComponent
                        wrapperClass={ styles['permission-box-wrapper'] }
                        contentClass={ styles['permission-box-component'] }
                    >
                        <div className={ styles['img-block'] }>
                            <img
                                className={ styles['img-block__img'] }
                                src={ tifImg.img }
                                alt="card-img"
                            />
                            <div className={ styles['img-block__layers'] }>
                                <div className={ styles['ibl-body'] }>
                                    { (layersList.map((item, index) => (
                                        <Polygon
                                            key={`${keyId}-${index}`}
                                            pointsList={ item.polygons }
                                            setPointsList={ setPointsList(item.id) }
                                            isSow={ item.isShow }
                                            isActive={ isTransform && item.isActive }
                                            workType={ penType }
                                            drawWidth={ 15 }
                                            imgWidth={ tifImg.selfSize.width }
                                            imgHeight={ tifImg.selfSize.height }
                                            sepСoeff={ 2 }
                                            pointRad={ 5 }
                                            lineWidth={ 1 }
                                            bgColor={ item.color }
                                            lineColor={ 'black' }
                                        />
                                    ))) }
                                </div>
                            </div>
                        </div>
                    </TransformComponent>
                  </TransformWrapper>
                : <div className={ styles['permission-box__empty'] }>
                    <h5>Макет не загружен</h5>
                  </div>
            }
        </div>
    )
}

export default PermissionBox;
