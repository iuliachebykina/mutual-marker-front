import { Component, isDevMode, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserBaseService } from "src/app/services/user.base.service";
import { IUser } from "src/app/student/account/interfaces/user-registration.interface";

@Component({
    templateUrl: './cabinet-layout-header.component.html',
    styleUrls: ['./styles/cabinet-layout-header.style.scss']
})
export class CabinetLayoutHeaderComponent implements OnInit {
    public user$: Observable<IUser>;
    public hintVisible: boolean = false;

    constructor(
        private _userBaseService: UserBaseService,
        private _router: Router
    ) {
        this.user$ = this._userBaseService.getUser();
    }

    public ngOnInit(): void {
        document.querySelector('body').style.background = "rgba(254, 116, 81, 0.05)";
    }

    public exit(): void {
        if (isDevMode()) {
            console.log('выход из аккаунта');
            console.log('cookie cleared');
            console.log('localstorage cleared');
            console.log('local user removed');
        };

        localStorage.clear();
        this._userBaseService.logout();
        this._userBaseService.setUser(null);
        this._router.navigate(['login', 'student']);
    }

    public goToMyRooms(): void {
        this._router.navigate(['account', 'main']);
    }

    public joinRoom() {
        this._router.navigate(['account', 'create']);
    }

    public onMouseLeave(): void {
        this.hintVisible = false;
    }

    public onMouseOver(): void {
        this.hintVisible = true;
    }
}