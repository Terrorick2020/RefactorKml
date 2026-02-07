import { ImgLoader } from '@/shared/ui';
import type { JSX } from 'react';
import type { IAppLogoProps } from './types';

import styles from './AppLogo.module.scss';


function AppLogo({ withTxt = true }: IAppLogoProps): JSX.Element {
    return (
        <figure className={ styles['app-logo'] }>
            <ImgLoader src="" alt="logo" size="5vw" />
            { withTxt && <h4>Геопульт</h4> }
        </figure>
    )
}

export default AppLogo;
