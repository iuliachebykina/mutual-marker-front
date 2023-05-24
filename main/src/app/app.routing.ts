import { Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LoginGuard } from "./login.guard";

export const routes: Routes = [
    {
        path: 'student',
        loadChildren: () => import('./student/account/account.module').then(m => m.StudentAccountModule),
        canActivate: [LoginGuard]
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./student/cabinet/cabinet-student.module').then(m => m.CabinetStudentModule),
        data: { breadcrumb: 'Мои комнаты' },
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        loadChildren: () => import('./teacher/cabinet/cabinet-teacher.module').then(m => m.CabinetTeacherModule),
        data: { breadcrumb: 'Мои комнаты' },
        canActivate: [AuthGuard]
    },
    {
        path: 'teacher',
        loadChildren: () => import('./teacher/account/account.module').then(m => m.TeacherAccountModule),
        canActivate: [LoginGuard]
    }
];