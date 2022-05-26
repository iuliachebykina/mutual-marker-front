import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { routes } from "./cabinet-teacher.routing";
import { MainPageComponent } from "./main-page/main-page.component";
import { CanActivateCabinet } from './cabinet-teacher.guard';
import { ReactiveFormsModule } from "@angular/forms";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputModule } from "@taiga-ui/kit";
import { NotFoundErrorComponent } from "./not-found-error/not-found-error.component";
import { CreateRoomComponent } from "./room/create-room/create-room.component";
import { RoomItemComponent } from "./room/room-item/room-item.component";
import { RoomDetailsInfoComponent } from "./room/room-details-info/room-details-info.component";
import { AddTaskComponent } from "./room/add-task/add-task.component";
import { TaskItemComponent } from "./room/task-item/task-item.component";
import { ModulesModule } from "src/app/modules/modules.module";

@NgModule({
    declarations: [
        CabinetLayoutHeaderComponent,
        MainPageComponent,
        NotFoundErrorComponent,
        CreateRoomComponent,
        RoomItemComponent,
        RoomDetailsInfoComponent,
        AddTaskComponent,
        TaskItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
        ModulesModule
    ],
    exports: [],
    providers: [CanActivateCabinet]
})
export class CabinetTeacherModule {}