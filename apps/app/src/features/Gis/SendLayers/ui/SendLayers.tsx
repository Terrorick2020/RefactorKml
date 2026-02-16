import { Button, Alert, DropUpList } from '@/shared/ui';
import { type JSX, useState } from 'react';

import styles from './SendLayers.module.scss';

function SendLayers(): JSX.Element {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button
                bgColor="#66718bff"
                text='Выгрузить макет'
                onClick={ () => setOpen(true) }
            />
            <Alert
                title='Выгрузить макет'
                open={ open }
                setOpen={ setOpen }
            >
                <div className={ styles['send-layers'] }>
                    <DropUpList title='Выбирите вариант:' />
                    <Button
                        bgColor="#66718bff"
                        text='Подтвердить'
                        onClick={ () => setOpen(false) }
                    />
                </div>
            </Alert>
        </>
    )
}

export default SendLayers;
