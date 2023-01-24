import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoomService } from "src/app/services/room.service";

@Component({
    styleUrls: ['./styles/room-details-info.style.scss'],
    templateUrl: 'task-details-info.component.html'
})
export class TaskDetailsInfoComponent implements OnInit {
    private _taskId: number;
    private _roomId: number;

    constructor(private _router: Router, private _activatedRouter: ActivatedRoute, private _roomService: RoomService) {
        this._activatedRouter.params.subscribe({
            next: (a) => {
                this._taskId = a['id']
            }
        });
    }

    public ngOnInit(): void {
        this._roomService.getTaskById(this._taskId + '').subscribe({
            next: (task) => {
                this._roomId = task.roomId;
            }
        });
    }

    public toRoom(): void {
        this._router.navigate(['account/room/' + this._roomId + '/info']);
    }
}