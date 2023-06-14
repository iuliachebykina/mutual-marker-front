import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map, Observable, Subject, switchMap, takeUntil } from "rxjs";
import { IModalContainer, IModalService } from "src/app/services/modals";
import { IBasicRoom, ITaskResponse, RoomService } from "src/app/services/room.service";
import { RoomSettingsComponent } from "../settings/room-settings.component";

@Component({
    templateUrl: './room-details-info.component.html',
    styleUrls: ['./styles/room-details-info.style.scss']
})
export class RoomDetailsInfoComponent implements OnDestroy, OnInit {
    public roomId: string;
    public roomCode: string;
    public room$: Observable<IBasicRoom>;
    public tasks$: Observable<ITaskResponse[]>;
    public currentMenu: 'room' | 'members' | 'works' | 'addTask' = 'room';
    private _destroySubj$: Subject<void> = new Subject<void>();

    constructor(
        private _activatedRouter: ActivatedRoute,
        private _roomService: RoomService,
        private _modalService: IModalService,
        private _route: Router
    ) { }

    public ngOnInit(): void {
        this.roomId = this._activatedRouter.snapshot.paramMap.get('roomId');

        this.room$ = this._roomService.getRoomById(parseInt(this.roomId))
            .pipe(
                takeUntil(this._destroySubj$)
            );

        this.room$.subscribe({
            next: (room) => {
                this.roomCode = room.code;
            }
        });

        this.tasks$ = this._roomService.getTasks(parseInt(this.roomId))
            .pipe(
                takeUntil(this._destroySubj$)
            );
    }

    /** обновление данных при успешном запросе связанным с тасками (удаление, добавление, etc) */
    public taskSuccessHandler(): void {
        this.currentMenu = 'room';

        this.tasks$ = this._roomService.getTasks(parseInt(this.roomId))
            .pipe(
                takeUntil(this._destroySubj$)
            );
    }

    public createTask(): void {
        this.currentMenu = 'addTask';
    }

    public changeStateHandler(value: 'room' | 'members' | 'works'): void {
        this.currentMenu = value;
    }

    public ngOnDestroy(): void {
        this._destroySubj$.next();
    }

    public deleteRoom(): void {
        const modal: IModalContainer = this._modalService.showModal(RoomSettingsComponent);
        modal.InnerComponent.instance.submit.subscribe({
            next: () => {
                this._roomService.deleteRoom(this.roomCode).subscribe({
                    next: () => {
                        this._modalService.showSuccess('Комната успешно удалена');
                        modal.close();
                        this._route.navigate(['account']);
                    },
                    error: () => {
                        this._modalService.showError('Ошибка при удалении комнаты');
                    }
                });
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