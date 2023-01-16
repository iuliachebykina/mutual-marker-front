import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalNotificationService } from "src/app/services/global-notification.service";
import { RoomService } from "src/app/services/room.service";
import { copyToClipboard } from "src/utils/clipboardCopy";

@Component({
    templateUrl: 'room-settings.component.html',
    styleUrls: ['styles/room-settings.style.scss']
})
export class RoomSettingsComponent implements OnInit {

    private _roomId: number;
    private _roomCode: string;

    constructor(
        private _roomService: RoomService,
        private _notificationService: GlobalNotificationService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }

    public ngOnInit(): void {
        this._activatedRoute.parent.params.subscribe({
            next: (param) => {
                this._roomId = param['id'];
            }
        });
        this._roomService.getRoomById(this._roomId)
            .subscribe({
                next: (r) => {
                    this._roomCode = r.code;
                }
            })
    }

    public deleteRoom(): void {
        this._roomService.deleteRoom(this._roomCode).subscribe({
            next: () => {
                this._router.navigate(['account/main']);
            }
        });
    }

    public copyCode(): void {
        copyToClipboard(this._roomCode);
        this._notificationService.subject$.next({
            status: 'success',
            text: 'Код комнаты скопирован'
        })
    }

    public copyLink(): void {
        copyToClipboard('https://' + document.location.hostname + ':' + document.location.port + '/cabinet/join?id=' + this._roomCode);
        this._notificationService.subject$.next({
            status: 'success',
            text: 'Ссылка скопирована'
        })
    }
}
