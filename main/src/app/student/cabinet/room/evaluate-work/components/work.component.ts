import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, Observable, take } from "rxjs";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { MarksService } from "src/app/services/marks.service";
import { IAttachment, ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { ITaskResponse, RoomService } from "src/app/services/room.service";
import { UserBaseService } from "src/app/services/user.base.service";
import { IUser } from "src/app/student/account/interfaces/user-registration.interface";

@Component({
    templateUrl: './work.component.html',
    styleUrls: ['./styles/work.style.scss']
})
export class WorkComponent implements OnInit {
    @ViewChild('range')
    public rangeControl: ElementRef;
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

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _fileManager: ProjectFileManagerService,
        private _roomService: RoomService,
        private _notificationService: GlobalNotificationService,
        private _markService: MarksService,
        private _userService: UserBaseService,
        private _route: Router
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
            })
    }

    public saveWork(): void {
        this._markService.setWorkMark(this.projectId, this.userId, [parseInt(this.mark)])
            .subscribe({
                next: () => {
                    this.isRangeSaved = true;
                    this._notificationService.subject$.next({
                        text: 'Работа успешно оценена',
                        status: 'success'
                    });
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