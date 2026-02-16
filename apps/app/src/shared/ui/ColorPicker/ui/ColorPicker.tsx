import { HexColorPicker } from 'react-colorful';
import { usePopover, useColor } from '../model';
import type { JSX } from 'react';
import type { IColorPickerProps } from './types';

import styles from './ColorPicker.module.scss';


function ColorPicker({ children, title='', color='red', setColor }: IColorPickerProps): JSX.Element {
    const { open, setCritOpen, popoverRef, buttonRef } = usePopover();
    const { innerColor, setInnerColor, setGlobColor } = useColor(color, setColor || (() => {}));

    return (
        <div className={ styles['color-picker'] }>
            <div className={ styles['color-picker__input'] }>
                <div
                    ref={ buttonRef }
                    className={ styles['colored-box'] }
                    onClick={ setCritOpen }
                    style={{ background: innerColor }}
                />
                { open && <div
                    ref={ popoverRef }
                    className={ styles['colored-popover'] }
                    style={{ display: open ? 'block' : 'none' }}
                    onMouseUp={ setGlobColor }
                >
                    <HexColorPicker
                        className={ styles['colored-popover__colorful'] }
                        color={ innerColor }
                        onChange={ setInnerColor }
                    />
                </div> }
            </div>
            <p className={ styles['color-picker__title'] }>{ title }</p>
            <div className={ styles['color-picker__jsx'] }>
                { children }
            </div>
        </div>
    )
}

export default ColorPicker;
