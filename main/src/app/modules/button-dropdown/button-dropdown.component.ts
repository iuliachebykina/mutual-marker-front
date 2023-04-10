import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    templateUrl: 'button-dropdown.component.html',
    selector: 'button-dropdown',
    styleUrls: ['styles/button.style.scss']
})
export class ButtonDropdownComponent {

    @Input()
    public textColor: string;

    @Input()
    public backgroundColor: string;

    @Input()
    public items: IListItem[];

    @Input()
    public width: string;

    @Input()
    public height: string;

    @Input()
    public text: string;

    public active: boolean;

    @Output()
    public eventValue: EventEmitter<string> = new EventEmitter<string>();

    public selectValue(value: string): void {
        this.eventValue.emit(value);
        this.active = false;
    }
}

export interface IListItem {
    value: string;
    text: string;
}