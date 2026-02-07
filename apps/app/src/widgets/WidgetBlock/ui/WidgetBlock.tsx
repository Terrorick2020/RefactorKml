import type { JSX } from 'react';
import type { IBaseCompTmplProps } from '@/shared/types';

import styles from './WidgetBlock.module.scss';


function WidgetBlock({ children }: IBaseCompTmplProps): JSX.Element {
    return (
        <div className={ styles['wiget-block'] }>
            { children }
        </div>
    )
}

export default WidgetBlock;