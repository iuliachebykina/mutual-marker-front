import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { tuiLoaderOptionsProvider } from "@taiga-ui/core";
import { Observable, Subject, takeUntil } from "rxjs";
import { IBasicRoom, RoomService } from "src/app/services/room.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: './main-page.component.html',
    styleUrls: ['./styles/main-page.style.scss'],
    providers: [
        tuiLoaderOptionsProvider({
            size: 'xl',
            inheritColor: false,
            overlay: true,
        }),
    ],
})
export class MainPageComponent extends FormBaseViewModel implements OnInit, OnDestroy {
    public allRooms: IBasicRoom[] = [];
    private _subjectDestroy$: Subject<void> = new Subject<void>();
    public loading: boolean = true;
    constructor(
        private _roomService: RoomService,
        private _router: Router
    ) {
        super();
        document.querySelector('body').style.background = "#fff";
    }

    public ngOnDestroy(): void {
        this._subjectDestroy$.next();
    }

    public joinRoom(): void {
        this._roomService.joinStudentToRoom(this.getFormValue('code'))
            .pipe(
                takeUntil(this._subjectDestroy$)
            )
            .subscribe(() => this.updateRoom());
    }

    public navigateToRoom(id: number): void {
        this._router.navigate(['cabinet', 'room', id]);
    }

    public ngOnInit(): void {
        this.updateRoom();
    }

    public updateRoom(): void {
        this._roomService.getRooms(0, 100)
            .pipe(
                takeUntil(this._subjectDestroy$)
            )
            .subscribe({
                next: (rooms) => {
                    this.allRooms = rooms;
                    this.loading = false;
                }
            })
    }

    public joinNewRoom(): void {
        this._router.navigate(['cabinet', 'join']);
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            code: new FormControl('', [
                Validators.required,
            ]),
        })
    }

}