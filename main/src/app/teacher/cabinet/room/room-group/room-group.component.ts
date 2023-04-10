import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TuiContextWithImplicit, TuiHandler, tuiIsNumber, TUI_DEFAULT_MATCHER } from "@taiga-ui/cdk";
import { map, Observable, shareReplay, startWith, Subject, switchMap } from "rxjs";
import { ModalBaseComponent } from "src/app/services/modals";
import { IGroup, RoomService } from "src/app/services/room.service";

interface IRoom {
    readonly id: number;
    readonly name: string;
}

@Component({
    templateUrl: 'room-group.component.html',
    styleUrls: ['styles/room-group.style.scss']
})
export class RoomGroupComponent extends ModalBaseComponent {
    public form: FormGroup;
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

    public ngOnInit(): void {
        this.form = new FormGroup({
            projectName: new FormControl('', [
                Validators.required,
            ])
        });
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

    public createGroup(name: string): Observable<IGroup> {
        return this._roomService.createGroup(name);
    }

    public putRoomsToGroup(): void {
        this.createGroup(this.form.get('projectName').value)
            .pipe(
                //переделать потом чтобы можно было несколько комнат добавлять
                switchMap(group => {
                    return this._roomService.putRoomsToGroup(this.control.value[0] + '', group.roomGroupId + '')
                })
            )
            .subscribe({
                next: () => {
                    this.cancel.next();
                }
            });
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }
}