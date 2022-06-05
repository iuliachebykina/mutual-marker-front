import { ChangeDetectorRef, Component } from "@angular/core";
import { getFadeInAnimation } from "../animation";

@Component({
    selector: 'popup-menu',
    templateUrl: './popup-menu.component.html',
    styleUrls: ['./style/popup-menu.style.scss'],
    animations: [getFadeInAnimation()],
})
export class PopupMenuComponent {
    public visible: boolean = false;

    public onMouseOver(): void {
        this.visible = true;
    }

    public onMouseLeave(): void {
        this.visible = false;
    }
}