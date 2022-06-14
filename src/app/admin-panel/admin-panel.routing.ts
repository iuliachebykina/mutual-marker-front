import { Routes } from "@angular/router";
import { AdminPanelComponent } from "./components/layout/admin-panel.component";
import { LoginComponent } from "./components/login/login.component";

export const routes: Routes = [
    {
        path: '',
        component: AdminPanelComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    
];