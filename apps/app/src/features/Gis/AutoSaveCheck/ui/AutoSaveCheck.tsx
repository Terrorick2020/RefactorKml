import { CheckBox } from '@/shared/ui';
import type { JSX } from 'react';

import styles from './AutoSaveCheck.module.scss';


function AutoSaveCheck(): JSX.Element {
    return (
        <div className={ styles['autosave-check'] }>
            <CheckBox
                text="Автосохранение"
            />;
        </div>
    )
}

export default AutoSaveCheck;