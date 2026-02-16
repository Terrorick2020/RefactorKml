import type { JSX } from 'react';
import type { IPlusMinusProps } from './types';

import styles from './PlusMinus.module.scss';


function PluseMinus({ isPluse=true, size=null }: IPlusMinusProps): JSX.Element {
    return <div
        className={ `${styles['pluse-minus']} ${isPluse ? styles['is-pluse'] : ''}` }
        style={size ? { width: size, height: size } : undefined}
    />
}

export default PluseMinus;
