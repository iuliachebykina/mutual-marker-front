import { Component, Input } from "@angular/core";

@Component({
    selector: 'accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./style/accordion.style.scss']
})
export class AccordionComponent {
    public isContentVisible: boolean = true;
    
    @Input()
    public title: string;
}