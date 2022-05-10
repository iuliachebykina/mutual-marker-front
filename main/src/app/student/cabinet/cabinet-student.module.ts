import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CabinetLayoutHeaderComponent } from "./cabinet-layout-header/cabinet-layout-header.component";
import { routes } from "./cabinet-student.routing";
import { MainPageComponent } from "./main-page/main-page.component";
import { CanActivateCabinet } from './cabinet-student.guard';
import { ReactiveFormsModule } from "@angular/forms";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputModule } from "@taiga-ui/kit";
import { NotFoundErrorComponent } from "./not-found-error/not-found-error.component";

@NgModule({
    declarations: [
        CabinetLayoutHeaderComponent,
        MainPageComponent,
        NotFoundErrorComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
    ],
    exports: [],
    providers: [CanActivateCabinet]
})
export class CabinetStudentModule {}