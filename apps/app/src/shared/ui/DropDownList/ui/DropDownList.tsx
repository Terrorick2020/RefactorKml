import type { JSX } from 'react';
import type { IDropDownProps } from './types';

import ArrowDownWvgr from './arrow-down.svg?react';
import styles from './DropDownList.module.scss';


function DropDownList({ children, title, addClass='' }: IDropDownProps): JSX.Element {
    return (
        <details className={ styles['drop-down-list'] }>
            <summary className={ styles['drop-down-list__title'] }>
                <ArrowDownWvgr className={ styles['summary-icon'] } />
                <h6 className={ styles['summary-title'] }>{ title }</h6>
            </summary>
            <div className={styles['drop-down-list__body']}>
                <div className={ `${styles['content']} ${addClass}` }>
                    { children }
                </div>
            </div>
        </details>
    )
}

export default DropDownList;
