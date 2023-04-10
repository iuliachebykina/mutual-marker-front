import { Component } from "@angular/core";
import { ModalBaseComponent } from "src/app/services/modals";
import { RoomService } from "src/app/services/room.service";

@Component({
    templateUrl: 'leave-room.component.html',
    styleUrls: ['styles/leave-room.style.scss']
})
export class LeaveRoomComponent extends ModalBaseComponent {

    public roomId: string = '';

    constructor(private _roomService: RoomService) {
        super();
    }

    public override initialize(roomId: string) {
        this.roomId = roomId;
    }

    public leaveRoom(): void {
        this._roomService.leaveRoomAsStudent(this.roomId).subscribe({
            next: () => {
                this.cancel.next();
            }
        })
    }


}