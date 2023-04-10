import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { ModalBaseComponent } from "src/app/services/modals";
import { RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: 'add-room.component.html',
    styleUrls: ['styles/add-room.style.scss']
})
export class AddRoomComponent extends ModalBaseComponent {
    public form: FormGroup;
    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
    ) {
        super();

    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            roomCode: new FormControl('', [
                Validators.required,
            ])
        })
    }

    public addRoom(): void {
        this._roomService.joinTeacherToRoom(this.form.controls['roomCode'].value)
            .subscribe({
                next: () => {
                    this.cancel.next();
                },
                error: () => {
                    this.form.controls['roomCode'].setValue('');
                }
            })
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
    }
}