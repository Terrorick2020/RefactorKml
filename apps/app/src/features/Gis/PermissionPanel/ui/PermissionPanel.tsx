import { Button, EButtonViewType } from '@/shared/ui';
import type { JSX } from 'react';

import PlusSvgr from './plus.svg?react';
import MinusSvgr from './minus.svg?react';
import './PermissionPanel.module.scss';


function PermissionPanel(): JSX.Element {
    return (
        <>
            <Button
                viewType={ EButtonViewType.Icon }
                icon={
                    <PlusSvgr />
                }
            />
            <Button
                viewType={ EButtonViewType.Icon }
                icon={
                    <MinusSvgr />
                }
            />
            <h6>100%</h6>
        </>
    )
}

export default PermissionPanel;
