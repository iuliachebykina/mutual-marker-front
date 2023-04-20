import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token'); // получаем токен из локального хранилища

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}` // добавляем токен в заголовок
                }
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.authService.refreshToken()
                        .pipe(
                            catchError(error => {
                                this.authService.logout();
                                return throwError(error);
                            }),
                            switchMap(() => {
                                request = request.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                                    }
                                });
                                return next.handle(request);
                            })
                        );
                }
                return throwError(error);
            })
        );

    }
}
