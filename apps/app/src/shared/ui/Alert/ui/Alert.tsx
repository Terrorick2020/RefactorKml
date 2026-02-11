import { nextZIndex } from '../model';
import type { IAlertProps } from './types';
import type { JSX } from 'react';

import styles from './Alert.module.scss';


function Alert({ children, title, open, setOpen }: IAlertProps): JSX.Element {

    return (
        open ? (
            <div
                className={ styles['alert'] }
                style={{
                    display: open ? 'flex' : 'none',
                    zIndex:  nextZIndex(),
                }}
                onClick={() => setOpen(false)}
            >
                <div className={ styles['alert__ctx'] }>
                    <header className={ styles['alert-header'] }>
                        <h4>{ title }</h4>
                        <hr />
                    </header>
                    <main className={ styles['alert-main'] }>
                        { children }
                    </main>
                </div>
            </div>
        ) : <></>
    )
}

export default Alert;
