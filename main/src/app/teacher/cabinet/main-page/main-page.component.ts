import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, Subject, takeUntil } from "rxjs";
import { IListItem } from "src/app/modules/button-dropdown/button-dropdown.component";
import { IModalContainer } from "src/app/services/modals";
import { IModalService } from "src/app/services/modals/modal.base.service";
import { IBasicRoom, IGroup, RoomService } from "src/app/services/room.service";
import { AddRoomToGroupComponents } from "../room/add-room-to-group/add-room-to-group.component";
import { AddRoomComponent } from "../room/add-room/add-room.component";
import { CreateRoomComponent } from "../room/create-room/create-room.component";
import { DeleteRoomsComponent } from "../room/delete-rooms/delete-rooms.component";
import { RoomGroupDeleteComponent } from "../room/room-group-delete/room-group-delete.component";
import { RoomGroupComponent } from "../room/room-group/room-group.component";

@Component({
    templateUrl: './main-page.component.html',
    styleUrls: ['./styles/main-page.style.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
    public allRooms: IBasicRoom[] = [];
    public allGroups: IGroup[] = [];
    public filteredRooms: IBasicRoom[] = [];
    public filteredGroups: IGroup[] = [];
    public sortDown: boolean = true;
    public notFoundRooms: boolean = false;
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
    public buttonList: IListItem[] = [
        {
            value: 'create',
            text: 'Создать комнату'
        },
        {
            value: 'delete',
            text: 'Удалить комнату'
        },
        {
            value: 'addRoom',
            text: 'Добавить комнату по коду'
        },
        {
            value: 'addRoomToGroup',
            text: 'Добавить комнату в группу',
        },
        {
            value: 'newGroup',
            text: 'Новая группа комнат'
        },
        {
            value: 'deleteGroup',
            text: 'Удалить группу комнат'
        },
    ];
    public loading: boolean = true;
    private _subjectDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _roomService: RoomService,
        private _router: Router,
        private _modalService: IModalService
    ) { }

    public createRoom(): void {
        this._router.navigate(['account', 'create']);
    }

    public toDetails(id: number): void {
        this._router.navigate(['account', 'room', id])
    }


    public navigateToRoom(id: number): void {
        this._router.navigate(['account', 'room', id]);
    }

    public selectActionValue(value: string): void {
        switch (value) {
            case 'create':
                const modal: IModalContainer = this._modalService.showModal(CreateRoomComponent);
                modal.InnerComponent.instance.cancel.subscribe({
                    next: () => {
                        modal.close();
                    }
                });
                modal.InnerComponent.instance.submit.subscribe({
                    next: () => {
                        this.getRooms();
                        modal.close();
                    }
                })
                modal.open();
                break;
            case 'newGroup':
                const modalNewGroup: IModalContainer = this._modalService.showModal(RoomGroupComponent);
                modalNewGroup.InnerComponent.instance.cancel.subscribe({
                    next: () => {
                        modalNewGroup.close();
                        this.getRooms();
                    }
                });
                modalNewGroup.open();
                break;
            case 'deleteGroup':
                const modalDeleteGroup: IModalContainer = this._modalService.showModal(RoomGroupDeleteComponent);
                modalDeleteGroup.InnerComponent.instance.cancel.subscribe({
                    next: () => {
                        modalDeleteGroup.close();
                        this.getRooms();
                    }
                });
                modalDeleteGroup.open();
                break;
            case 'addRoom':
                const modalAddRoom: IModalContainer = this._modalService.showModal(AddRoomComponent);
                modalAddRoom.InnerComponent.instance.cancel.subscribe({
                    next: () => {
                        modalAddRoom.close();
                        this.getRooms();
                    }
                });
                modalAddRoom.open();
                break;
            case 'delete':
                const modalDeleteRoom: IModalContainer = this._modalService.showModal(DeleteRoomsComponent);
                modalDeleteRoom.InnerComponent.instance.cancel.subscribe({
                    next: () => {
                        modalDeleteRoom.close();
                        this.getRooms();
                    }
                });
                modalDeleteRoom.open();
                break;
            case 'addRoomToGroup':
                const modalAddRoomToGroup: IModalContainer = this._modalService.showModal(AddRoomToGroupComponents);
                modalAddRoomToGroup.InnerComponent.instance.cancel.subscribe({
                    next: () => {
                        modalAddRoomToGroup.close();
                        this.getRooms();
                    }
                });
                modalAddRoomToGroup.open();
                break;
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

    public ngOnInit(): void {
        this.getRooms();
    }


    public ngOnDestroy(): void {
        this._subjectDestroy$.next();
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

    public filterItems(str: string): void {
        this.filteredRooms = this.allRooms.filter(item => item.title.toLowerCase().indexOf(str.toLowerCase()) > -1);
        this.filteredGroups = this.allGroups.filter(item => item.roomGroupName.toLowerCase().indexOf(str.toLowerCase()) > -1);
        this.notFoundRooms = this.filteredRooms.length || this.filteredGroups.length ? false : true;
    }

    private getRooms(): void {
        forkJoin([
            this._roomService.getRoomsWithoutGroup(0, 100),
            this._roomService.getGroups(0, 100)
        ])
            .pipe(
                takeUntil(this._subjectDestroy$)
            )
            .subscribe({
                next: ([rooms, groups]) => {
                    this.allRooms = rooms;
                    this.filteredRooms = rooms;
                    this.allGroups = groups;
                    this.filteredGroups = groups;
                    this.loading = false;
                }
            })
    }
 
}