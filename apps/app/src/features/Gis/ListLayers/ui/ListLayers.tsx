import { DropDownList, ColorPicker } from '@/shared/ui';
import type { IListLayersItemProps } from './types';
import { type JSX, useId } from 'react';

import styles from './ListLayers.module.scss';


function ListLayersItem({ title }: IListLayersItemProps): JSX.Element {
    return (
        <ColorPicker title={ title }>
            <></>
        </ColorPicker>
    )
}

function ListLayers(): JSX.Element {
    const keyId = useId();
    const list = ['Слой 1', 'Слой 2', 'Слой 3'];

    return (
        <div className={ styles['list-layesr'] }>
            <DropDownList title='Области' addClass={ styles['inner-list'] }>
                <>
                    { list.map((item, index) => (
                        <ListLayersItem
                            key={`${keyId}-${index}`}
                            title={ item }
                        />
                    )) }
                </>
            </DropDownList>
        </div>
    )
}

export default ListLayers;
