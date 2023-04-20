import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '../student/account/interfaces/user-registration.interface';

@Injectable()
export class AuthService {
    private refreshTokenTimeout: any;

    constructor(private http: HttpClient) { }

    public login(user: IUser, role: string): Observable<IUser> {
        return this.http.post(`/api/login`, { role, login: user.username, password: user.password })
            .pipe(
                tap(res => {
                    localStorage.setItem('role', role);
                    this.setSession(res); // сохраняем токен и время его жизни в локальном хранилище
                })
            );
    }

    public logout() {
        localStorage.removeItem('access_token'); // удаляем токен из локального хранилища
        localStorage.removeItem('refresh_token'); //удаляем рефреш токен
        localStorage.removeItem('expires_at'); // удаляем время жизни токена из локального хранилища
        localStorage.removeItem('role'); // удаляем роль
        clearTimeout(this.refreshTokenTimeout); // отменяем таймер обновления токена
    }

    public get loggedIn(): boolean {
        return (localStorage.getItem('access_token') !== null); // проверяем, есть ли токен в локальном хранилище
    }

    private setSession(authResult: any) {
        const expiresAt = new Date().getTime() + 300 * 1000;
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('refresh_token', authResult.refreshToken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt));
        this.scheduleRefreshToken(); // запускаем таймер обновления токена
    }

    public refreshToken(): Observable<any> {
        const refreshToken = localStorage.getItem('refresh_token');
        return this.http.post(`/api/token`, { refreshToken })
            .pipe(
                tap(res => {
                    this.setSession(res); // обновляем токен и время его жизни в локальном хранилище
                })
            );
    }

    private scheduleRefreshToken() {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        const now = new Date().getTime();
        const timeout = 300000; // обновляем токен за 5 минут до его истечения
        this.refreshTokenTimeout = setTimeout(() => {
            this.refreshToken().subscribe(); // обновляем токен
        }, timeout);
    }
}
