import { StrictMode, Suspense, lazy } from 'react';
import { delayForLazy } from './shared/utils';
import { createRoot } from 'react-dom/client';


const LazyApp = lazy(() => delayForLazy(import('./app/App')));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <LazyApp />
    </Suspense>
  </StrictMode>
);
