import { WidgetBlock } from '@/widgets';
import { AppNav, ThemeBtn, ProfileBtn } from '@/features/DefaultHeader';
import { AppLogo } from '@/shared/ui';
import type { JSX } from 'react';

import styles from './DefaultHeader.module.scss'


function DefaultHeader(): JSX.Element {
    return (
        <header className={ styles['default-header'] }>
            <WidgetBlock>
                <div className={ styles['default-header__ctx'] }>
                    <AppLogo />
                    <AppNav />
                    <div className={ styles['app-root-nav-btns'] }>
                        <ThemeBtn />
                        <ProfileBtn />
                    </div>
                </div>
            </WidgetBlock>
        </header>
    )
}

export default DefaultHeader;
