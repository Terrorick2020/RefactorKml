import { Outlet } from 'react-router-dom';
import { DefaultHeader } from '@/widgets/DefaultHeader';
import { useSelector } from 'react-redux';
import type { JSX } from 'react';
import type { IRootState } from '@/shared/store';

import styles from './DefaultLayout.module.scss';


function DefaultLayout(): JSX.Element {
    const theme = useSelector((state: IRootState) => state.settings.theme);

    return (
        <div id={ theme } className={ styles.default }>
            <div className={ styles.default__box }>
                <DefaultHeader />
                <div className={ styles['box-body'] }>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout;
