import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { IModalService, ModalBaseComponent } from "src/app/services/modals";
import { RoomService } from "src/app/services/room.service";
import { UserBaseService } from "src/app/services/user.base.service";

@Component({
    templateUrl: './create-room.component.html',
    styleUrls: ['./styles/create-room.style.scss']
})
export class CreateRoomComponent extends ModalBaseComponent implements OnDestroy, OnInit {
    public form: FormGroup;
    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _userBaseService: UserBaseService,
        private _modalService: IModalService,
        private _router: Router
    ) {
        super();

    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            projectDescription: new FormControl('', [
                Validators.required,
            ]),
            projectName: new FormControl('', [
                Validators.required,
            ])
        })
    }

    public createRoom(): void {
        this._userBaseService.getUser().subscribe(user => {
            this._roomService.createRoom(this.form.controls['projectName']?.value?.toString(), parseFloat(user.id), this.form.controls['projectDescription']?.value?.toString())
                .pipe(
                    takeUntil(this._onDestroy$)
                )
                .subscribe({
                    next: () => {
                        this._modalService.showSuccess('Комната успешно создана');
                        this.submit.next(null);
                        this._router.navigate(['account', 'main']);
                    },
                    error: () => {
                        this._modalService.showError('Ошибка при создании комнаты');  
                        this.submit.next(null);
                    }
                });
        });
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }
}