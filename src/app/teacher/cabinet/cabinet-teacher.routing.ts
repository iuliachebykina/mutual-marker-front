import { Routes } from "@angular/router";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { CanActivateCabinet } from "./cabinet-teacher.guard";
import { MainPageComponent } from "./main-page/main-page.component";
import { NotFoundErrorComponent } from "./not-found-error/not-found-error.component";
import { AddTaskComponent } from "./room/add-task/add-task.component";
import { CreateRoomComponent } from "./room/create-room/create-room.component";
import { RoomDetailsInfoComponent } from "./room/room-details-info/room-details-info.component";
import { RoomMainComponent } from "./room/room-main/room-main.component";
import { RoomMembersComponent } from "./room/room-members/room-members.component";
import { RoomStatisticComponent } from "./room/room-statistic/room-statistic.component";
import { RoomSettingsComponent } from "./room/settings/room-settings.component";

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
                path: 'room/:id',
                component: RoomDetailsInfoComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'info'
                    },
                    {
                        path: 'info',
                        component: RoomMainComponent
                    },
                    {
                        path: 'create-task',
                        component: AddTaskComponent
                    },
                    {
                        path: 'statistic',
                        component: RoomStatisticComponent
                    },
                    {
                        path: 'member',
                        component: RoomMembersComponent
                    },
                    {
                        path: 'settings',
                        component: RoomSettingsComponent
                    }
                ]
            },
            {
                path: '**',
                pathMatch: 'full',
                component: NotFoundErrorComponent
            }
        ]
    }
];