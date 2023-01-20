import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { forkJoin, map, Subject, takeUntil } from "rxjs";
import { RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './room-item.component.html',
    selector: 'room-item',
    styleUrls: ['./styles/room-item.style.scss']
})
export class RoomItemComponent implements OnInit, OnDestroy {

    @Input()
    public title: string;

    public allCount: number = 0;

    @Input()
    public roomCount: number;

    @Input()
    public roomId: number;

    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService
    ) { }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    public ngOnInit(): void {
        forkJoin([
            this._roomService.getTeachersByRoomdId(this.roomId, 0, 1000),
            this._roomService.getStudentsByRoomId(this.roomId, 0, 1000)
        ])
            .pipe(
                takeUntil(this._onDestroy$),
                map(([teachers, students]: [any, any]) => {
                    return teachers.length + students.length;
                })
            )
            .subscribe({
                next: (count: number): void => {
                    this.allCount = count;
                }
            });
    }
}