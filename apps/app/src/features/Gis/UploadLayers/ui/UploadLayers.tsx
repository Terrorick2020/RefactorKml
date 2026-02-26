import { Button, EButtonFileType } from '@/shared/ui';
import { useFileChanges } from '../model';
import type { JSX } from 'react';


function UploadLayers(): JSX.Element {
    const { load, isDisable, filesChange } = useFileChanges();

    return <Button
        bgColor='#2c2e3a'
        text='Загрузить макет'
        fileType={ EButtonFileType.Folder }
        disabled={ isDisable }
        load={ load }
        onFileChange={ filesChange }
    />
}

export default UploadLayers;
