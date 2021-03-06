import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { routes } from "./cabinet-teacher.routing";
import { MainPageComponent } from "./main-page/main-page.component";
import { CanActivateCabinet } from './cabinet-teacher.guard';
import { ReactiveFormsModule } from "@angular/forms";
import { TuiButtonModule, TuiErrorModule, TuiHintControllerModule, TuiHintModule, TuiManualHintModule } from "@taiga-ui/core";
import { TuiAvatarModule, TuiFieldErrorPipeModule, TuiInputDateTimeModule, TuiInputModule } from "@taiga-ui/kit";
import { NotFoundErrorComponent } from "./not-found-error/not-found-error.component";
import { CreateRoomComponent } from "./room/create-room/create-room.component";
import { RoomItemComponent } from "./room/room-item/room-item.component";
import { RoomDetailsInfoComponent } from "./room/room-details-info/room-details-info.component";
import { AddTaskComponent } from "./room/add-task/add-task.component";
import { TaskItemComponent } from "./room/task-item/task-item.component";
import { ModulesModule } from "src/app/modules/modules.module";
import { RoomStatisticComponent } from "./room/room-statistic/room-statistic.component";
import { RoomMainComponent } from "./room/room-main/room-main.component";
import { MarksService } from "src/app/services/marks.service";
import { RoomMembersComponent } from "./room/room-members/room-members.component";

@NgModule({
    declarations: [
        CabinetLayoutHeaderComponent,
        MainPageComponent,
        NotFoundErrorComponent,
        CreateRoomComponent,
        RoomItemComponent,
        RoomDetailsInfoComponent,
        AddTaskComponent,
        TaskItemComponent,
        RoomStatisticComponent,
        RoomMainComponent,
        RoomMembersComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
        ModulesModule,
        TuiHintModule,
        TuiAvatarModule,
        TuiManualHintModule,
        TuiFieldErrorPipeModule,
        TuiErrorModule,
        TuiHintControllerModule,
        TuiInputDateTimeModule
    ],
    exports: [],
    providers: [CanActivateCabinet, MarksService]
})
export class CabinetTeacherModule {}