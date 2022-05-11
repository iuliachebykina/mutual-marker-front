import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { map, Observable, Subject, switchMap, takeUntil } from "rxjs";
import { IBasicRoom, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './room-details-info.component.html',
    styleUrls: ['./styles/room-details.style.scss']
})
export class RoomDetailsInfoComponent implements OnDestroy, OnInit {
    public roomId: string;
    public room$: Observable<IBasicRoom>;
    public currentMenu: 'room' | 'members' | 'works' | 'addTask' = 'room';
    private _destroySubj$: Subject<void> = new Subject<void>();

    constructor(
        private _activatedRouter: ActivatedRoute,
        private _roomService: RoomService
    ) { }

    public ngOnInit(): void {
        this.room$ = this._activatedRouter.params
            .pipe(
                takeUntil(this._destroySubj$),
                map((params: Params): any => params['id']),
                switchMap((data: any): Observable<IBasicRoom> => {
                    this.roomId = data;

                    return this._roomService.getRoomById(data)
                })
            );  
    }

    public taskSuccessHandler(): void {
        this.currentMenu = 'room';
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