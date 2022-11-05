import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { RoomService } from "src/app/services/room.service";
import { UserBaseService } from "src/app/services/user.base.service";
import { IUser } from "src/app/student/account/interfaces/user-registration.interface";

@Component({
    templateUrl: './room-members.component.html',
    styleUrls: ['./styles/room-members.style.scss']
})
export class RoomMembersComponent implements OnInit {
    public roomId: string;
    public user$: Observable<IUser>;
    public students: IUser[];
    public studentView: IUser;

    constructor(
        private _userBaseService: UserBaseService,
        private _roomService: RoomService,
        private _activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this._activatedRoute.parent.params.subscribe({
            next: (param) => {
                this.roomId = param['id'];
            }
        });

        this.user$ = this._userBaseService.getUser();
        this._roomService.getStudentsByRoomId(this.roomId, 0, 1000)
            .subscribe({
                next: (s) => {
                    this.students = s;
                }
            })
    }

    public openStudentInfo(student: IUser): void {
        this.studentView = student;
    }

    public closeModal(): void {
        this.studentView = null;
    }
}