import { Button } from '@/shared/ui';
import { useSave } from '../model';
import type { JSX } from 'react';


function SaveUpdates(): JSX.Element {
    const { isDisabled, saveUpdates } = useSave();

    return <Button
        bgColor="#2b3a37ff"
        text='Сохранить изменения'
        disabled={ isDisabled }
        onClick={ saveUpdates }
    />
}

export default SaveUpdates;
