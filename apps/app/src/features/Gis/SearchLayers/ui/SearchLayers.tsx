import { Search } from '@/shared/ui';
import type { JSX } from 'react';

import styles from './SearchLayers.module.scss';


function SearchLayers(): JSX.Element {
    return (
        <div className={ styles['searh-layers'] }>
            <Search placeholder='Поиск слоя'/>
        </div>
    )
}

export default SearchLayers;
