import { AppAnime } from '@/shared/config';
import { delay  } from '.';
import type { ComponentType } from 'react';


export async function delayForLazy(promise: Promise<{ default: ComponentType<any> }>) {
  const start = performance.now();

  const [ jsxRes ] = await Promise.all([
    promise,
  ]);

  const elapsed = performance.now() - start;
  const remainingDelay = Math.max(0, AppAnime.globAnemeMs - elapsed);

  if (remainingDelay > 0) await delay(remainingDelay);

  await showApp();

  return jsxRes;
};

export async function showApp() {
  const rootHtml = document.getElementById('root');
	const preloadHtml = document.getElementById('preloader');
  const preloadLeftDoorHtml = document.getElementById('preloader__ldoor');
  const preloadRightDoorHtml = document.getElementById('preloader__rdoor');

	if ( rootHtml && preloadHtml && preloadLeftDoorHtml && preloadRightDoorHtml ) {
    preloadLeftDoorHtml.style.animation = `openLeftDoorAnime ${AppAnime.globAnemeMs / 2000}s linear forwards`;
    preloadRightDoorHtml.style.animation = `openRightDoorAnime ${AppAnime.globAnemeMs / 2000}s linear forwards`;
		preloadHtml.style.animation = `fadeOutAnime ${AppAnime.globAnemeMs / 1000}s ease-in-out forwards`;

		await delay(AppAnime.globAnemeMs);

		preloadHtml.style.display = 'none';
    rootHtml.style.display = 'block';
	}
}

