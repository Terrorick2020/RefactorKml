import { Button, EButtonViewType } from '@/shared/ui';
import { usePermission } from '../model';
import { useDispatch } from 'react-redux';
import type { JSX } from 'react';
import type { TRootDispatch } from '@/shared/store';

import PlusSvgr from './plus.svg?react';
import MinusSvgr from './minus.svg?react';
import './PermissionPanel.module.scss';


function PermissionPanel(): JSX.Element {
    const dispatch = useDispatch<TRootDispatch>();
    
    const { zoom, changeZoom } = usePermission(dispatch);

    return (
        <>
            <Button
                viewType={ EButtonViewType.Icon }
                icon={
                    <PlusSvgr />
                }
                onClick={ ()=>changeZoom(1) }
            />
            <Button
                viewType={ EButtonViewType.Icon }
                icon={
                    <MinusSvgr />
                }
                onClick={ ()=>changeZoom(-1) }
            />
            <h6>{Math.round(zoom)}%</h6>
        </>
    )
}

export default PermissionPanel;
