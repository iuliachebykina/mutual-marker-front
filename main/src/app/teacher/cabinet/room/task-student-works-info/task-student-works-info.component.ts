import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: 'task-student-works-info.component.html',
    styleUrls: ['styles/task-student-works-info.style.scss']
})
export class TaskStudentWorksInfoComponent implements OnInit {

    public title: string = '';
    public tasks: any[] = [];
    private _taskId: number;
    private _roomId: number;

    constructor(private _router: Router, private _activatedRouter: ActivatedRoute, private _projectService: ProjectFileManagerService, private _roomService: RoomService) {
        this._activatedRouter.parent.params.subscribe({
            next: (a) => {
                this._taskId = parseInt(a['id']);
            }
        })
    }

    public ngOnInit(): void {
        this._roomService.getTaskById(this._taskId + '').subscribe({
            next: (r) => {
                this.title = r.title;
            }
        })
        this._projectService.getProjectsByTask(this._taskId)
            .subscribe({
                next: (p) => {
                    this.tasks = p;
                }
            });
    }

}