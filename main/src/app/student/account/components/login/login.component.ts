import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";
import { UserBaseService } from "../../../../services/user.base.service";
import { IUser } from "../../interfaces/user-registration.interface";

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/login.style.scss']
})
export class LoginComponent extends FormBaseViewModel {

    constructor(
        private _userBaseService: UserBaseService,
        private _route: Router,
        private _notificationService: GlobalNotificationService
    ) {
        super();
    }

    public toTeacherForm(): void {
        this._route.navigate(['login', 'teacher']);
    }

    public submitForm(): void {
        const user: IUser = {
            username: this.getFormValue('email'),
            password: this.getFormValue('passwordValue')
        };

        this._userBaseService.login(user, 'ROLE_STUDENT\\' + user.username)
            .subscribe({
                next: (success: IUser): void => {
                    if (success.role) {
                        this._route.navigate(['cabinet', 'main']);
                        localStorage.setItem(
                            'user',
                            JSON.stringify({ username: this.getFormValue('email'), password: this.getFormValue('passwordValue'), role: success.role })
                        );

                        this._notificationService.subject$.next({
                            text: 'Успешный вход в аккаунт',
                            status: 'success'
                        });
                    }
                },
                error: () => {
                    this._notificationService.subject$.next({
                        text: 'Ошибка при входе в аккаунт',
                        status: 'error'
                    });
                }
            });
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            email: new FormControl('', [
                Validators.required,
            ]),
            passwordValue: new FormControl('', [
                Validators.required,
            ])
        })
    }

}