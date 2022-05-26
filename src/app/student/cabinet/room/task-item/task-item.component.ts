import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    selector: 'task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./styles/task-item.style.scss']
})
export class TaskItemComponent {

    @Output()
    public onTaskClick: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    public task: ITaskResponse;

    @Input()
    public index: number;

    public clickTask(): void {
        this.onTaskClick.emit();
    }
}