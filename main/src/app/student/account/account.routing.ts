import { Routes } from "@angular/router";
import { CanActivateLogin } from "./account.guard";
import { LayoutComponent } from "./components/layout/layout.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [CanActivateLogin]
    }
];