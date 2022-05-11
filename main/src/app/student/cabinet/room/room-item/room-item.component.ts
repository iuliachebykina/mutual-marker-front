import { Component, Input } from "@angular/core";

@Component({
    selector: 'room-item',
    templateUrl: './room-item.component.html',
    styleUrls: ['./styles/room-item.style.scss']
})
export class RoomItemComponent {
    @Input()
    public title: string;

    @Input()
    public studentCount: number = 0;

    @Input()
    public roomCount: number;
}