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
    public statistic: IStatistic[] = [];
    public pageSize = 10;
    public currentPage = 1;
    private _taskId: string;
    private _roomId: string;

    constructor(
        private _activatedRouter: ActivatedRoute,
        private _roomService: RoomService,
        private _markService: MarksService
    ) {
    }

    public get items(): IStatistic[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.statistic.slice(startIndex, startIndex + this.pageSize);
    }

    public get pageCount(): number {
        return Math.ceil(this.statistic.length / this.pageSize);
    }

    public get pages(): number[] {
        const pages = [];
        for (let i = 1; i <= this.pageCount; i++) {
            pages.push(i);
        }
        return pages;
    }

    public setCurrentPage(page: number): void {
        this.currentPage = page;
    }

    public ngOnInit(): void {
        this._activatedRouter.parent.params
            .pipe(
                switchMap((params) => {
                    this._taskId = params['id'];
                    this._roomId = params['roomId'];

                    return this._taskId ? this._roomService.getTaskById(params['id']) : this._roomService.getTasks(parseInt(this._roomId));
                }),
                map(room => !Array.isArray(room) ? room?.roomId : parseInt(this._roomId)),
                switchMap(roomId => {
                    return this._roomService.getTasks(roomId)
                }),
                map((tasks: ITaskResponse[]): number[] => {
                    if (this._taskId) {
                        tasks = tasks.filter(i => i.id === parseInt(this._taskId));
                    }

                    return tasks.map(item => item.id)
                }),
                switchMap((ids: number[]): Observable<IStatistic[][]> => {
                    return forkJoin(ids.map(i => {
                        return this._markService.getAllMarksByTaskId(i)
                    }))
                }),
                map((students: IStatistic[][]): IStatistic[] => {
                    const arr: IStatistic[] = students.flat().filter(i => i !== null);
                    arr.forEach(item => {
                        item.finalMark = !isFinite(item.finalMark) ? 0 : item.finalMark;
                    });
                    return arr;
                })
            )
            .subscribe({
                next: (data: IStatistic[]): void => {
                    this.statistic = data;
                }
            });
    }
}