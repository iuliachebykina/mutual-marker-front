import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, takeUntil } from "rxjs";
import { IBasicRoom, ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './room-informations.component.html',
    styleUrls: ['./styles/room-informations.style.scss']
})
export class RoomInformationsComponent {
    public roomId: string;
    public tasks$: Observable<ITaskResponse[]>;
    public room: IBasicRoom;

    private _destroySubj$: Subject<void> = new Subject<void>();

    constructor(
        private _activatedRouter: ActivatedRoute,
        private _roomService: RoomService,
        private _router: Router
    ) {
        _activatedRouter.parent.params.subscribe((id): void => {
            this.roomId = id['id'];
        });
    }

    public ngOnInit(): void {
        this._roomService.getRoomById(parseInt(this.roomId))
            .pipe(
                takeUntil(this._destroySubj$)
            )
            .subscribe((room: IBasicRoom): void => {
                this.room = room;
            });

        this.tasks$ = this._roomService.getTasks(parseInt(this.roomId))
            .pipe(
                takeUntil(this._destroySubj$)
            );
    }

    /** просмотр детальной информации о задании */
    public navigateToDetails(id: number, index: number): void {
        this._router.navigate(['cabinet', 'room', this.roomId, 'task', id], { queryParams: { index }});
    }

    public ngOnDestroy(): void {
        this._destroySubj$.next();
    }
}