import { Routes } from "@angular/router";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { CanActivateCabinet } from "./cabinet-student.guard";
import { MainPageComponent } from "./main-page/main-page.component";
import { MyWorksComponent } from "./my-works/my-works.component";
import { NotFoundErrorComponent } from "./not-found-error/not-found-error.component";
import { ProfileComponent } from "./profile/components/profile.component";
import { TaskDetailsComponent } from "./project/project-details/project-details.component";
import { WorkComponent } from "./room/evaluate-work/components/work.component";
import { EvaluateWorkComponent } from "./room/evaluate-work/evaluate-work.component";
import { RoomDetailsInfoComponent } from "./room/room-details-info/room-details-info.component";
import { RoomInformationsComponent } from "./room/room-informations/room-informations.component";
import { RoomInviteComponent } from "./room/room-invite/room-invite.component";

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
                component: MainPageComponent
            },
            {
                path: 'join',
                component: RoomInviteComponent
            },
            {
                path: 'works',
                component: MyWorksComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
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
                        component: RoomInformationsComponent
                    },
                    {
                        path: 'task/:id',
                        component: TaskDetailsComponent
                    },
                    {
                        path: 'evaluate',
                        component: EvaluateWorkComponent,
                    },
                    {
                        path: 'work/:workId',
                        component: WorkComponent
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