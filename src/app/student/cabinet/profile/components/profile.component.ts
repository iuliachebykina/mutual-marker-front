import { Component, ElementRef, isDevMode, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { UserBaseService } from "src/app/services/user.base.service";
import { IUser } from "src/app/student/account/interfaces/user-registration.interface";

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./style/profile.style.scss']
})
export class ProfileComponent implements OnInit {
    @ViewChild('name')
    public nameInput: ElementRef;

    @ViewChild('phone')
    public phoneInput: ElementRef;

    @ViewChild('social')
    public socialInput: ElementRef;

    public loading: boolean = true;
    public profile: IUser;

    public phoneUpdate: boolean = false;
    public socialUpdate: boolean = false;
    public nameUpdate: boolean = false;

    constructor(
        private _userService: UserBaseService,
        private _router: Router
    ) { }

    public ngOnInit(): void {
        this._userService.getUser()
            .subscribe({
                next: (user: IUser): void => {
                    this.profile = user;
                    this.loading = false;
                }
            });
    }

    public updateUsername(): void {
        const user: IUser = {
            name: {
                firstName: this.nameInput.nativeElement.value.split(' ')[1],
                lastName: this.nameInput.nativeElement.value.split(' ')[0],
                patronymic: this.nameInput.nativeElement.value.split(' ')[2]
            }
        };
        this._userService.updateProfileInfo(user).subscribe({
            next: () => {
                this.nameUpdate = false;
                this._userService.getUser()
                    .subscribe({
                        next: (user: IUser): void => {
                            this.profile = user;
                        }
                    });
            }
        });
    }

    public updatePhone(): void {
        const user: IUser = {
            phoneNumber: this.phoneInput.nativeElement.value
        };

        this._userService.updateProfileInfo(user).subscribe({
            next: () => {
                this.phoneUpdate = false;
                this._userService.getUser()
                    .subscribe({
                        next: (user: IUser): void => {
                            this.profile = user;
                        }
                    });
            }
        });
    }

    public socialUpdating(): void {
        const user: IUser = {
            socialNetwork: this.socialInput.nativeElement.value
        };

        this._userService.updateProfileInfo(user).subscribe({
            next: () => {
                this.socialUpdate = false;
                this._userService.getUser()
                    .subscribe({
                        next: (user: IUser): void => {
                            this.profile = user;
                        }
                    });
            }
        });
    }

    public exit(): void {
        if (isDevMode()) {
            console.log('выход из аккаунта');
            console.log('cookie cleared');
            console.log('localstorage cleared');
            console.log('local user removed');
        };

        localStorage.clear();
        this._userService.setUser(null);
        this._router.navigate(['login', 'student']);
    }
}