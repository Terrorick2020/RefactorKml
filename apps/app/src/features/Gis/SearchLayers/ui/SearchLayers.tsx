import { Search } from '@/shared/ui';
import { useSearch } from '../model';
import { useDispatch } from 'react-redux';
import type { JSX } from 'react';
import type { TRootDispatch } from '@/shared/store';

import styles from './SearchLayers.module.scss';


function SearchLayers(): JSX.Element {
    const dispatch = useDispatch<TRootDispatch>();

    const { query, setQuery } = useSearch(dispatch);

    return (
        <div className={ styles['searh-layers'] }>
            <Search
                placeholder='Поиск слоя'
                value={ query }
                setValue={ setQuery }
            />
        </div>
    )
}

export default SearchLayers;
