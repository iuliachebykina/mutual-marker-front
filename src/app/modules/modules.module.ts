import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionComponent } from "./accordion/accordion.component";
import { WarningAlertComponent } from "./alert/warning-alert/warning-alert.component";
import { PopupMenuComponent } from "./popup-menu/popup-menu.component";

@NgModule({
    declarations: [PopupMenuComponent, AccordionComponent, WarningAlertComponent],
    exports: [PopupMenuComponent, AccordionComponent, WarningAlertComponent],
    imports: [
        CommonModule,
    ]
})
export class ModulesModule {}