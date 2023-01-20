import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TuiErrorModule } from "@taiga-ui/core";
import { TuiButtonModule } from "@taiga-ui/core/components/button";
import { TuiFieldErrorPipeModule, TuiInputModule } from "@taiga-ui/kit";
import { ValidationService } from "src/app/services/validation.service";
import { CanActivateLogin } from "./account.guard";
import { routes } from "./account.routing";
import { LayoutComponent } from "./components/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";

@NgModule({
    declarations: [
        LoginComponent,
        LayoutComponent,
        RegistrationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule
    ],
    exports: [],
    providers: [CanActivateLogin, ValidationService]
})
export class StudentAccountModule { }