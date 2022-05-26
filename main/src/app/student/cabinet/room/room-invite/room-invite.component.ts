import { Component, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { RoomService } from "src/app/services/room.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: './room-invite.component.html',
    styleUrls: ['./styles/main-page.style.scss']
})
export class RoomInviteComponent extends FormBaseViewModel implements OnDestroy {
    private _subjectDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _router: Router,
        private _notificationService: GlobalNotificationService
    ) {
        super();
    }

    public ngOnDestroy(): void {
        this._subjectDestroy$.next();
    }

    public joinRoom(): void {
        this._roomService.joinStudentToRoom(this.getFormValue('code'))
            .pipe(
                takeUntil(this._subjectDestroy$)
            )
            .subscribe({
                next: () => {
                    this._notificationService.subject$.next({
                        status: 'success',
                        text: 'Вы успешно добавились в комнату'
                    });

                    this._router.navigate(['cabinet', 'main']);
                },
                error: () => {
                    this._notificationService.subject$.next({
                        status: 'error',
                        text: 'При добавлении в комнату произошла ошибка'
                    });
                }
            });
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            code: new FormControl('', [
                Validators.required,
            ]),
        })
    }
}