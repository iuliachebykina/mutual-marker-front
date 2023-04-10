import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, Observable, take } from "rxjs";
import { IMarkStepValue, MarksService } from "src/app/services/marks.service";
import { IModalService } from "src/app/services/modals";
import { IAttachment, ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { ITaskResponse, RoomService } from "src/app/services/room.service";
import { UserBaseService } from "src/app/services/user.base.service";
import { IUser } from "src/app/student/account/interfaces/user-registration.interface";

@Component({
    templateUrl: './work.component.html',
    styleUrls: ['./styles/work.style.scss']
})
export class WorkComponent implements OnInit {
    public taskForm: FormGroup;
    public mark: string = '0';
    public roomId: string;
    public projectId: string;
    public taskId: string;
    public task$: Observable<ITaskResponse>;
    public isRangeSaved: boolean = false;
    //решение студента
    public project: IAttachment[] = [];
    public pdfSrc: string;
    public userId: string;
    public current: number = 0;

    public commentControls: { [key: number]: FormControl } = {};
    public evaluateControls: { [key: number]: FormControl } = {};


    constructor(
        private _activatedRoute: ActivatedRoute,
        private _fileManager: ProjectFileManagerService,
        private _roomService: RoomService,
        private _modalService: IModalService,
        private _markService: MarksService,
        private _userService: UserBaseService,
        private _route: Router,
        private fb: FormBuilder,
        private _cdr: ChangeDetectorRef,
        private _userBaseService: UserBaseService
    ) { }

    public ngOnInit(): void {
        this._userService.getUser()
            .subscribe({
                next: (user: IUser): void => {
                    this.userId = user.id;
                }
            });

        combineLatest([
            this._activatedRoute.parent.params,
            this._activatedRoute.params,
            this._activatedRoute.queryParams
        ])
            .subscribe({
                next: (value) => {
                    this.roomId = value[0]['id'];
                    this.projectId = value[1]['workId'];
                    this.taskId = value[2]['task'];
                }
            });

        this.task$ = this._roomService.getTaskById(this.taskId);
        this._fileManager.getAnotherStudentProject(this.projectId, parseInt(this.taskId))
            .subscribe({
                next: (data: IAttachment[]): void => {
                    this.project = data;
                    if (data) {
                        this.openWork(data[0]?.attachments[0]);
                    }
                }
            });

        this._markService.getProjectMark(parseInt(this.projectId))
            .subscribe({
                next: (a) => {
                    if (a.find(i => i.project.id === parseInt(this.projectId))?.markValue) {
                        this.mark = (a.find(i => i.project.id === parseInt(this.projectId))?.markValue).toString();
                    }
                }
            });

        this.taskForm = this.fb.group({});
        this.task$.subscribe({
            next: (task) => {
                task.markSteps.forEach(item => {
                    this.addCriterionControl(item.id);
                })
            }
        });
    }

    public changeCurrentCriteria(number: number, criterionId: number): void {
        this.current = number;

        const commentControl = this.commentControls[criterionId];
        const evaluateControl = this.evaluateControls[criterionId];

        const commentValue = commentControl.value;
        const evaluateValue = evaluateControl.value;


        if (commentValue || evaluateValue) {
            commentControl.setValue(commentValue);
            evaluateControl.setValue(evaluateValue);
        } else {
            commentControl.setValue('');
            evaluateControl.setValue('');
        }

        this._cdr.detectChanges();
    }

    public addCriterionControl(criterionId: number) {
        const commentControlName = 'comment' + criterionId;
        const evaluateControlName = 'evaluate' + criterionId;

        const commentControl = new FormControl('', Validators.required);
        const evaluateControl = new FormControl('', Validators.required);

        this.taskForm.addControl(commentControlName, commentControl);
        this.taskForm.addControl(evaluateControlName, evaluateControl);

        this.commentControls[criterionId] = commentControl;
        this.evaluateControls[criterionId] = evaluateControl;

    }

    public saveWork(): void {
        if (!this.taskForm.valid) {
            return;
        }

        const marks: IMarkStepValue[] = [];

        Object.keys(this.taskForm.value).forEach(key => {
            const [prefix, markStepId] = key.split(/(\d+)/);
            const value = this.taskForm.value[key];

            if (marks.some((i: IMarkStepValue): boolean => i.markStepId === parseInt(markStepId))) {
                return;
            } else {
                marks.push({ markStepId: parseInt(markStepId), value: this.taskForm.value['evaluate' + markStepId], comment: this.taskForm.value['comment' + markStepId], reviewerId: this._userBaseService.getUserId() });
            }
        });

        this._markService.setWorkMark(this.projectId, this.userId, marks)
            .subscribe({
                next: () => {
                    this._modalService.showSuccess(
                        'Работа успешно оценена',
                    );
                    window.history.back();
                }
            })

    }

    public downloadWork(): void {
        window.open(this.pdfSrc);
    }

    public checkValue(value: string): void {
        this.mark = value;
    }

    public openWork(fileName: string): void {
        this._fileManager.openFile(fileName)
            .pipe(
                take(1)
            )
            .subscribe({
                next: (data) => {
                    let blob = new Blob([data], { type: 'application/pdf' });
                    let url = window.URL.createObjectURL(blob);
                    this.pdfSrc = url;
                }
            });
    }
}