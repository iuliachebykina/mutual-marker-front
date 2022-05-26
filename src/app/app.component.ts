import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GlobalNotificationService, INotificationOptions } from './services/global-notification.service';
import { UserBaseService } from './services/user.base.service';
import { IUser } from './student/account/interfaces/user-registration.interface';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
    public showNotification: boolean;
    public notificationOptions: INotificationOptions;
    private _onDestroyEvent$: Subject<void> = new Subject<void>();

    constructor(
        private _userBaseService: UserBaseService,
        private _router: Router,
        private _globalNotificationService: GlobalNotificationService
    ) {
        if (localStorage.getItem('user')) {
            const user: IUser = JSON.parse(localStorage.getItem('user'));
            this._userBaseService.login(user, `${user.role}\\` + user.username)
                .pipe(
                    takeUntil(this._onDestroyEvent$),
                )
                .subscribe((success: IUser): void => {
                    if (!success.role) {
                        this._router.navigate(['login', 'student']);
                    }
                });
        } else {
            this._router.navigate(['login', 'student']);
        }
    }

    public ngOnInit(): void {
        this._globalNotificationService.subject$
            .pipe(
                takeUntil(this._onDestroyEvent$)
            )
            .subscribe((options: INotificationOptions): void => {
                this.showNotification = true;
                this.notificationOptions = options;

                setTimeout(() => {
                    this.showNotification = false;
                    this.notificationOptions = null;
                }, 5000);
            });
    }

    public ngOnDestroy(): void {
        this._onDestroyEvent$.next();
    }
} 
