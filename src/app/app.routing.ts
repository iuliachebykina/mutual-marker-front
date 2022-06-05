import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'login/student',
        loadChildren: () => import('./student/account/account.module').then(m => m.StudentAccountModule)
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./student/cabinet/cabinet-student.module').then(m => m.CabinetStudentModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./teacher/cabinet/cabinet-teacher.module').then(m => m.CabinetTeacherModule)
    },
    {
        path: 'login/teacher',
        loadChildren: () => import('./teacher/account/account.module').then(m => m.TeacherAccountModule)
    }
];