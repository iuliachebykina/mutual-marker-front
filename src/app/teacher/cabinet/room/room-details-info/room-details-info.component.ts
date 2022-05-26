import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { map, Observable, Subject, switchMap, takeUntil } from "rxjs";
import { IBasicRoom, ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './room-details-info.component.html',
    styleUrls: ['./styles/room-details.style.scss']
})
export class RoomDetailsInfoComponent implements OnDestroy, OnInit {
    public roomId: string;
    public room$: Observable<IBasicRoom>;
    public tasks$: Observable<ITaskResponse[]>;
    public currentMenu: 'room' | 'members' | 'works' | 'addTask' = 'room';
    private _destroySubj$: Subject<void> = new Subject<void>();

    constructor(
        private _activatedRouter: ActivatedRoute,
        private _roomService: RoomService
    ) { }

    public ngOnInit(): void {
        this.roomId = this._activatedRouter.snapshot.paramMap.get('id');

        this.room$ = this._roomService.getRoomById(parseInt(this.roomId))
            .pipe(
                takeUntil(this._destroySubj$)
            );

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
}