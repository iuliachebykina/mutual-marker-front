import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { IModalContainer, IModalService } from "src/app/services/modals";
import { IBasicRoom, RoomService } from "src/app/services/room.service";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";
import { JoinRoomModalComponent } from "../room/join-room-modal/join-room-modal.component";

@Component({
    templateUrl: './main-page.component.html',
    styleUrls: ['./styles/main-page.style.scss'],
})
export class MainPageComponent extends FormBaseViewModel implements OnInit, OnDestroy {
    public allRooms: IBasicRoom[] = [];
    public filteredRooms: IBasicRoom[] = [];
    public notFoundRooms: boolean = false;
    private _subjectDestroy$: Subject<void> = new Subject<void>();
    public loading: boolean = true;
    constructor(
        private _roomService: RoomService,
        private _router: Router,
        private _modalService: IModalService
    ) {
        super();
    }

    public ngOnDestroy(): void {
        this._subjectDestroy$.next();
    }

    public joinRoom(code: string): void {
        this._roomService.joinStudentToRoom(code)
            .pipe(
                takeUntil(this._subjectDestroy$)
            )
            .subscribe({
                next: () => {
                    this.updateRoom();
                    this._modalService.showSuccess('Вы успешно добавились в комнату');
                },
                error: () => {
                    this._modalService.showError('Ошибка при добавлении в комнату');
                }
            });
    }

    public navigateToRoom(id: number): void {
        this._router.navigate(['cabinet', 'room', id]);
    }

    public ngOnInit(): void {
        this.updateRoom();
    }

    public filterItems(str: string): void {
        this.filteredRooms = this.allRooms.filter(item => item.title.toLowerCase().indexOf(str.toLowerCase()) > -1);
        this.notFoundRooms = this.filteredRooms.length ? false : true;
    }


    public updateRoom(): void {
        this._roomService.getRooms(0, 100)
            .pipe(
                takeUntil(this._subjectDestroy$)
            )
            .subscribe({
                next: (rooms) => {
                    this.allRooms = rooms;
                    this.filteredRooms = rooms;
                    this.loading = false;
                }
            })
    }

    public joinNewRoom(): void {
        const modal: IModalContainer = this._modalService.showModal(JoinRoomModalComponent);
        modal.InnerComponent.instance.cancel.subscribe({
            next: () => {
                modal.close();
            }
        });

        modal.InnerComponent.instance.submit.subscribe({
            next: (value: string) => {
                this.joinRoom(value);
                modal.close();
            }
        })
        modal.open();
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            code: new FormControl('', [
                Validators.required,
            ]),
        })
    }

}