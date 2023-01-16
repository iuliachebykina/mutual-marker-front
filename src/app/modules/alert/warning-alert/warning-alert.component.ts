import { Component, Input } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    templateUrl: './warning-alert.component.html',
    selector: 'warning-alert',
    styleUrls: ['./styles/warning-alert.style.scss']
})
export class WarningAlertComponent {

    @Input()
    public title: string;

    @Input()
    public description: string;
}