import { Routes, Route } from 'react-router-dom';
import { AppsRoutes } from '@/shared/config';
import { DefaultLayout, GisLayout } from '@/app/layout';
import { GisItemPage } from '@/pages';
import { type JSX } from 'react';


function AppRouters(): JSX.Element {
    return (
        <Routes>
            <Route path={ AppsRoutes.appRoutes.glob } element={ <DefaultLayout /> }>
                <Route path={ AppsRoutes.appRoutes.gis.glob } element={ <GisLayout /> } >
                    <Route path={ AppsRoutes.appRoutes.gis.inner.item.value } element={ <GisItemPage /> } />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouters;
