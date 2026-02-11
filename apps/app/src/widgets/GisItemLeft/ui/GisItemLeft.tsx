import { AutoSaveCheck, SearchLayers, ListLayers } from '@/features/Gis';
import type { JSX } from 'react';

import styles from './GisItemLeft.module.scss';


function GisItemLeft(): JSX.Element {
    return (
        <article className={ styles['gis-item-left'] }>
            <SearchLayers />
            <div className={ styles['gis-item-left__body'] }>
                <div className={ styles['list'] }>
                    <ListLayers  />
                </div>
                <AutoSaveCheck />
            </div>
        </article>
    )
}

export default GisItemLeft;
