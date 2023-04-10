import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { TUI_DEFAULT_MATCHER, TuiHandler, TuiContextWithImplicit, tuiIsNumber, tuiIsString } from "@taiga-ui/cdk";
import { Subject, Observable, map, shareReplay, startWith, switchMap, forkJoin } from "rxjs";
import { ModalBaseComponent } from "src/app/services/modals";
import { RoomService } from "src/app/services/room.service";

interface IRoom {
    id: string;
    name: string;
}

@Component({
    templateUrl: 'delete-rooms.component.html',
    styleUrls: ['styles/delete-rooms.style.scss']
})
export class DeleteRoomsComponent extends ModalBaseComponent {
    public loading: boolean = false;
    private _onDestroy$: Subject<void> = new Subject<void>();
    private readonly search$ = new Subject<string>();
    readonly control = new FormControl([], [Validators.required]);

    public rooms$: Observable<IRoom[]> = this._roomService.getRoomsWithoutGroup(0, 100).pipe(
        map((rooms => rooms.map(({ code, title }) => ({ id: code, name: title })))),
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
        TuiHandler<TuiContextWithImplicit<string> | string, string>
    > = this.rooms$.pipe(
        map(items => new Map(items.map<[string, string]>(({ id, name }) => [id, name]))),
        startWith(new Map()),
        map(
            map => (id: TuiContextWithImplicit<string> | string) =>
                (tuiIsString(id) ? map.get(id) : map.get(id.$implicit)) || 'Loading...',
        ),
    );

    onSearch(search: string | null): void {
        this.search$.next(search || '');
    }

    public deleteGroups(): void {
        forkJoin(
            this.control.value.map(i => {
                return this._roomService.deleteRoom(i);
            })
        )
        .subscribe({
            next: () => {
                this.cancel.next();
            }
        });
    }
}