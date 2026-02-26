import { FolderContext } from './model';
import { useRef, type JSX } from 'react';
import type { TFolderContextValue } from './model';
import type { IBaseCompTmplProps } from '@/shared/types';


export function FolderCtxProvider({ children }: IBaseCompTmplProps): JSX.Element {
    const value = useRef<TFolderContextValue>(null);

    const setValue = (newValue: TFolderContextValue): void => {
        value.current = newValue
    }

    return (
        <FolderContext.Provider value={{ value, setValue }}>
            { children }
        </FolderContext.Provider>
    )
}
