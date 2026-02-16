import { Button, EButtonViewType } from '@/shared/ui';
import { useDispatch } from 'react-redux';
import { useCursorSelect, getBtnBg } from '../model';
import { type TRootDispatch, EGisCursorType } from '@/shared/store';
import type { JSX } from 'react';

import PalmCursorSvgr from './palm-cursor.svg?react';
import PalmSvgr from './palm.svg?react';
import './CursorPanel.module.scss';


function CursorPanel(): JSX.Element {
    const dispatch = useDispatch<TRootDispatch>();

    const { cursorType, setCursorType } = useCursorSelect(dispatch);

    return (
        <>
            <Button
                viewType={ EButtonViewType.Icon }
                bgColor={ getBtnBg(cursorType === EGisCursorType.Scroll) }
                icon={
                    <PalmSvgr />
                }
                onClick={() => setCursorType( EGisCursorType.Scroll )}
            />
            <Button
                viewType={ EButtonViewType.Icon }
                bgColor={ getBtnBg(cursorType === EGisCursorType.Transform) }
                icon={
                    <PalmCursorSvgr />
                }
                onClick={() => setCursorType( EGisCursorType.Transform )}
            />
        </>
    )
}

export default CursorPanel;
