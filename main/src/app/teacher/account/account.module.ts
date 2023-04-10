import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core/components/button";
import { TuiInputModule } from "@taiga-ui/kit";
import { CanActivateLogin } from "./account.guard";
import { routes } from "./account.routing";
import { LayoutComponent } from "./components/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./components/main/main.component";
import { RegistrationComponent } from "./components/registration/registration.component";

@NgModule({
    declarations: [
        LoginComponent,
        LayoutComponent,
        RegistrationComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
    ],
    exports: [],
    providers: [CanActivateLogin]
})
export class TeacherAccountModule { }