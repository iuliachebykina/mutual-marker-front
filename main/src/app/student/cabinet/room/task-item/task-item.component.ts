import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { map } from "rxjs";
import { MarksService } from "src/app/services/marks.service";
import { ITaskResponse } from "src/app/services/room.service";
import { UserBaseService } from "src/app/services/user.base.service";

@Component({
    selector: 'task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./styles/task-item.style.scss']
})
export class TaskItemComponent implements OnInit {

    @Output()
    public onTaskClick: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    public task: ITaskResponse;

    @Input()
    public index: number;

    public isBlock: boolean = false;
    public finalMark: number;
    public profileId: number;

    constructor(
        private _markService: MarksService,
        private _userService: UserBaseService
    ) {
        this._userService.getUser()
            .subscribe({
                next: (user) => {
                    this.profileId = parseInt(user.id);
                }
            });
    }

    public ngOnInit(): void {
        this.isBlock = new Date() > new Date(this.task.closeDate);
        this._markService.getAllMarksByTaskId(this.task.id)
            .pipe(
                map(marks => marks?.filter(i => i !== null))
            )
            .subscribe({
                next: (marks) => {
                    this.finalMark = marks.filter(item => item.profileId === this.profileId)[0]?.finalMark;
                }
            });
    }
    public clickTask(): void {
        if (!this.isBlock) {
            this.onTaskClick.emit();
        }
    }
}