import { Routes } from "@angular/router";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { CanActivateCabinet } from "./cabinet-teacher.guard";
import { MainPageComponent } from "./main-page/main-page.component";
import { NotFoundErrorComponent } from "./not-found-error/not-found-error.component";
import { CreateRoomComponent } from "./room/create-room/create-room.component";

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
                path: 'create',
                component: CreateRoomComponent
            },
            {
                path: '**',
                pathMatch: 'full',
                component: NotFoundErrorComponent
            }
        ]
    }
];