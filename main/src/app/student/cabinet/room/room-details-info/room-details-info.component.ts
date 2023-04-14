import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, takeUntil } from "rxjs";
import { IModalContainer, IModalService } from "src/app/services/modals";
import { IBasicRoom, RoomService } from "src/app/services/room.service";
import { LeaveRoomComponent } from "../leave-room/leave-room.component";

@Component({
    templateUrl: './room-details-info.component.html',
    styleUrls: ['./styles/room-details-info.style.scss']
})
export class RoomDetailsInfoComponent implements OnInit, OnDestroy {
    public room$: Observable<IBasicRoom>;
    public roomId: string;
    private _destroySubj$: Subject<void> = new Subject<void>();

    constructor(
        private _activatedRouter: ActivatedRoute,
        private _roomService: RoomService,
        private _router: Router,
        private _modalService: IModalService
    ) { }

    public ngOnInit(): void {
        document.querySelector('body').style.background = "#f9f8ff";
        this.roomId = this._activatedRouter.snapshot.paramMap.get('id');

        this.room$ = this._roomService.getRoomById(parseInt(this.roomId))
            .pipe(
                takeUntil(this._destroySubj$)
            );
    }

    public ngOnDestroy(): void {
        this._destroySubj$.next();
    }

    public leaveRoom(): void {
        const modal: IModalContainer = this._modalService.showModal(LeaveRoomComponent);
        modal.InnerComponent.instance.initialize(this.roomId);

        modal.InnerComponent.instance.submit.subscribe({
            next: () => {
                modal.close();
                this._router.navigate(['cabinet', 'main']);
                this._modalService.showSuccess('Вы покинули комнату');
            },
            error: () => {
                this._modalService.showError('Не удалось покинуть комнату');
            }
        });

        modal.InnerComponent.instance.cancel.subscribe({
            next: () => {
                modal.close();
            }
        });

        modal.open();
    }
}