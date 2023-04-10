import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { TUI_DEFAULT_MATCHER, TuiHandler, TuiContextWithImplicit, tuiIsString, tuiPure, TuiStringHandler, tuiIsNumber } from "@taiga-ui/cdk";
import { Subject, Observable, map, shareReplay, startWith, switchMap, forkJoin } from "rxjs";
import { ModalBaseComponent } from "src/app/services/modals";
import { RoomService } from "src/app/services/room.service";

interface IRoom {
    id: number;
    name: string;
}

interface IGroup {
    readonly id: number;
    readonly name: string;
}


@Component({
    templateUrl: 'add-room-to-group.component.html',
    styleUrls: ['styles/add-room-to-group.style.scss']
})
export class AddRoomToGroupComponents extends ModalBaseComponent {
    public loading: boolean = false;
    private _onDestroy$: Subject<void> = new Subject<void>();
    private readonly search$ = new Subject<string>();
    readonly control = new FormControl([], [Validators.required]);

    public rooms$: Observable<IRoom[]> = this._roomService.getRoomsWithoutGroup(0, 100).pipe(
        map((rooms => rooms.map(({ id, title }) => ({ id, name: title })))),
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

    value;
 
    // Server request for items imitation
    readonly itemsGroups$ = this._roomService.getGroups(0, 100).pipe(
        map((rooms => rooms.map(({ roomGroupId, roomGroupName }) => ({ id: roomGroupId, name: roomGroupName })))),
        shareReplay({ bufferSize: 1, refCount: true }),
    );
 
    @tuiPure
    stringify(
        items: readonly IGroup[],
    ): TuiStringHandler<TuiContextWithImplicit<number>> {
        const map = new Map(items.map(({id, name}) => [id, name] as [number, string]));
 
        return ({$implicit}: TuiContextWithImplicit<number>) => map.get($implicit) || '';
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
            this.control.value.map((i) => {
                return this._roomService.putRoomsToGroup(i, this.value)
            })
        )
        .subscribe({
            next: () => {
                this.cancel.next();
            }
        });
    }
}