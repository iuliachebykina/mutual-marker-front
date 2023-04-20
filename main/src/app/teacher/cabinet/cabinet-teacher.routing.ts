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
import { TaskDetailsInfoComponent } from "./room/task-details-info/task-details-info.component";
import { TaskInformationComponent } from "./room/task-information/task-information.component";
import { TaskStudentWorksInfoComponent } from "./room/task-student-works-info/task-student-works-info.component";

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
                path: 'create',
                component: CreateRoomComponent
            },
            {
                path: 'task/:id',
                component: TaskDetailsInfoComponent,
                children: [
                    {
                        path: 'info',
                        component: TaskInformationComponent,
                        data: { breadcrumb: 'Информация о задании' },
                    },
                    {
                        path: 'works',
                        component: TaskStudentWorksInfoComponent,
                        data: { breadcrumb: 'Работы участников' }
                    },
                    {
                        path: 'statistic',
                        component: RoomStatisticComponent,
                        data: { breadcrumb: 'Статистика' }
                    },
                ]
            },
            {
                path: 'room/:id',
                component: RoomDetailsInfoComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'info',
                    },
                    {
                        path: 'info',
                        component: RoomMainComponent,
                        data: { breadcrumb: 'Информация о комнате' }
                    },
                    {
                        path: 'create-task',
                        component: AddTaskComponent,
                        data: { breadcrumb: 'Добавление задания' }
                    },
                    {
                        path: 'member',
                        component: RoomMembersComponent,
                        data: { breadcrumb: 'Участники' }
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