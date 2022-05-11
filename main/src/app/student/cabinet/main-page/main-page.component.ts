import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, Subject, takeUntil } from "rxjs";
import { RoomService } from "src/app/services/room.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: './main-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/main-page.style.scss']
})
export class MainPageComponent extends FormBaseViewModel implements OnInit, OnDestroy {
    public allRooms$: Observable<any>;

    private _subjectDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService
    ) {
        super();
    }

    public ngOnDestroy(): void {
        this._subjectDestroy$.next();
    }

    public joinRoom(): void {
        this._roomService.joinStudentToRoom(this.getFormValue('code')).subscribe();
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