import { Button } from '@/shared/ui';
import { useSelector } from 'react-redux';
import { selectGis } from '@/shared/store';
import type { JSX } from 'react';

function SaveUpdates(): JSX.Element {
    const { isAutoSave } = useSelector(selectGis).itemLayout;

    return <Button
        bgColor="#2b3a37ff"
        text='Сохранить изменения'
        disabled={ isAutoSave }
    />
}

export default SaveUpdates;
