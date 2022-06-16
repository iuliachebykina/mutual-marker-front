import { Component, isDevMode, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserBaseService } from "src/app/services/user.base.service";
import { IUser } from "src/app/student/account/interfaces/user-registration.interface";

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['../style/profile.style.scss']
})
export class ProfileComponent implements OnInit {
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

    // public updateUsername(): void {
    //     const fio: string = (<HTMLInputElement>document.querySelector('.name'))?.value;
    //     const user: IUser = {
    //         name: {
    //             firstName: fio.split(' ')[1],
    //             lastName: fio.split(' ')[0],
    //             patronymic: fio.split(' ')[2]
    //         }
    //     };

    //     this._userService.updateProfileInfo(user).subscribe();
    // }

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