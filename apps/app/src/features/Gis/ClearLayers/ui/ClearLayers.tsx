import { Button } from '@/shared/ui';
import { useClearLayers } from '../model';
import { useDispatch } from 'react-redux';
import type { JSX } from 'react';
import type { TRootDispatch } from '@/shared/store';


function ClearLayers(): JSX.Element {
    const dispatch = useDispatch<TRootDispatch>();

    const { isDisable, clearLayers } = useClearLayers(dispatch);

    return <Button
        bgColor="#433740"
        text='Очистить макет'
        disabled={ isDisable }
        onClick={ ()=>clearLayers() }
    />
}

export default ClearLayers;
