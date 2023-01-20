import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { UserBaseService } from "src/app/services/user.base.service";
import { IUser } from "src/app/student/account/interfaces/user-registration.interface";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./style/login.style.scss']
})
export class LoginComponent extends FormBaseViewModel implements OnInit {

    constructor(
        private _userBaseService: UserBaseService,
        private _notificationService: GlobalNotificationService
    ) {
        super();
    }

    public ngOnInit(): void {
        document.querySelector('body').style.background = 'rgb(48, 48, 48)';
    }

    public submitForm(): void {
        const user: IUser = {
            username: this.getFormValue('login'),
            password: this.getFormValue('password')
        };

        this._userBaseService.login(user, 'ROLE_ADMIN\\' + user.username)
            .subscribe({
                next: (success: IUser): void => {
                    if (success.role) {
                        // this._route.navigate(['cabinet', 'main']);
                        localStorage.setItem(
                            'admin',
                            JSON.stringify({ username: this.getFormValue('login'), password: this.getFormValue('password'), role: success.role })
                        );
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
            login: new FormControl('', [
                Validators.required,
            ]),
            password: new FormControl('', [
                Validators.required,
            ])
        })
    }
}