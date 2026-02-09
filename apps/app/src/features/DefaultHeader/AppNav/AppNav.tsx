import type { JSX } from 'react';

import styles from './AppNav.module.scss';


function AppNav(): JSX.Element {
    return (
        <nav className={ styles['app-nav'] }></nav>
    )
}

export default AppNav;
