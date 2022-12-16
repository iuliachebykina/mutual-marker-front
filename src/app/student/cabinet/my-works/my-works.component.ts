import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { IBasicRoom, ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './my-works.component.html',
    styleUrls: ['./styles/my-works.style.scss']
})
export class MyWorksComponent implements OnInit {

    public tasks: ITaskFromRoome[] = [];
    public room: IBasicRoom[] = [];

    constructor(
        private _roomService: RoomService
    ) { }


    public ngOnInit(): void {
        document.querySelector('body').style.background = "#f9f8ff";
        this._roomService.getRooms(0, 1000)
            .subscribe({
                next: (item: IBasicRoom[]): void => {
                    this.room = item;
                    const ids: number[] = item.map(room => room.id)
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