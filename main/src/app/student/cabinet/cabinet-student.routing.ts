import { Routes } from "@angular/router";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { CanActivateCabinet } from "./cabinet-student.guard";
import { MainPageComponent } from "./main-page/main-page.component";
import { NotFoundErrorComponent } from "./not-found-error/not-found-error.component";

export const routes: Routes = [
    {
        path: '',
        component: CabinetLayoutHeaderComponent,
        canActivate: [CanActivateCabinet],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'main',
            },
            {
                path: 'main',
                component: MainPageComponent,
            },
            {
                path: '**',
                pathMatch: 'full',
                component: NotFoundErrorComponent
            }
        ]
    }
];