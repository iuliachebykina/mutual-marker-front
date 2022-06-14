import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { IBasicRoom, RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './main-page.component.html',
    styleUrls: ['./styles/main-page.style.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
    public allRooms: IBasicRoom[] = [];
    public filteredRooms: IBasicRoom[] = [];
    public sortDown: boolean = true;
    public notFoundRooms: boolean = false;

    private _subjectDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _router: Router
    ) { }

    public createRoom(): void {
        this._router.navigate(['account', 'create']);
    }

    public toDetails(id: number): void {
        this._router.navigate(['account', 'room', id])
    }

    public ngOnInit(): void {
        this._roomService.getRooms(0, 100)
            .pipe(
                takeUntil(this._subjectDestroy$)
            )
            .subscribe({
                next: (data) => {
                    this.allRooms = data;
                    this.filteredRooms = data;
                }
            })
    }

    public ngOnDestroy(): void {
        this._subjectDestroy$.next();
    }

    public sort(): void {
        this.sortDown = !this.sortDown;

        if (this.sortDown) {
            this.filteredRooms.sort((a: IBasicRoom, b: IBasicRoom): number => {
                return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
            });
        } else {
            this.filteredRooms.sort((a: IBasicRoom, b: IBasicRoom): number => {
                return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
            });
        }
    }

    public filterItems(str: string): void {
        this.filteredRooms = this.allRooms.filter(item => item.title.toLowerCase().indexOf(str.toLowerCase()) > -1);
        this.notFoundRooms = this.filteredRooms.length ? false : true;
    }
}