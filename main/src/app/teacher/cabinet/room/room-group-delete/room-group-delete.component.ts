import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { TUI_DEFAULT_MATCHER, TuiHandler, TuiContextWithImplicit, tuiIsNumber } from "@taiga-ui/cdk";
import { Subject, Observable, map, shareReplay, startWith, switchMap, forkJoin } from "rxjs";
import { ModalBaseComponent } from "src/app/services/modals";
import { RoomService, IGroup } from "src/app/services/room.service";

interface IRoom {
    readonly id: number;
    readonly name: string;
}

@Component({
    templateUrl: 'room-group-delete.component.html',
    styleUrls: ['styles/room-group-delete.style.scss']
})
export class RoomGroupDeleteComponent extends ModalBaseComponent {
    public loading: boolean = false;
    private _onDestroy$: Subject<void> = new Subject<void>();
    private readonly search$ = new Subject<string>();
    readonly control = new FormControl([], [Validators.required]);

    public rooms$: Observable<IRoom[]> = this._roomService.getGroups(0, 100).pipe(
        map((rooms => rooms.map(({ roomGroupId, roomGroupName }) => ({ id: roomGroupId, name: roomGroupName })))),
        shareReplay({ bufferSize: 1, refCount: true }),
    );

    readonly items$ = this.search$.pipe(
        startWith(''),
        switchMap(search =>
            this.rooms$.pipe(
                map(items =>
                    items
                        .filter(({ name }) => TUI_DEFAULT_MATCHER(name, search))
                        .map(({ id }) => id),
                ),
            ),
        ),
        startWith(null), // <-- loading
    );

    constructor(
        private _roomService: RoomService,
    ) {
        super();

    }

    public ngOnInit(): void {
        
    }

    readonly stringify$: Observable<
        TuiHandler<TuiContextWithImplicit<number> | number, string>
    > = this.rooms$.pipe(
        map(items => new Map(items.map<[number, string]>(({ id, name }) => [id, name]))),
        startWith(new Map()),
        map(
            map => (id: TuiContextWithImplicit<number> | number) =>
                (tuiIsNumber(id) ? map.get(id) : map.get(id.$implicit)) || 'Loading...',
        ),
    );

    onSearch(search: string | null): void {
        this.search$.next(search || '');
    }

    public deleteGroups(): void {
        forkJoin(
            this.control.value.map(i => {
                return this._roomService.deleteGroup(i);
            })
        )
        .subscribe({
            next: () => {
                this.cancel.next();
            }
        });
    }

}