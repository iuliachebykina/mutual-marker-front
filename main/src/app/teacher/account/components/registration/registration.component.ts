import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { UserBaseService } from "src/app/services/user.base.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";
import { IUser } from "../../interfaces/user-registration.interface";
import { AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
    selector: 'registration-component',
    templateUrl: './registration.component.html',
    styleUrls: ['./styles/registration.style.scss'],
})
export class RegistrationComponent extends FormBaseViewModel implements OnDestroy, OnInit {
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

    public ngOnInit(): void {
        this.getControl('password').valueChanges.subscribe({
            next: () => {
                this.getControl('repeatPassword').addValidators(this.checkLimit());
            }
        });

        this.getControl('repeatPassword').valueChanges.subscribe({
            next: () => {
                this.getControl('password').addValidators(this.checkLimit());
            }
        });
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
            subject: this.getFormValue('subject'),
            socialNetwork: this.getFormValue('socialNetworkLink')
        };

        this._userBaseService.registerTeacher(data)
            .pipe(
                takeUntil(this._onDestroy$)
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
            subject: new FormControl('', [
                Validators.required,
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
            ]),
            repeatPassword: new FormControl('', [
                Validators.required,
            ]),
            socialNetworkLink: new FormControl('', [
                Validators.required
            ]),
            contacts: new FormControl('', [
                Validators.required,
                Validators.maxLength(11),
                Validators.minLength(11)
            ])
        })
    }

    private checkLimit(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            let pass = this.getFormValue('password');
            let confirmPass = this.getFormValue('repeatPassword');
            return pass === confirmPass ? null : { 'notSame': true }
        };
    }

}

