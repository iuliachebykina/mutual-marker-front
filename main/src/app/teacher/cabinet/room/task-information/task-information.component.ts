import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: 'task-information.component.html',
    styleUrls: ['styles/task-information.style.scss']
})
export class TaskInformationComponent implements OnInit {

    public task$: Observable<ITaskResponse>;
    private _taskId: number;

    constructor(private _router: Router, private _activatedRouter: ActivatedRoute, private _roomService: RoomService, private _fileService: ProjectFileManagerService) {
        this._activatedRouter.parent.params.subscribe({
            next: (a) => {
                this._taskId = a['id'];
            }
        })
    }

    public ngOnInit(): void {
        this.task$ = this._roomService.getTaskById(this._taskId + '');
    }

    public excel(): void {
        this._fileService.excelStatistic(this._taskId).subscribe({
            next: (res) => {
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(res);
                link.download = 'result.xlsx';
                link.click();
            }
        });


    }
}