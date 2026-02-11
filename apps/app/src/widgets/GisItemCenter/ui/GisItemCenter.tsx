import { WidgetBlock } from '@/widgets';
import { CursorPanel, PenPanel, PermissionPanel, PermissionBox } from '@/features/Gis';
import type { JSX } from 'react';

import styles from './GisItemCenter.module.scss';


function GisItemCenter(): JSX.Element {
    return (
        <article className={ styles['gis-item-center'] }>
            <div className={ styles['gis-item-center__body'] }>
                <PermissionBox />
            </div>
            <div className={ styles['gis-item-center__panel'] }>
                <WidgetBlock>
                    <div className={ styles['panel-box'] }>
                        <div className={ styles['panel-box__item'] }>
                            <CursorPanel />
                        </div>
                        <div className={ styles['panel-box__item'] }>
                            <PenPanel />
                        </div>
                        <div className={ styles['panel-box__item'] }>
                            <PermissionPanel />
                        </div>
                    </div>
                </WidgetBlock>
            </div>
        </article>
    )
}

export default GisItemCenter;
