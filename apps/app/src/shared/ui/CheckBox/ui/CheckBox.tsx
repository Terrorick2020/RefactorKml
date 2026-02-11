import type { JSX } from 'react';
import type { ICheckBoxProps } from './types';

import styles from './CheckBox.module.scss';


function CheckBox({ text, checked, setChecked }: ICheckBoxProps): JSX.Element {
    return (
        <label className={ styles['checkbox'] }>
            <input
                type="checkbox"
                checked={ checked }
                onChange={ (e) => setChecked(e.target.checked) }
            />
            <span className={ styles['checkbox__custom'] }></span>
            <p>{ text }</p>
        </label>
    )
}

export default CheckBox;
