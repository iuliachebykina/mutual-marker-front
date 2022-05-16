import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subject, takeUntil } from "rxjs";
import { RoomService } from "src/app/services/room.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: './main-page.component.html',
    styleUrls: ['./styles/main-page.style.scss']
})
export class MainPageComponent extends FormBaseViewModel implements OnInit, OnDestroy {
    public allRooms$: Observable<any>;

    private _subjectDestroy$: Subject<void> = new Subject<void>();

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
        this._roomService.joinStudentToRoom(this.getFormValue('code')).subscribe();
    }

    public navigateToRoom(id: number): void {
        this._router.navigate(['cabinet', 'room', id]);
    }

    public ngOnInit(): void {
        this.allRooms$ = this._roomService.getRooms(0, 100)
            .pipe(
                takeUntil(this._subjectDestroy$)
            )
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            code: new FormControl('', [
                Validators.required,
            ]),
        })
    }
}