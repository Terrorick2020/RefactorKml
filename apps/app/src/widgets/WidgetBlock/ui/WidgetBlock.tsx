import type { JSX } from 'react';
import type { IWigetBlockProps } from './types';

import styles from './WidgetBlock.module.scss';


function WidgetBlock({ children, isDarken=false }: IWigetBlockProps): JSX.Element {
    return (
        <div className={ `${styles['wiget-block']} ${isDarken ? styles['darken'] : ''}` }>
            { children }
        </div>
    )
}

export default WidgetBlock;
