import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import type { JSX } from 'react';

import TestJpg from './test.jpg';
import styles from './PermissionBox.module.scss';


function PermissionBox(): JSX.Element {
    return (
        <div className={ styles['permission-box'] }>
            <TransformWrapper
                initialScale={ 1 }
                minScale={ 0.1 }
                maxScale={ 2.0 }
                limitToBounds={ false }
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
                        <div className={ styles['img-block__layers'] }></div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

export default PermissionBox;
