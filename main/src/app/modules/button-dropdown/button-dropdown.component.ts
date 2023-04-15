import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";

@Component({
    templateUrl: 'button-dropdown.component.html',
    selector: 'button-dropdown',
    styleUrls: ['styles/button.style.scss']
})
export class ButtonDropdownComponent {
    isMouseOver = false;
    isContentMouseOver = false;


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

    isOpen = false;
    @ViewChild('dropdown') dropdown: ElementRef;

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    onMouseEnter() {
        this.isOpen = true;
    }

    onMouseLeave() {
        this.isOpen = false;
    }

    onMouseEnterContent() {
        this.isOpen = true;
    }

    onMouseLeaveContent() {
        this.isContentMouseOver = false;
        if (!this.isMouseOver) {
            this.isOpen = false;
        }
    }



    @HostListener('document:click', ['$event.target'])
    onClick(targetElement) {
        const clickedInside = this.dropdown.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.isOpen = false;
        }
    }

}

export interface IListItem {
    value: string;
    text: string;
}