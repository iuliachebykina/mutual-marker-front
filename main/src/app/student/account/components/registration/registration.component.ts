import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { IModalService } from "src/app/services/modals";
import { ValidationService } from "src/app/services/validation.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";
import { UserBaseService } from "../../../../services/user.base.service";
import { IUser } from "../../interfaces/user-registration.interface";

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
        private _modalService: IModalService,
        private _route: Router,
    ) {
        super();
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    public toLogin(): void {
        this._route.navigate(['student', 'login']);
    }

    public switchTeacher(): void {
        this._route.navigate(['teacher']);
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
        if (!this.controlsGroup.valid) {
            return;
        }

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
                    this._modalService.showSuccess('Регистрация успешна');
                    this._route.navigate(['student']);
                },
                error: () => {
                    this._modalService.showError('Ошибка при регистрации');
                }
            });
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            username: new FormControl('', [
                Validators.required,
                ValidationService.checkFioFormat
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
                Validators.email
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