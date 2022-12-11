import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map, Observable, switchMap, take } from "rxjs";
import { IMark, IStatistic, MarksService } from "src/app/services/marks.service";
import { IAttachment, ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './project-details.component.html',
    styleUrls: ['./styles/project-details.style.scss']
})
export class TaskDetailsComponent implements OnInit {

    @ViewChild('grade')
    public rangeControl: ElementRef;
    public pdfSrc: string;
    public mark: number = 0;
    @ViewChild('input')
    public input: any;
    //айди комнаты в котором расположено задание на которое студент загружает работу
    public roomId: string;
    //задание которое нужно решить
    public taskId: string;
    //текущее задание
    public task$: Observable<ITaskResponse>;
    //решение студента
    public project: IAttachment[] = [];
    //результат ключей по которым наши вложения сохраняются на бэке
    public fileBackendKey: string[] = [];
    //порядковый номер задания
    public projectIndex: string;

    constructor(
        private _activatedRouter: ActivatedRoute,
        private _roomService: RoomService,
        private _fileManager: ProjectFileManagerService,
        private _markService: MarksService,
        private _renderer: Renderer2
    ) { }

    public ngOnInit(): void {
        this._activatedRouter.parent.params.subscribe((id): void => {
            this.roomId = id['id'];
            this.taskId = this._activatedRouter.snapshot.paramMap['params']['id'];
        });

        this._activatedRouter.queryParamMap
            .pipe(
                map((params: ParamMap) => params.get('index')),
            )
            .subscribe((index: string): void => {
                this.projectIndex = index;
            });

        this.task$ = this._roomService.getTaskById(this.taskId);
        this._fileManager.getSelfProjectByTaskId(this.taskId)
            .subscribe({
                next: (data: IAttachment[]): void => {
                    this.project = data;
                    this.project = this.project.filter(i => i !== null);
                    if (data) {
                        this.openWork(data[0].attachments[0]);
                    }
                    this._markService.getAllMarksByTaskId(this.taskId)
                        .subscribe({
                            
                            next: (marks: IStatistic[]): void => {
                                const mark: number = marks.filter(i => i !== null).filter(item => item.projectId === data[0].id)[0]?.finalMark || 0;
                                this.mark = !isFinite(mark) ? 0 : mark;
                                this._renderer.setStyle(this.rangeControl.nativeElement, 'width', this.mark + '%')
                            }
                        });
                }
            });

    }

    public uploadWork(element: any): void {
        const fileToUpload = element.files.item(0);
        this._fileManager.uploadStudentWork(fileToUpload)
            .pipe(
                switchMap(data => {
                    return this._fileManager.createProject(this.taskId, data);
                })
            )
            .subscribe(() => {
                this._fileManager.getSelfProjectByTaskId(this.taskId)
                    .subscribe({
                        next: (data: IAttachment[]): void => {
                            this.project = data;
                            this.project = this.project.filter(i => i !== null);
                            if (data) {
                                this.openWork(data[0].attachments[0]);
                            }
                        }
                    });
            });
    }

    public delete(): void {
        const newObjt: IAttachment = Object.assign(this.project[0], {attachments: null});
        this._fileManager.updateProject(newObjt).subscribe();
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