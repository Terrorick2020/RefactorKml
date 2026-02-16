import { UploadLayers, DownloadLayers, SendLayers, ClearLayers, SaveUpdates, ThrowOffUpdates } from '@/features/Gis';
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
                <div className={ styles['bgirb-item'] }>
                    <UploadLayers />
                    <ClearLayers />
                </div>
                <div className={ styles['bgirb-item'] }>
                    <ThrowOffUpdates />
                    <SaveUpdates />
                </div>
                <div className={ styles['bgirb-item'] }>
                    <SendLayers />
                    <DownloadLayers />
                </div>
            </div>
        </article>
    )
}

export default GisItemRitght;
