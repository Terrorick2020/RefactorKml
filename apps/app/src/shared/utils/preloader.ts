import { AppAnime } from "@/shared/config";
import { delay } from "./general";
import { AppsRoutes } from "@/shared/config";
import { type ComponentType, createElement } from "react";


export async function delayForLazy(
  promise: Promise<{ default: ComponentType<any> }>,
) {
  const start = performance.now();

  const [jsxRes] = await Promise.all([promise]);

  const Wrapped = (props: any) =>
    createElement(
      jsxRes.default,
      { ...props, initialPath: AppsRoutes.getAppGisItemPath('new') },
    );

  const elapsed = performance.now() - start;
  const remainingDelay = Math.max(0, AppAnime.globAnimeMs - elapsed);

  if (remainingDelay > 0) await delay(remainingDelay);

  await showApp();

  return { default: Wrapped as ComponentType<any> };;
}

export async function showApp() {
  const rootHtml = document.getElementById("root");
  const preloadHtml = document.getElementById("preloader");
  const preloadLeftDoorHtml = document.getElementById("preloader__ldoor");
  const preloadRightDoorHtml = document.getElementById("preloader__rdoor");

  if (rootHtml && preloadHtml && preloadLeftDoorHtml && preloadRightDoorHtml) {
    preloadLeftDoorHtml.style.animation = `openLeftDoorAnime ${AppAnime.globAnimeMs / 2000}s linear forwards`;
    preloadRightDoorHtml.style.animation = `openRightDoorAnime ${AppAnime.globAnimeMs / 2000}s linear forwards`;
    preloadHtml.style.animation = `fadeOutAnime ${AppAnime.globAnimeMs / 1000}s ease-in-out forwards`;

    await delay(AppAnime.globAnimeMs);

    preloadHtml.style.display = "none";
    rootHtml.style.display = "block";
  }
}
