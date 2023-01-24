import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, map, Observable, switchMap, tap } from "rxjs";
import { IMark, MarksService } from "src/app/services/marks.service";
import { IAttachment, ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { ITaskResponse, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './evaluate-work.component.html',
    styleUrls: ['./styles/evaluate-work.style.scss']
})
export class EvaluateWorkComponent implements OnInit {

    public roomId: string;
    public randomProject$: Observable<IAttachment[][][]>;
    public evaluate: IAttachment[][][] = [];
    public tasks: ITaskResponse[] = [];

    constructor(
        private _projectService: ProjectFileManagerService,
        private _roomService: RoomService,
        private _markService: MarksService,
        public activatedRouter: ActivatedRoute,
        private _router: Router
    ) {
        activatedRouter.parent.params.subscribe((id): void => {
            this.roomId = id['id'];
        });
    }

    public ngOnInit(): void {
        this._roomService.getRooms(0, 10000)
            .pipe(
                switchMap(() => {
                    return this._roomService.getTasks(parseInt(this.roomId))
                }),
                //мапим айди заданий по каждой комнате
                map((elem: ITaskResponse[]): number[] => {
                    this.tasks = elem;

                    return elem.map(i => i.id);
                }),
                //запрашиваем проекты студентов
                switchMap((task: number[]) => {
                    return forkJoin([
                        ...task.map((item) => {
                            return this._projectService.getRandomProject(item);
                        })
                    ])
                }),
                switchMap((projectId: [number, number][]): Observable<IAttachment[][]> => {
                    return forkJoin([
                        ...projectId.filter(i => i[0] !== null).map((item) => {
                            return this._projectService.getAnotherStudentProject(item[0], item[1])
                        })
                    ])
                }),
                switchMap((value: IAttachment[][]): Observable<IAttachment[][][]> => {
                    return forkJoin([
                        ...value.filter(item => item[0]).map((i: IAttachment[], index): Observable<IAttachment[][]> => {
                            return this._markService.getProjectMark(i[0]?.id)
                                .pipe(
                                    map((grade: IMark[]): IAttachment[][] => {
                                        let gradeCount: number = 0;
                                        if (grade.length) {
                                            gradeCount = grade.map(item => item.markValue).reduce((prev, curr) => prev + curr) / grade.length;
                                        }
                                        const gradeObject: IAttachment = { grade: gradeCount | 0 };

                                        return [[Object.assign(value[index][0], gradeObject)]];
                                    })
                                )
                        })
                    ]);
                })
            )
            .subscribe({
                next: (v: IAttachment[][][]): void => {
                    this.evaluate = v;
                }
            })
    }

    public getTheme(id: number): string {
        return this.tasks.find(i => i.id === id)?.title;
    }

    public toWorkDetails(workId: number): void {
        const taskId: number = this.tasks.find(item => item.roomId === parseInt(this.roomId))?.id;
        this._router.navigate(['cabinet', 'room', this.roomId, 'work', workId], { queryParams: { task: taskId } });
    }
}