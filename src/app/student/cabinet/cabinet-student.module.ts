import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TuiButtonModule, TuiLoaderModule } from "@taiga-ui/core";
import { TuiInputModule } from "@taiga-ui/kit";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { ModulesModule } from "src/app/modules/modules.module";
import { MarksService } from "src/app/services/marks.service";
import { ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { CanActivateCabinet } from './cabinet-student.guard';
import { routes } from "./cabinet-student.routing";
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
import { RoomItemComponent } from "./room/room-item/room-item.component";
import { TaskItemComponent } from "./room/task-item/task-item.component";

@NgModule({
    declarations: [
        CabinetLayoutHeaderComponent,
        MainPageComponent,
        NotFoundErrorComponent,
        RoomItemComponent,
        RoomDetailsInfoComponent,
        TaskItemComponent,
        TaskDetailsComponent,
        MyWorksComponent,
        RoomInformationsComponent,
        RoomInviteComponent,
        EvaluateWorkComponent,
        WorkComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
        PdfViewerModule,
        TuiLoaderModule,
        ModulesModule
    ],
    exports: [],
    providers: [CanActivateCabinet, ProjectFileManagerService, MarksService]
})
export class CabinetStudentModule {}