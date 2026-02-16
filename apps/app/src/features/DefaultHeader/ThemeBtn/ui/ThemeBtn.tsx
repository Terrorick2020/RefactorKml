import { Button, EButtonViewType } from '@/shared/ui';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '@/shared/store';
import type { JSX } from 'react';
import type { TRootDispatch } from '@/shared/store';

import MoonSunSvgr from './moon-sun.svg?react';
import styles from './ThemeBtn.module.scss'


function ThemeBtn(): JSX.Element {
    const dispatch = useDispatch<TRootDispatch>();

    return <Button
        viewType={ EButtonViewType.Icon }
        icon={
            <MoonSunSvgr className={ styles['theme-btn-icon'] }/>
        }
        onClick={ () => {dispatch(toggleTheme())} }
    />;
}

export default ThemeBtn;