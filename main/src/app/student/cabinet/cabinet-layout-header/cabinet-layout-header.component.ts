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
    public currentItem: 'rooms' | 'works' = 'rooms';
    public isLightTheme: boolean = true;
    public showActionsProfile: boolean = false;

    constructor(
        private _userBaseService: UserBaseService,
        private _router: Router,
    ) {
        this.user$ = this._userBaseService.getUser();
    }

    public showActions(): void {
        this.showActionsProfile = !this.showActionsProfile;
    }

    public ngOnInit(): void {
        document.querySelector('body').style.background = 'rgb(245, 247, 251)';
    }

    public navigatePage(value: 'rooms' | 'works'): void {
        this.currentItem = value;

        switch (value) {
            case 'rooms':
                this._router.navigate(['cabinet', 'main']);
                break;
            case 'works':
                this._router.navigate(['cabinet', 'works']);
                break;
        }
    }

    public exit(): void {
        if (isDevMode()) {
            console.log('выход из аккаунта');
            console.log('cookie cleared');
            console.log('localstorage cleared');
            console.log('local user removed');
        };

        localStorage.clear();
        this._userBaseService.setUser(null);
        this._router.navigate(['student']);
    }

    public onMouseOver(): void {
        this.hintVisible = true;
    }

    public onMouseLeave(): void {
        this.hintVisible = false;
    }

    public joinRoom(): void {
        this._router.navigate(['cabinet', 'join']);
    }

    public toProfile(): void {
        this._router.navigate(['cabinet', 'profile']);
    }

    public switchTheme(): void {
        this.isLightTheme = !this.isLightTheme;
    }
}