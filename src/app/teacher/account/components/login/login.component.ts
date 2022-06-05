import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { UserBaseService } from "src/app/services/user.base.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";
import { IUser } from "../../interfaces/user-registration.interface";

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./styles/login.style.scss']
})
export class LoginComponent extends FormBaseViewModel {

    constructor(
        private _userBaseService: UserBaseService,
        private _route: Router,
        private _notificationService: GlobalNotificationService
    ) {
        super();
        document.querySelector('body').style.background = "#fff";
    }

    public toStudentForm(): void {
        this._route.navigate(['login', 'student']);
    }
    
    public submitForm(): void {
        const user: IUser = {
            username: this.getFormValue('email'),
            password: this.getFormValue('passwordValue')
        };

        this._userBaseService.login(user, 'ROLE_TEACHER\\' + user.username)
            .subscribe({
                next: (success: IUser): void => {
                    if (success.role) {
                        localStorage.setItem(
                            'user',
                            JSON.stringify({ username: this.getFormValue('email'), password: this.getFormValue('passwordValue'), role: success.role })
                        );

                        this._notificationService.subject$.next({
                            text: 'Успешный вход в аккаунт',
                            status: 'success'
                        });
                        this._route.navigate(['account', 'main']);
                    }
                },
                error: (error: string): void => {
                    this._notificationService.subject$.next({
                        text: error || 'Ошибка при входе в аккаунт',
                        status: 'error'
                    });
                }
            });
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            passwordValue: new FormControl('', [
                Validators.required,
            ])
        })
    }

}