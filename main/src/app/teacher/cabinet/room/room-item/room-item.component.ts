import { Component, Input } from "@angular/core";

@Component({
    templateUrl: './room-item.component.html',
    selector: 'room-item',
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