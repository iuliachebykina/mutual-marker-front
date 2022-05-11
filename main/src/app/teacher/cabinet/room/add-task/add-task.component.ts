import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { switchMap } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { RoomService } from "src/app/services/room.service";
import { UserBaseService } from "src/app/services/user.base.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./styles/add-task.style.scss']
})
export class AddTaskComponent extends FormBaseViewModel {

    @Output()
    public addedTask: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    public id: string;

    constructor(
        private _roomService: RoomService,
        private _userBaseService: UserBaseService,
        private _notificationService: GlobalNotificationService
    ) {
        super();
    }

    public createTask(): void {
        this._userBaseService.getUser()
            .pipe(
                switchMap(user => {
                    return this._roomService.createTask({
                        "Название задания": this.getFormValue('name'),
                        "Описание задания": this.getFormValue('description'),
                        "Дата старта": new Date(),
                        "Дедлайн": new Date(this.getFormValue('deadline').toString()),
                        "ИД комнаты": parseInt(this.id),
                        "Минимальное количество оценок": parseInt(this.getFormValue('countMarks')),
                        "Ступени оценивания": [{}],
                        "Создатель": user.email.toString()
                    })
                })
            )
            .subscribe({
                next: () => {
                    this._notificationService.subject$.next({
                        status: 'success',
                        text: 'Задание успешно создано'
                    });

                    this.addedTask.emit();
                }
            })

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