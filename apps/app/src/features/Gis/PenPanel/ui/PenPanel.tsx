import { Button, EButtonViewType } from '@/shared/ui';
import type { JSX } from 'react';

import MarkerSvgr from './marker.svg?react';
import PenToolSvgr from './pen-tool.svg?react';
import './PenPanel.module.scss';


function PenPanel(): JSX.Element {
    return (
        <>
            <Button
                viewType={ EButtonViewType.Icon }
                icon={
                    <PenToolSvgr />
                }
            />
            <Button
                viewType={ EButtonViewType.Icon }
                icon={
                    <MarkerSvgr />
                }
             />
        </>
    )
}

export default PenPanel;