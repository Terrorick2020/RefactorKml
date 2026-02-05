import { AppStore, AppRouter } from './provider';
import { BrowserRouter } from 'react-router';
import { type JSX } from 'react';

import "./styles/global.scss"


function App(): JSX.Element {
  return (
    <AppStore>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppStore>
  )
}

export default App;
