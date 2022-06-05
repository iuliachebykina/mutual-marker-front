import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, takeUntil } from "rxjs";
import { IBasicRoom, ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './room-main.component.html',
    styleUrls: ['./styles/room-details.style.scss']
})
export class RoomMainComponent {
    public roomId: string;
    public room$: Observable<IBasicRoom>;
    public tasks$: Observable<ITaskResponse[]>;
    private _destroySubj$: Subject<void> = new Subject<void>();
    public hintShown: boolean = false;
 
    constructor(
        private _activatedRouter: ActivatedRoute,
        private _roomService: RoomService,
        private _router: Router
    ) { }

    public toggleHint(): void {
        this.hintShown = !this.hintShown;
    }

    public ngOnInit(): void {
        this._activatedRouter.parent.params.subscribe({
            next: (param) => {
                this.roomId = param['id'];
            }
        })
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
        this.tasks$ = this._roomService.getTasks(parseInt(this.roomId))
            .pipe(
                takeUntil(this._destroySubj$)
            );
    }

    public createTask(): void {
        this._router.navigate(['account', 'room', this.roomId, 'create-task']);
    }

}