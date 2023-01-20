import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { RoomService } from "src/app/services/room.service";
import { ValidationService } from "src/app/services/validation.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";
import {TUI_DATE_FORMAT, TUI_DATE_SEPARATOR, TuiDay, TuiTime} from '@taiga-ui/cdk';

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./styles/add-task.style.scss'],
    providers: [
        {provide: TUI_DATE_FORMAT, useValue: 'YMD'},
        {provide: TUI_DATE_SEPARATOR, useValue: '-'},
    ],
})
export class AddTaskComponent extends FormBaseViewModel implements OnDestroy, OnInit {
    public id: string;

    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _notificationService: GlobalNotificationService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ) {
        super();
    }

    public ngOnInit(): void {
        this._activatedRoute.parent.params.subscribe({
            next: (params) => {
                this.id = params['id'];
            }
        });
    }

    public createTask(): void {
        const date: string[] = this.getFormValue('deadline').split(',')[0].split('.');

        this._roomService.createTask({
            closeDate: new Date(`${date[2]}-${date[1]}-${date[0]}`),
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

                    this._router.navigate(['account', 'room', this.id, 'info']);
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
            deadline: new FormControl([TuiDay.fromLocalNativeDate(new Date())], [
                Validators.required,
                ValidationService.checkDeadline
            ]),
            countMarks: new FormControl('', [
                Validators.required,
                Validators.pattern(/^\d+$/)
            ]),
            descriptionMark: new FormControl('', [
                Validators.required,
            ])
        });
    }

}