import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, take } from "rxjs";
import { ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: 'task-work-details.component.html',
    styleUrls: ['styles/task-work-details.style.scss']
})
export class TaskWorkDetailsComponent implements OnInit {
    public project$: Observable<any>;
    public task$: Observable<any>;
    public project: any;
    public pdfSrc: string;
    public reviewMode: boolean = false;
    private _workId: string;
    private _taskId: number;

    constructor(
        private _router: Router,
        private _activatedRouter: ActivatedRoute,
        private _projectService: ProjectFileManagerService,
        private _roomService: RoomService,
        private _fileService: ProjectFileManagerService,
        private _cdr: ChangeDetectorRef
    ) {
        this._activatedRouter.parent.params.subscribe({
            next: (a) => {
                this._taskId = parseInt(a['id']);
            }
        })
        this._activatedRouter.params.subscribe({
            next: (a) => {
                this._workId = a['workId'];
            }
        })
    }

    public ngOnInit(): void {
        this._projectService.getProjectById(this._workId).subscribe({
            next: (p) => {
                this.project = p;
                this.openWork(p?.attachments[0]);
            }
        });

        this.task$ = this._roomService.getTaskById(this._taskId + '');
    }

    public openWork(fileName: string): void {
        this._fileService.openFile(fileName)
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

    public excel(): void {
        this._fileService.excelStatistic2(parseInt(this._workId))
            .subscribe({
                next: (res) => {
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(res);
                    link.download = 'result.xlsx';
                    link.click();
                }
            });
    }

    public downloadWork(): void {
        window.open(this.pdfSrc);
    }

}