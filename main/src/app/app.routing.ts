import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'student',
        loadChildren: () => import('./student/account/account.module').then(m => m.StudentAccountModule)
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./student/cabinet/cabinet-student.module').then(m => m.CabinetStudentModule),
        data: { breadcrumb: 'Мои комнаты' }
    },
    {
        path: 'account',
        loadChildren: () => import('./teacher/cabinet/cabinet-teacher.module').then(m => m.CabinetTeacherModule),
        data: { breadcrumb: 'Мои комнаты' }
    },
    {
        path: 'teacher',
        loadChildren: () => import('./teacher/account/account.module').then(m => m.TeacherAccountModule)
    },
    // {
    //     path: 'admin',
    //     loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
    // }
];