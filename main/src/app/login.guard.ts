import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    public canActivate(): boolean {
        if (!this.authService.loggedIn) {
            return true;
        } else {
            if (localStorage.getItem('role') === 'ROLE_TEACHER') {
                this.router.navigate(['account', 'main']);
            } else if (localStorage.getItem('role') === 'ROLE_STUDENT') {
                this.router.navigate(['cabinet', 'main']);
            }

            return false;
        }
    }
}