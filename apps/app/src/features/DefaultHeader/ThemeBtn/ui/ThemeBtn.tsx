import { Button, EButtonViewType } from '@/shared/ui';
import type { JSX } from 'react';

import MoonSunSvgr from './moon-sun.svg?react';
import styles from './ThemeBtn.module.scss'


function ThemeBtn(): JSX.Element {
    return <Button
        viewType={ EButtonViewType.Icon }
        icon={
            <MoonSunSvgr className={ styles['theme-btn-icon'] }/>
        }
    />;
}

export default ThemeBtn;