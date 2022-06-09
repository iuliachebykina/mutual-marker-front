import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { IStatistic, MarksService } from "src/app/services/marks.service";
import { ITaskResponse, RoomService } from "src/app/services/room.service";

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
        this._roomService.getTasks(parseInt(this.roomId))
            .pipe(
                map((tasks: ITaskResponse[]): number[] => {
                    return tasks.map(item => item.id)
                }),
                switchMap((ids: number[]): Observable<IStatistic[][]> => {
                    return forkJoin(ids.map(i => {
                        return this._markService.getAllMarksByTaskId(i)
                    }))
                }),
                map((students: IStatistic[][]): IStatistic[] => {
                    const arr: IStatistic[] = students.flat().filter(i => i !== null);

                    return arr;
                })
            )
            .subscribe({
                next: (data) => {
                    console.log(data);
                }
            })
    }
}