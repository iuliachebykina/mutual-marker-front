import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AngularFaviconService } from 'angular-favicon';
import { Subject } from 'rxjs';
import { DefaultMessageWebComponent } from './modules/dialogs/message.web.component';
import { AuthService } from './services/auth.service';
import { GlobalNotificationService, INotificationOptions } from './services/global-notification.service';
import { IHasModal, IModalService } from './services/modals';
import { ContainerDirective } from './services/modals/container.directive';
import { ModalContainerWebComponent } from './services/modals/modal-container.web.component';
import { UserBaseService } from './services/user.base.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit, IHasModal {
    @ViewChild(ContainerDirective, { static: true }) public dialogAncor: ContainerDirective;
    @ViewChild(ModalContainerWebComponent, { static: true }) public modalContainer: ModalContainerWebComponent;

    public showNotification: boolean;
    public notificationOptions: INotificationOptions;
    private _onDestroyEvent$: Subject<void> = new Subject<void>();
    public loading: boolean = true;

    constructor(
        private _userBaseService: UserBaseService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _globalNotificationService: GlobalNotificationService,
        private ngxFavicon: AngularFaviconService,
        private _modalService: IModalService,
        private _authService: AuthService
    ) {
        if (this._authService.loggedIn) {
            this._authService.refreshToken().subscribe();
        } else {
            this._router.navigate(['student']);
        }
    }

    public ngOnInit(): void {
        this._modalService.initialize(DefaultMessageWebComponent, null, this);
        this.ngxFavicon.setFavicon('/assets/icons/favicon.ico');

        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd && event.url === '/') {
                if (localStorage.getItem('role') === 'ROLE_TEACHER') {
                    this._router.navigate(['account', 'main']);
                } else if (localStorage.getItem('role') === 'ROLE_STUDENT') {
                    this._router.navigate(['cabinet', 'main']);
                }
            }
        });
    }

    public ngOnDestroy(): void {
        this._onDestroyEvent$.next();
    }
} 
