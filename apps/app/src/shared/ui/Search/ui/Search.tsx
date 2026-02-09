import type { JSX } from 'react';
import type { ISearchProps } from './types';

import MagnifierSvgr from './magnifier.svg?react';
import styles from './Search.module.scss';


function Search({ placeholder='' }: ISearchProps): JSX.Element {
    return (
        <div className={ styles['search'] }>
            <div className={ styles['search__icon'] }>
                <MagnifierSvgr />
            </div>
            <input
                className={ styles['search__input'] }
                type="text"
                placeholder={ placeholder }
            />
        </div>
    )
}

export default Search;
