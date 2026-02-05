import { type JSX } from 'react';
import type { IBaseCompTmplProps } from '@/shared/types';


function AppStore({ children }: IBaseCompTmplProps): JSX.Element {
    return (
        <>
            { children }
        </>
    )
}

export default AppStore;
