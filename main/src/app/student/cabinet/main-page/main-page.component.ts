import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { IListItem } from "src/app/modules/button-dropdown/button-dropdown.component";
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
    public sortDown: boolean = true;
    public filterList: IListItem[] = [
        {
            value: 'byAlphabetOrder',
            text: 'По возрастанию'
        },
        {
            value: 'reverseAlphabetOrder',
            text: 'По убыванию'
        },
    ];
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

    public selectActionValue(value: string): void {
        switch (value) {
            case 'byAlphabetOrder':
                this.sortDown = true;
                this.sort();
                break;
            case 'reverseAlphabetOrder':
                this.sortDown = false;
                this.sort();
                break;
        }
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