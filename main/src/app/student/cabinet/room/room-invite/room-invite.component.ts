import { Component, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { IModalService } from "src/app/services/modals";
import { RoomService } from "src/app/services/room.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: './room-invite.component.html',
    styleUrls: ['./styles/main-page.style.scss']
})
export class RoomInviteComponent extends FormBaseViewModel implements OnDestroy {
    public roomId: string = '';
    private _subjectDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _router: Router,
        private _modalService: IModalService,
        private _activatedRouter: ActivatedRoute
    ) {
        super();
        this._activatedRouter.queryParams
            .subscribe({
                next: (obj: { [key: string]: string }) => {
                    this.roomId = obj?.['id'];
                    this.setFormValue('code', this.roomId);
                }
            });
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
                    this._modalService.showSuccess('Вы успешно добавились в комнату');
                    this._router.navigate(['cabinet', 'main']);
                },
                error: () => {
                    this._modalService.showError('При добавлении в комнату произошла ошибка');
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