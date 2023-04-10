import { Component, Input } from "@angular/core";

@Component({
    selector: 'accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./style/accordion.style.scss']
})
export class AccordionComponent {

    @Input()
    public bold: boolean = false;
    
    @Input()
    public isContentVisible: boolean = true;
    
    @Input()
    public title: string;

    @Input()
    public empty: boolean = false;

    public show(): void {
        this.isContentVisible = !this.isContentVisible
    }
}