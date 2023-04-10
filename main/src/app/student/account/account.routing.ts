import { Routes } from "@angular/router";
import { CanActivateLogin } from "./account.guard";
import { LayoutComponent } from "./components/layout/layout.component";
import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./components/main/main.component";
import { RegistrationComponent } from "./components/registration/registration.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [CanActivateLogin],
        children: [
            {
                path: '',
                component: MainComponent,
            },
            {
                path: 'registration',
                component: RegistrationComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    }
];