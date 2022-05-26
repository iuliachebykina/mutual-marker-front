import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    selector: 'task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./styles/task-item.style.scss']
})
export class TaskItemComponent implements OnDestroy {
    private _onDestroy$: Subject<void> = new Subject<void>();

    @Output()
    public onDeleted: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    public task: ITaskResponse;

    @Input()
    public index: number;

    constructor(private _roomService: RoomService) { }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    /** удаление таски */
    public deleteTask(): void {
        this._roomService.deleteTask(this.task.id)
            .pipe(
                takeUntil(this._onDestroy$)
            )
            .subscribe({
                next: () => {
                    this.onDeleted.emit();
                }
            });
    }
}