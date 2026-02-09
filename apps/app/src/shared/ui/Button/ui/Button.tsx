import type { JSX } from 'react';
import { type IButtonProps, EButtonViewType } from './types';

import styles from './Button.module.scss';


function Button({
        text='',
        icon=<></>,
        viewType=EButtonViewType.Text,
        bgColor='transparent',
        className='',
        ...props
}: IButtonProps): JSX.Element {
    const addClass = viewType === EButtonViewType.Text
        ? styles['btn-text']
        : styles['btn-icon'];

    return (
        <button
            className={ `${styles['button']} ${addClass} ${className}` }
            style={{ ['--bg-button-color' as any]: bgColor }}
            { ...props }
        >
            { viewType === EButtonViewType.Text
                && <span className={ styles['button__text'] }>{ text }</span>
            }
            <span className={ styles['button__icon'] }>{ icon }</span>
        </button>
    )
}

export default Button;
