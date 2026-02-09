import { WidgetBlock } from '@/widgets';
import type { JSX } from 'react';

import styles from './GisItemCenter.module.scss';


function GisItemCenter(): JSX.Element {
    return (
        <article className={ styles['gis-item-center'] }>
            <div className={ styles['gis-item-center__body'] }>
                
            </div>
            <div className={ styles['gis-item-center__panel'] }>
                <WidgetBlock>
                    <></>
                </WidgetBlock>
            </div>
        </article>
    )
}

export default GisItemCenter;
