import { useId, type JSX, type ChangeEvent } from 'react';
import type { IDropUpListProps } from './types';

import styles from './DropUpList.module.scss';


function DropUpList<T extends string | number>({
    title,
    setValue,
    valuesList,
}: IDropUpListProps<T>): JSX.Element {
    const keyId = useId();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        if (setValue) setValue(e.target.value as T);
    };

    return (
        <div className={ styles['drop-up-list'] }>
            <label htmlFor={ `drop-up-${keyId}` }>{ title }</label>
            <select id={ `drop-up-${keyId}` } onChange={handleChange}>
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
