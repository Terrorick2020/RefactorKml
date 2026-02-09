import { useLoadImg } from '../model/useLoadImg';
import { ELoaderUiStatus } from '@/shared/types';
import { Skeleton } from '@/shared/ui';
import { type JSX, memo, useMemo } from 'react';
import type { IImgLoaderProps } from './types';

import styles from './ImgLoader.module.scss';


function ImgLoader({ src='', alt='null', size='100%' }: IImgLoaderProps): JSX.Element {
    const status = useLoadImg(src);

    console.log( src )

    const ResultJsx = useMemo<JSX.Element>(() => {
        let result = <></>;

        switch(status) {
            case ELoaderUiStatus.Loading:
                result = <Skeleton />;
                break;
            case ELoaderUiStatus.Loaded:
                result = <img src={ src } alt={ alt } />;
                break;
            case ELoaderUiStatus.Error:
            default:
                result = <></>;
        }
        
        return result;
    }, [ status ])

    return (
        <div
            className={ styles['img-loader'] }
            style={{ width: size, height: size }}
        >
            { ResultJsx }
            <Skeleton />
        </div>
    )
}

export default memo( ImgLoader );
