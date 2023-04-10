import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModulesModule } from "src/app/modules/modules.module";
import { MarksService } from "src/app/services/marks.service";
import { ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { ALL_TAIGA_UI_MODULES } from "src/libraries/all-taiga-modules";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { CanActivateCabinet } from './cabinet-teacher.guard';
import { routes } from "./cabinet-teacher.routing";
import { MainPageComponent } from "./main-page/main-page.component";
import { NotFoundErrorComponent } from "./not-found-error/not-found-error.component";
import { AddRoomToGroupComponents } from "./room/add-room-to-group/add-room-to-group.component";
import { AddRoomComponent } from "./room/add-room/add-room.component";
import { AddTaskComponent } from "./room/add-task/add-task.component";
import { CreateRoomComponent } from "./room/create-room/create-room.component";
import { DeleteRoomsComponent } from "./room/delete-rooms/delete-rooms.component";
import { RoomDetailsInfoComponent } from "./room/room-details-info/room-details-info.component";
import { RoomGroupDeleteComponent } from "./room/room-group-delete/room-group-delete.component";
import { RoomGroupComponent } from "./room/room-group/room-group.component";
import { RoomItemComponent } from "./room/room-item/room-item.component";
import { RoomMainComponent } from "./room/room-main/room-main.component";
import { RoomMembersComponent } from "./room/room-members/room-members.component";
import { RoomStatisticComponent } from "./room/room-statistic/room-statistic.component";
import { RoomSettingsComponent } from "./room/settings/room-settings.component";
import { TaskDetailsInfoComponent } from "./room/task-details-info/task-details-info.component";
import { TaskInformationComponent } from "./room/task-information/task-information.component";
import { TaskItemComponent } from "./room/task-item/task-item.component";
import { TaskStudentWorksInfoComponent } from "./room/task-student-works-info/task-student-works-info.component";

@NgModule({
    declarations: [
        CabinetLayoutHeaderComponent,
        TaskStudentWorksInfoComponent,
        MainPageComponent,
        NotFoundErrorComponent,
        CreateRoomComponent,
        RoomItemComponent,
        RoomDetailsInfoComponent,
        AddTaskComponent,
        TaskItemComponent,
        RoomStatisticComponent,
        RoomMainComponent,
        RoomMembersComponent,
        RoomSettingsComponent,
        TaskInformationComponent,
        TaskDetailsInfoComponent,
        RoomGroupComponent,
        RoomGroupDeleteComponent,
        AddRoomComponent,
        DeleteRoomsComponent,
        AddRoomToGroupComponents
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        ModulesModule,
        ALL_TAIGA_UI_MODULES
    ],
    exports: [],
    providers: [CanActivateCabinet, MarksService, ProjectFileManagerService]
})
export class CabinetTeacherModule {}