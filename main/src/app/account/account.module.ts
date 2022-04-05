import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core/components/button";
import { TuiInputModule } from "@taiga-ui/kit";
import { routes } from "./account.routing";
import { LayoutComponent } from "./components/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";

@NgModule({
    declarations: [
        LoginComponent,
        LayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
    ],
    exports: []
})
export class AccountModule { }