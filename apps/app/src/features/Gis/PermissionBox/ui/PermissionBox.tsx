import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useSettings, useList } from '../model';
import { Polygon } from '@/shared/ui';
import { AppAnime } from '@/shared/config';
import { useDispatch } from 'react-redux';
import type { JSX } from 'react';
import type { TRootDispatch } from '@/shared/store';

import TestJpg from './test.jpg';
import styles from './PermissionBox.module.scss';


function PermissionBox(): JSX.Element {
    const dispatch = useDispatch<TRootDispatch>();
    const { trnsRef, isTransform, penType, setZoomState } = useSettings(dispatch);
    const { keyId, layersList, setPointsList } = useList(dispatch);

    return (
        <div className={ `${styles['permission-box']} ${isTransform ? '' : styles['scroll-type']} ` }>
            <TransformWrapper
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
                            src={ TestJpg }
                            alt="card-img"
                        />
                        <div className={ styles['img-block__layers'] }>
                            <div className={ styles['ibl-body'] }>
                                { (layersList.map((item, index) => (
                                    <Polygon
                                        key={`${keyId}-${index}`}
                                        bgColor={ item.color }
                                        pointsList={ item.coordinats }
                                        isSow={ item.isShow }
                                        workType={ penType }
                                        isActive={ isTransform && item.isActive }
                                        setPointsList={ setPointsList(item.id) }
                                    />
                                ))) }
                            </div>
                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

export default PermissionBox;
