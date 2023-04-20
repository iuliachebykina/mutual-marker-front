import { Component, isDevMode, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
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
        private _authService: AuthService
    ) {
        this.user$ = this._userBaseService.getUserProfile();
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
        this._authService.logout();
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