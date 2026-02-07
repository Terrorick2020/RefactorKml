import type { JSX } from 'react';
import type { IAppNavProps } from './types';

import styles from './AppNav.module.scss';


function AppNav({}: IAppNavProps): JSX.Element {
    return (
        <nav className={ styles['app-nav'] }></nav>
    )
}

export default AppNav;
