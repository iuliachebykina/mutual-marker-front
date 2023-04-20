import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { IModalService } from "src/app/services/modals";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";
import { UserBaseService } from "../../../../services/user.base.service";
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
        private _notificationService: GlobalNotificationService,
        private _modalService: IModalService
    ) {
        super();
    }

    public toTeacherForm(): void {
        this._route.navigate(['student']);
    }

    public toRegistration(): void {
        this._route.navigate(['student', 'registration']);
    }

    public switchTeacher(): void {
        this._route.navigate(['teacher']);
    }

    public submitForm(): void {
        const user: IUser = {
            username: this.getFormValue('email'),
            password: this.getFormValue('passwordValue')
        };

        this._userBaseService.login(user, 'ROLE_STUDENT')
            .subscribe({
                next: (success: IUser): void => {
                        this._route.navigate(['cabinet', 'main']);
                        this._modalService.showSuccess('Успешный вход в аккаунт');
                },
                error: (error: HttpErrorResponse) => {
                    this._modalService.showError('Ошибка при входе в аккаунт');

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