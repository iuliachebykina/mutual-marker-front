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

    @Output()
    public onArrowClick: EventEmitter<number> = new EventEmitter<number>();

    @Input()
    public task: ITaskResponse;

    @Input()
    public index: number;

    constructor(private _roomService: RoomService) { }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    /** удаление таски */
    public deleteTask(event: Event): void {
        event?.stopPropagation();
        event?.preventDefault();
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

    /** редактирование таски */
    public updateTask(): void {
        
    }

    public toInformation(): void {
        this.onArrowClick.emit(this.task.id);
    }
}