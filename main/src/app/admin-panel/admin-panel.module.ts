import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputModule } from "@taiga-ui/kit";
import { routes } from "./admin-panel.routing";
import { AdminPanelComponent } from "./components/layout/admin-panel.component";
import { LoginComponent } from "./components/login/login.component";

@NgModule({
    declarations: [
        AdminPanelComponent,
        LoginComponent
    ],
    exports: [
        AdminPanelComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
    ]
})
export class AdminPanelModule { }