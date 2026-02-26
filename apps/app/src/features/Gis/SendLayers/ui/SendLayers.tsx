import { Button, Alert, DropUpList } from '@/shared/ui';
import { useSelect, useSend } from '../model';
import type { JSX } from 'react';

import styles from './SendLayers.module.scss';

function SendLayers(): JSX.Element {
    const { open, value, valuesList, setValue, setOpen } = useSelect();
    const { load, isDisabled, onSend } = useSend(value);

    return (
        <>
            <Button
                bgColor="#66718bff"
                text='Выгрузить макет'
                disabled={ isDisabled }
                onClick={ () => setOpen(true) }
            />
            <Alert
                title='Выгрузить макет'
                open={ open }
                setOpen={ setOpen }
            >
                <div className={ styles['send-layers'] }>
                    <DropUpList<number>
                        title='Выбирите вариант:'
                        setValue={ setValue }
                        valuesList={ valuesList }
                    />
                    <Button
                        bgColor="#66718bff"
                        text='Подтвердить'
                        load={ load }
                        onClick={ onSend }
                    />
                </div>
            </Alert>
        </>
    )
}

export default SendLayers;
