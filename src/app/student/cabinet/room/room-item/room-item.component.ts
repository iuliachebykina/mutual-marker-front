import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subject, forkJoin, takeUntil, map } from "rxjs";
import { RoomService } from "src/app/services/room.service";

@Component({
    selector: 'room-item',
    templateUrl: './room-item.component.html',
    styleUrls: ['./styles/room-item.style.scss']
})
export class RoomItemComponent {

    @Output()
    public onArrowClick: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    public title: string;

    @Input()
    public roomCount: number;

    @Input()
    public roomId: number;

    public allCount: number = 0;

    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService
    ) { }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    public arrowClick(): void {
        this.onArrowClick.emit();
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