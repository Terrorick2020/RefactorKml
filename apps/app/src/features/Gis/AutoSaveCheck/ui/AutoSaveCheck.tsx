import { CheckBox } from '@/shared/ui';
import { useCheck } from '../model';
import type { JSX } from 'react';

import styles from './AutoSaveCheck.module.scss';


function AutoSaveCheck(): JSX.Element {
    const { isAutoSave, setIsAutoSave } = useCheck();

    return (
        <div className={ styles['autosave-check'] }>
            <CheckBox
                text="Автосохранение"
                checked={ isAutoSave }
                setChecked={ setIsAutoSave }
            />;
        </div>
    )
}

export default AutoSaveCheck;