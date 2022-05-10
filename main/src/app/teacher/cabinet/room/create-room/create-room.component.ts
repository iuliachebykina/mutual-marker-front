import { Component, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { RoomService } from "src/app/services/room.service";
import { UserBaseService } from "src/app/services/user.base.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: './create-room.component.html',
    styleUrls: ['./styles/create-room.style.scss']
})
export class CreateRoomComponent extends FormBaseViewModel implements OnDestroy {

    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _userBaseService: UserBaseService,
        private _notificationService: GlobalNotificationService,
        private _router: Router
    ) {
        super();

    }

    public createRoom(): void {
        this._userBaseService.getUser().subscribe(user => {
            this._roomService.createRoom(this.getFormValue('projectName'), parseFloat(user.id))
                .pipe(
                    takeUntil(this._onDestroy$)
                )
                .subscribe({
                    next: () => {
                        this._router.navigate(['rooms', 'main']);

                        this._notificationService.subject$.next({
                            status: 'success',
                            text: 'Комната успешно создана'
                        });
                    },
                    error: () => {
                        this._notificationService.subject$.next({
                            status: 'error',
                            text: 'Ошибка при создании комнаты'
                        });  
                    }
                });
        });
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            projectDescription: new FormControl('', [
                Validators.required,
            ]),
            projectName: new FormControl('', [
                Validators.required,
            ]),
        })
    }
}