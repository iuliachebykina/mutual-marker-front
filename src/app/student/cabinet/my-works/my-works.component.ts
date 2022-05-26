import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './my-works.component.html',
    styleUrls: ['./styles/my-works.style.scss']
})
export class MyWorksComponent implements OnInit {

    public tasks: ITaskFromRoome[] = [];

    constructor(
        private _roomService: RoomService
    ) { }


    public ngOnInit(): void {
        document.querySelector('body').style.background = "#866EFF0D";
        this._roomService.getRooms(0, 1000)
            .pipe(
                map(item => item.map(room => room.id))
            )
            .subscribe({
                next: (ids: number[]): void => {
                    ids.forEach((c: number): void => {
                        this._roomService.getTasks(c)
                            .subscribe({
                                next: (response) => {
                                    const task: ITaskFromRoome = {};
                                    task.id = c;
                                    task.tasks = response;
                                    this.tasks.push(task);
                                }
                            });
                    });
                }
            })
    }

}

export interface ITaskFromRoome {
    id?: number,
    tasks?: ITaskResponse[]
}