import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (!this.authService.loggedIn) { // проверяем, авторизован ли пользователь
            this.router.navigate(['/student']); // перенаправляем на главную страницу
            return false;
        } else {
            return true;
        }
    }
}
