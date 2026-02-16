import { Button } from '@/shared/ui';
import { useThrow } from '../model';
import type { JSX } from 'react';

function ThrowOffUpdates(): JSX.Element {
    const { isDisabled } = useThrow();

    return <Button
        bgColor="#374230ff"
        text='Сбросить изменения'
        disabled={ isDisabled }
    />
}

export default ThrowOffUpdates;
