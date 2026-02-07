import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { rootStore, persistStore } from '@/shared/store';
import type { JSX } from 'react';
import type { IBaseCompTmplProps } from '@/shared/types';


function AppStore({ children }: IBaseCompTmplProps): JSX.Element {
    return (
        <Provider store={rootStore}>
            <PersistGate loading={null} persistor={persistStore}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default AppStore;
