import { Button, Alert, DropUpList } from '@/shared/ui';
import { useSelect, useDownLoad } from '../model';
import type { JSX } from 'react';

import styles from './DownloadLayers.module.scss';


function DownloadLayers(): JSX.Element {
    const { open, value, valuesList, setValue, setOpen } = useSelect();
    const { load, isDisabled, onDownload } = useDownLoad(value);

    return (
        <>
            <Button
                bgColor="#668b84"
                text='Скачать макет'
                disabled={ isDisabled }
                onClick={ () => setOpen(true) }
            />
            <Alert
                title='Скачать макет'
                open={ open }
                setOpen={ setOpen }
            >
                <div className={ styles['download-layers'] }>
                    <DropUpList<number>
                        title="Выбирите вариант:"
                        setValue={ setValue }
                        valuesList={ valuesList }
                    />
                    <Button
                        bgColor="#668b84"
                        text='Подтвердить'
                        load={ load }
                        onClick={ onDownload }
                    />
                </div>
            </Alert>
        </>
    )
}

export default DownloadLayers;
