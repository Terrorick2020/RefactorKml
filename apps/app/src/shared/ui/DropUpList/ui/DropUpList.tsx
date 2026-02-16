import { useId, type JSX } from 'react';
import type { IDropUpListProps } from './types';

import styles from './DropUpList.module.scss';


function DropUpList({ title, valuesList }: IDropUpListProps): JSX.Element {
    const keyId = useId();

    return (
        <div className={ styles['drop-up-list'] }>
            <label htmlFor={ `drop-up-${keyId}` }>{ title }</label>
            <select id={ `drop-up-${keyId}` }>
                { valuesList?.map((item, index) => (
                    <option
                        key={ `duo-${keyId}-${index}` }
                        value={ item.value }
                    >{ item.label }</option>
                )) || <option disabled>Пусто</option> }
            </select>
        </div>
    )
}

export default DropUpList;
