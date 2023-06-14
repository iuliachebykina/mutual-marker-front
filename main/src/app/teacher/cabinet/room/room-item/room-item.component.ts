import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, map, Subject, switchMap, takeUntil } from "rxjs";
import { IModalService } from "src/app/services/modals";
import { RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './room-item.component.html',
    selector: 'room-item',
    styleUrls: ['./styles/room-item.style.scss']
})
export class RoomItemComponent implements OnInit, OnDestroy {

    @Input()
    public fromGroup: boolean = false;
    
    @Output()
    public onArrowClick: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    public onDelete: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    public title: string;

    public allCount: number = 0;

    @Input()
    public roomCount: number;

    @Input()
    public roomId: number;

    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _modalService: IModalService,
        private _router: Router
    ) { }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    public redirect(): void {
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

    public delete(event): void {
        event.preventDefault();
        event.stopPropagation();

        this._roomService.getRoomById(this.roomId)
            .pipe(
                switchMap(room => this._roomService.deleteRoom(room.code))
            )
            .subscribe({
                next: () => {
                    this._modalService.showSuccess('Комната успешно удалена');
                    this.onDelete.emit();
                },
                error: () => {
                    this._modalService.showError('Ошибка при удалении комнаты');
                }
            });
    }
}