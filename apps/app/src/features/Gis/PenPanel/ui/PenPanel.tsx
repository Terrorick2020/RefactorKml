import { Button, EButtonViewType } from '@/shared/ui';
import { useDispatch } from 'react-redux';
import { EPolygonWorkType } from '@/shared/ui';
import { usePenSelect, getBtnBg } from '../model';
import type { TRootDispatch } from '@/shared/store';
import type { JSX } from 'react';

import MarkerSvgr from './marker.svg?react';
import PenToolSvgr from './pen-tool.svg?react';
import ScissorSvgr from './scissors.svg?react';
import './PenPanel.module.scss';


function PenPanel(): JSX.Element {
    const dispatch = useDispatch<TRootDispatch>();

    const { penType, setPenType } = usePenSelect(dispatch);

    return (
        <>
            <Button
                viewType={ EButtonViewType.Icon }
                bgColor={ getBtnBg(penType === EPolygonWorkType.Figure) }
                icon={
                    <PenToolSvgr />
                }
                onClick={ () => setPenType( EPolygonWorkType.Figure ) }
            />
            <Button
                viewType={ EButtonViewType.Icon }
                bgColor={ getBtnBg(penType === EPolygonWorkType.Draw) }
                icon={
                    <MarkerSvgr />
                }
                onClick={ () => setPenType( EPolygonWorkType.Draw ) }
             />
            <Button
                viewType={ EButtonViewType.Icon }
                bgColor={ getBtnBg(penType === EPolygonWorkType.Scissors) }
                icon={
                    <ScissorSvgr />
                }
                onClick={ () => setPenType( EPolygonWorkType.Scissors ) }
            />
        </>
    )
}

export default PenPanel;