import { Button, EButtonViewType } from '@/shared/ui';
import type { JSX } from 'react';

import PalmCursorSvgr from './palm-cursor.svg?react';
import PalmSvgr from './palm.svg?react';
import './CursorPanel.module.scss';


function CursorPanel(): JSX.Element {
    return (
        <>
            <Button
                viewType={ EButtonViewType.Icon }
                icon={
                    <PalmSvgr />
                }
            />
            <Button
                viewType={ EButtonViewType.Icon }
                icon={
                    <PalmCursorSvgr />
                }
            />
        </>
    )
}

export default CursorPanel;
