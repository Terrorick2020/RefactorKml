import { Button, Alert, DropUpList } from '@/shared/ui';
import { type JSX, useState } from 'react';

import styles from './DownloadLayers.module.scss';

function DownloadLayers(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button
                bgColor="#668b84"
                text='Скачать макет'
                onClick={ () => setOpen(true) }
            />
            <Alert
                title='Скачать макет'
                open={ open }
                setOpen={ setOpen }
            >
                <div className={ styles['download-layers'] }>
                    <DropUpList title="Выбирите вариант:" />
                        <Button
                            bgColor="#668b84"
                            text='Подтвердить'
                            onClick={ () => setOpen(false) }
                        />
                </div>
            </Alert>
        </>
    )
}

export default DownloadLayers;
