import { WidgetBlock, AppLogo, AppNav } from '@/widgets';
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
                        
                    </div>
                </div>
            </WidgetBlock>
        </header>
    )
}

export default DefaultHeader;
