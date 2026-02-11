import type { JSX } from 'react';
import { type IButtonProps, EButtonViewType, EButtonFileType } from './types';

import styles from './Button.module.scss';


function Button({
        text='',
        icon=<></>,
        viewType=EButtonViewType.Text,
        fileType=null,
        bgColor='transparent',
        onFileChange=()=> {},
        ...props
}: IButtonProps): JSX.Element {
    const addClass = viewType === EButtonViewType.Text
        ? styles['btn-text']
        : styles['btn-icon'];
    
    const isMultiple = fileType === EButtonFileType.Files;
    const isWebkitDir = fileType === EButtonFileType.Folder;

    return (
        <button
            className={ `${styles['button']} ${addClass}` }
            style={{ ['--bg-button-color' as any]: bgColor }}
            { ...props }
        >
            { viewType === EButtonViewType.Text
                && <span className={ styles['button__text'] }>{ text }</span>
            }
            <span className={ styles['button__icon'] }>{ icon }</span>
            { !!fileType
                && <input
                        type="file"
                        multiple={ isMultiple }
                        ref={(input) => {
                            if (input) {
                                input.webkitdirectory = isWebkitDir;
                            }
                        }}
                        onChange={onFileChange}
                    />
            }
        </button>
    )
}

export default Button;
