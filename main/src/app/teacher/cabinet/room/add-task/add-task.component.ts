import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { min, Subject, takeUntil } from "rxjs";
import { IModalService } from "src/app/services/modals";
import { RoomService } from "src/app/services/room.service";
import { ValidationService } from "src/app/services/validation.service";

@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./styles/add-task.style.scss'],
})
export class AddTaskComponent implements OnDestroy, OnInit {
    public id: string;
    public myForm: FormGroup;
    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _modalService: IModalService,
        private _router: Router,
        private fb: FormBuilder,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this._activatedRoute.parent.params.subscribe({
            next: (params) => {
                this.id = params['roomId'];
            }
        });

        this.myForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            closeDate: [[TuiDay.fromLocalNativeDate(new Date()), new TuiTime(12, 30)], [
                Validators.required,
                ValidationService.checkDeadline
            ]],
            minNumberOfGraded: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
            markSteps: this.fb.array([
                this.createStep()
            ])
        });
    }


    createStep() {
        return this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            values: this.fb.array([this.createValue()])
        });
    }


    get markSteps() {
        return this.myForm.get('markSteps') as FormArray;
    }


    getValues(step) {
        return step.get('values') as FormArray;
    }

    addStep() {
        this.markSteps.push(this.createStep());
    }

    deleteStep(i: number) {
        this.markSteps.removeAt(i);
    }

    addValue(step) {
        const values = this.getValues(step);
        const newValue = this.createValue();
        values.push(newValue);
        this.myForm.get('markSteps').updateValueAndValidity();
    }

    deleteValue(step, j: number) {
        this.getValues(step).removeAt(j);
    }

    createValue(value = '') {
        return this.fb.group({
            valueControl: ['', Validators.required]
        });
    }

    public createTask(): void {
        const formValue = this.myForm.value;
        const markSteps = formValue.markSteps.map(step => {
            const values = step.values.map(value => parseInt(value.valueControl));
            return { ...step, values };
        });
        const updatedFormValue = { ...formValue, markSteps };


        const date: {
            year: number,
            month: number,
            day: number,
        } = this.myForm.get('closeDate').value[0];

        const minutes: {
            hours: number,
            minutes: number
        } = this.myForm.get('closeDate').value[1];
        console.log(this.myForm.get('closeDate').value);

        var dateString = new Date(`${date.year}-${date.month + 1}-${date.day} ${minutes.hours}:${minutes.minutes}`);
        var year = dateString.getFullYear(); // получаем год
        var month = (dateString.getMonth() + 1).toString().padStart(2, '0'); // получаем месяц и добавляем нули
        var day = dateString.getDate().toString().padStart(2, '0'); // получаем день и добавляем нули
        var minut = dateString.getMinutes();
        var hours = dateString.getHours();
        var formattedDate = `${year}-${month}-${day} ${hours}:${minut}`; // форматируем дату в нужный вид

        this._roomService.createTask(
            Object.assign(updatedFormValue, {
                closeDate: new Date(formattedDate),
                owner: null,
                openDate: new Date(),
                roomId: parseInt(this.id),
                minNumberOfGraded: parseInt(this.myForm.value.minNumberOfGraded)
            })
        )
            .pipe(
                takeUntil(this._onDestroy$)
            )
            .subscribe({
                next: () => {
                    this._modalService.showSuccess('Задание успешно создано');
                    this._router.navigate(['account', 'room', this.id, 'info']);
                },
                error: (e) => {
                    this._modalService.showError(e.error);
                }
            });
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }

}
