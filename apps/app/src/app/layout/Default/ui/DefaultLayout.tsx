import { Outlet } from 'react-router-dom';
import type { JSX } from 'react';

import style from './DefaultLayout.module.scss';


function DefaultLayout(): JSX.Element {
    return (
        <div className={ style.default }>
            <div className={ style.default__box }>
                <Outlet />
            </div>
        </div>
    )
}

export default DefaultLayout;
