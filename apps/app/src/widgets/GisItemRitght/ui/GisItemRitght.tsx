import { UploadLayers, DownloadLayers, ClearLayers, SaveUpdates } from '@/features/Gis';
import type { JSX } from 'react';

import styles from './GisItemRitght.module.scss';


function GisItemRitght(): JSX.Element {
    return (
        <article className={ styles['gis-item-right'] }>
            <div className={ styles['gis-item-right__title'] }>
                <h5>Возможности</h5>
                <hr />
            </div>
            <div className={ styles['gis-item-right__body'] }>
                <UploadLayers />
                <ClearLayers />
                <SaveUpdates />
                <DownloadLayers />
            </div>
        </article>
    )
}

export default GisItemRitght;
