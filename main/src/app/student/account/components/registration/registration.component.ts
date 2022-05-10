import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";
import { UserBaseService } from "../../../../services/user.base.service";
import { IUser } from "../../interfaces/user-registration.interface";

@Component({
    selector: 'registration-component',
    templateUrl: './registration.component.html',
    styleUrls: ['./styles/registration.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent extends FormBaseViewModel implements OnDestroy {
    @Output()
    public onRegistration: EventEmitter<void> = new EventEmitter<void>();

    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _userBaseService: UserBaseService,
        private _notificationService: GlobalNotificationService
    ) {
        super();
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    public submitForm(): void {
        const data: IUser = {
            firstName: this.getFormValue('username').split(' ')[1],
            lastName: this.getFormValue('username').split(' ')[0],
            patronymic: this.getFormValue('username').split(' ')[2],
            password: this.getFormValue('password'),
            email: this.getFormValue('email'),
            phoneNumber: this.getFormValue('contacts'),
            university: this.getFormValue('universityName'),
            institute: this.getFormValue('faculty'),
            studentGroup: this.getFormValue('group'),
            socialNetwork: this.getFormValue('socialNetworkLink')
        };
        this._userBaseService.registerStudent(data)
            .pipe(
                takeUntil(
                    this._onDestroy$
                )
            )
            .subscribe({
                next: () => {
                    this._notificationService.subject$.next({
                        text: 'Регистрация успешна',
                        status: 'success'
                    });
                    this.onRegistration.emit();
                },
                error: () => {
                    this._notificationService.subject$.next({
                        text: 'Ошибка при регистрации',
                        status: 'error'
                    });
                }
            });
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            username: new FormControl('', [
                Validators.required,
            ]),
            universityName: new FormControl('', [
                Validators.required,
            ]),
            faculty: new FormControl('', [
                Validators.required,
            ]),
            group: new FormControl('', [
                Validators.required,
            ]),
            email: new FormControl('', [
                Validators.required,
            ]),
            password: new FormControl('', [
                Validators.required,
            ]),
            repeatPassword: new FormControl('', [
                Validators.required,
            ]),
            socialNetworkLink: new FormControl('', [
                Validators.required,
            ]),
            contacts: new FormControl('', [
                Validators.required,
            ])
        })
    }

}