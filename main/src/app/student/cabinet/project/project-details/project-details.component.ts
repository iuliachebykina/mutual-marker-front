import { Component, ElementRef, Inject, Injector, OnInit, Renderer2, ViewChild } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map, Observable, switchMap, take } from "rxjs";
import { declOfNum } from "src/app/modules/word-by-number";
import { IMark, IStatistic, MarksService } from "src/app/services/marks.service";
import { IModalContainer, IModalService } from "src/app/services/modals";
import { IAttachment, ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { ITaskResponse, RoomService } from "src/app/services/room.service";
import { ModalUploadWorkComponent } from "../modal-upload-work/modal-upload-work.component";

@Component({
    templateUrl: './project-details.component.html',
    styleUrls: ['./styles/project-details.style.scss']
})
export class TaskDetailsComponent implements OnInit {

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
        private _renderer: Renderer2,
        private _modalService: IModalService,
        @Inject(Injector) protected injector: Injector,

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
                    if (data[0]?.attachments[0]) {
                        this.openWork(data[0]?.attachments[0]);
                    }
                    this._markService.getAllMarksByTaskId(this.taskId)
                        .subscribe({
                            
                            next: (marks: IStatistic[]): void => {
                                if (marks) {
                                    const mark: number = marks.filter(i => i !== null).filter(item => item.projectId === data[0].id)[0]?.finalMark || 0;
                                    this.mark = !isFinite(mark) ? 0 : mark;
                                }
                                
                                // this._renderer.setStyle(this.rangeControl.nativeElement, 'width', this.mark + '%')
                            }
                        });
                }
            });
    }

    public openModalUploadWork(): void {
        const modal: IModalContainer = this._modalService.showModal(ModalUploadWorkComponent, { componentParams: { injector: this.injector } });
        modal.InnerComponent.instance.cancel.subscribe({
            next: () => {
                modal.close();
            }
        });
        modal.InnerComponent.instance.submit.subscribe({
            next: () => {
                this._fileManager.getSelfProjectByTaskId(this.taskId)
                    .subscribe({
                        next: (data: IAttachment[]): void => {
                            this.project = data;
                            this.project = this.project.filter(i => i !== null);
                            if (data[0]?.attachments[0]) {
                                this.openWork(data[0].attachments[0]);
                            }
                        }
                    });
                modal.close();
            }
        });
        modal.InnerComponent.instance.initialize(this.taskId, this.task$);

        modal.open();
    }

    public uploadWork(element: any): void {
        // const fileToUpload = element.files.item(0);
        // this._fileManager.uploadStudentWork(fileToUpload)
        //     .pipe(
        //         switchMap(data => {
        //             return this._fileManager.createProject(this.taskId, data);
        //         })
        //     )
        //     .subscribe(() => {
        //         this._fileManager.getSelfProjectByTaskId(this.taskId)
        //             .subscribe({
        //                 next: (data: IAttachment[]): void => {
        //                     this.project = data;
        //                     this.project = this.project.filter(i => i !== null);
        //                     if (data[0]?.attachments[0]) {
        //                         this.openWork(data[0].attachments[0]);
        //                     }
        //                 }
        //             });
        //     });
    }

    public delete(): void {
        this._fileManager.deleteAttachment(this.project[0]?.id, this.project[0].attachments[0]).subscribe({
            next: () => {
                this.project = [];
            }
        })
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

    public openInBrowser(): void {
        window.open(this.pdfSrc);
    }

    public getDelOfWords(count: number): string {
        return declOfNum(count, ['работу', 'работ', 'работы']);
    }
}