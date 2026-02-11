import { Button, EButtonFileType } from '@/shared/ui';
import { onFileChange } from '../model';
import type { JSX } from 'react';

function UploadLayers(): JSX.Element {
    return <Button
        bgColor='#2c2e3a'
        text='Загрузить макет'
        fileType={ EButtonFileType.Folder }
        onFileChange={ onFileChange }
    />
}

export default UploadLayers;