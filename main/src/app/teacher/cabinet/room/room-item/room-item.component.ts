import { Component, Input, OnInit } from "@angular/core";
import { RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: './room-item.component.html',
    selector: 'room-item',
    styleUrls: ['./styles/room-item.style.scss']
})
export class RoomItemComponent implements OnInit {

    @Input()
    public title: string;

    @Input()
    public studentCount: number = 0;

    @Input()
    public roomCount: number;

    constructor(
        private _roomService: RoomService
    ) {}

    public ngOnInit(): void {
        // this._roomService.getStudentsByRoomId(this.roomCount, 0, 1000).subscribe();
    }
}