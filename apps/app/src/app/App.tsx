import { AppStore, AppRouters } from './provider';
import { MemoryRouter } from 'react-router-dom';
import type { JSX } from 'react';

import "./styles/index.scss";


interface IAppProps { initialPath: string }

function App({ initialPath }: IAppProps): JSX.Element {
  return (
    <AppStore>
      <MemoryRouter initialEntries={[initialPath]}>
        <AppRouters />
      </MemoryRouter>
    </AppStore>
  )
}

export default App;
