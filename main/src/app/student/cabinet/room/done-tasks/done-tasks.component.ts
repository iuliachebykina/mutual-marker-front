import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { RoomService } from "src/app/services/room.service";
import { UserBaseService } from "src/app/services/user.base.service";

@Component({
    templateUrl: 'done-tasks.component.html',
    styleUrls: ['styles/done-tasks.style.scss']
})
export class DoneTasksComponent implements OnInit {
    public feedbacks: Observable<any[]>;

    constructor(
        private _roomService: RoomService,
        private _activatedRoute: ActivatedRoute,
        private _userService: UserBaseService
    ) { }

    public ngOnInit(): void {
        this._userService.getUserProfile().subscribe({
            next: (profile) => {
                this.feedbacks = this._activatedRoute.parent.params
                .pipe(
                    switchMap((id) => {
                        return this._roomService.getAllFeedbacks(id['id'], profile.id)
                    })
                )
            }
        });

        
    }
}