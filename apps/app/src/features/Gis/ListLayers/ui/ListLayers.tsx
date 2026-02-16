import {
    DropDownList,
    ColorPicker,
    Button,
    EButtonViewType,
    PluseMinus,
} from '@/shared/ui';

import { useList, useListItem } from '../model';
import type { IListLayersItemProps } from './types';
import type { JSX } from 'react';

import EyeSvgr from './eye.svg?react';
import HideEyeSvgr from './hide-eye.svg?react';
import styles from './ListLayers.module.scss';


function ListLayersItem({ id, title, color, isShow, isActive }: IListLayersItemProps): JSX.Element {
    const { setColorItem, setShow, setActive } = useListItem(id, isActive);

    return (
        <ColorPicker
            title={ title }
            color={ color }
            setColor={ setColorItem }
        >
            <div className={ styles['item-bts'] }>
                <Button
                    viewType={ EButtonViewType.Icon }
                    icon={ <PluseMinus isPluse={ isActive } /> }
                    onClick={ ()=>setActive() }
                />
                <Button
                    viewType={ EButtonViewType.Icon }
                    icon={ isShow
                        ? <EyeSvgr />
                        : <HideEyeSvgr />
                    }
                    onClick={ ()=>setShow() }
                />
            </div>
        </ColorPicker>
    )
}

function ListLayers(): JSX.Element {
    const { keyId, resList } = useList();

    return (
        <div className={ styles['list-layesr'] }>
            <DropDownList title='Области' addClass={ styles['inner-list'] }>
                <>
                    { resList.map((item, index) => (
                        <ListLayersItem
                            key={`${keyId}-${index}`}
                            id={ item.id }
                            title={ item.label }
                            color={ item.color }
                            isShow={ item.isShow }
                            isActive={ item.isActive }
                        />
                    )) }
                </>
            </DropDownList>
        </div>
    )
}

export default ListLayers;
