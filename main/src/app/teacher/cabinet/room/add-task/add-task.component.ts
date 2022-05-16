import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { RoomService } from "src/app/services/room.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./styles/add-task.style.scss']
})
export class AddTaskComponent extends FormBaseViewModel implements OnDestroy {
    @Output()
    public addedTask: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    public id: string;

    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _notificationService: GlobalNotificationService
    ) {
        super();
    }

    public createTask(): void {
        this._roomService.createTask({
            closeDate: "2022-03-20T00:00:00.000Z",
            description: this.getFormValue('description'),
            markSteps: [
                {
                    "title": "test",
                    "description": "testtest",
                    "values": [1, 4, 5]
                }
            ],
            title: this.getFormValue('name'),
            owner: null,
            openDate: new Date(),
            roomId: parseInt(this.id),
            minNumberOfGraded: parseInt(this.getFormValue('countMarks'))
        })
            .pipe(
                takeUntil(this._onDestroy$)
            )
            .subscribe({
                next: () => {
                    this._notificationService.subject$.next({
                        status: 'success',
                        text: 'Задание успешно создано'
                    });

                    this.addedTask.emit();
                }
            });
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            name: new FormControl('', [
                Validators.required,
            ]),
            description: new FormControl('', [
                Validators.required,
            ]),
            deadline: new FormControl('', [
                Validators.required,
            ]),
            countMarks: new FormControl('', [
                Validators.required,
            ]),
            descriptionMark: new FormControl('', [
                Validators.required,
            ])
        });
    }

}