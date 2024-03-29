import { Routes } from "@angular/router";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { MyWorksComponent } from "./my-works/my-works.component";
import { NotFoundErrorComponent } from "./not-found-error/not-found-error.component";
import { ProfileComponent } from "./profile/components/profile.component";
import { TaskDetailsComponent } from "./project/project-details/project-details.component";
import { DoneTasksComponent } from "./room/done-tasks/done-tasks.component";
import { WorkComponent } from "./room/evaluate-work/components/work.component";
import { EvaluateWorkComponent } from "./room/evaluate-work/evaluate-work.component";
import { RoomDetailsInfoComponent } from "./room/room-details-info/room-details-info.component";
import { RoomInformationsComponent } from "./room/room-informations/room-informations.component";
import { RoomInviteComponent } from "./room/room-invite/room-invite.component";

export const routes: Routes = [
    {
        path: '',
        component: CabinetLayoutHeaderComponent,
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
                data: { breadcrumb: 'Информация о комнате' },
                children: [
                    {
                        path: '',
                        redirectTo: 'info',
                    },
                    {
                        path: 'info',
                        component: RoomInformationsComponent,
                    },
                    {
                        path: 'task/:id',
                        component: TaskDetailsComponent,
                        data: { breadcrumb: 'Задание' }
                    },
                    {
                        path: 'evaluate',
                        component: EvaluateWorkComponent,
                        data: { breadcrumb: 'Оценить работы' }
                    },
                    {
                        path: 'work/:workId',
                        component: WorkComponent,
                        data: { breadcrumb: 'Оценка работы' }
                    },
                    {
                        path: 'done',
                        component: DoneTasksComponent,
                        data: { breadcrumb: 'Выполненные задания' }
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