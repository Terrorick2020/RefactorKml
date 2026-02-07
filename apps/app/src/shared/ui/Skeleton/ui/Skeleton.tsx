import type { JSX } from 'react';

import styles from './Skeleton.module.scss';


function Skeleton(): JSX.Element {
    return <div className={ styles.skeleton } />;
}

export default Skeleton;
