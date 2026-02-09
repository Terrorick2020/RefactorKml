import { WidgetBlock, GisItemRitght, GisItemCenter, GisItemLeft } from '@/widgets';
import type { JSX } from 'react';

import styles from './GisItemPage.module.scss';


function GisItemPage(): JSX.Element {
    return (
        <div className={ styles['gis-item-page'] }>
            <aside className={ styles['gis-item-page__block'] }>
                <WidgetBlock>
                    <GisItemLeft />
                </WidgetBlock>
            </aside>
            <main className={ styles['gis-item-page__block'] }>
                <WidgetBlock>
                    <GisItemCenter />
                </WidgetBlock>
            </main>
            <aside className={ styles['gis-item-page__block'] }>
                <WidgetBlock>
                    <GisItemRitght />
                </WidgetBlock>
            </aside>
        </div>
    )
}

export default GisItemPage;
