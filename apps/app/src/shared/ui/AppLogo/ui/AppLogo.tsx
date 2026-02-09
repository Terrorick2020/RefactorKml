import type { JSX } from 'react';
import type { IAppLogoProps } from './types';

import LogoSvgr from './logo.svg?react';
import styles from './AppLogo.module.scss';


function AppLogo({ withTxt = true }: IAppLogoProps): JSX.Element {
    return (
        <figure className={ styles['app-logo'] }>
            <LogoSvgr />
            { withTxt && <h4>Геопульт</h4> }
        </figure>
    )
}

export default AppLogo;
