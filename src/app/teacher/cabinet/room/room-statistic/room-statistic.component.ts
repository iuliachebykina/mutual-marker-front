import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MarksService } from "src/app/services/marks.service";
import { RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './room-statistic.component.html',
    styleUrls: ['./style/room-statistic.style.scss']
})
export class RoomStatisticComponent {
    public roomId: string;
    constructor(
        private _activatedRouter: ActivatedRoute,
        private _roomService: RoomService,
        private _markService: MarksService
    ) { }

    public ngOnInit(): void {
        this._activatedRouter.parent.params.subscribe({
            next: (params) => {
                this.roomId = params['id'];
            }
        });

        //1 шаг получаем все таски данной комнаты
        // this._roomService.getTasks(parseInt(this.roomId))
        //     .subscribe({
        //         next: (data) => {
        //             console.log(data);
        //         }
        //     })

        // this._markService.getAllMarksByTaskId(123).subscribe();
    }
}