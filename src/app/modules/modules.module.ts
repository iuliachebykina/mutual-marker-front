import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionComponent } from "./accordion/accordion.component";
import { PopupMenuComponent } from "./popup-menu/popup-menu.component";

@NgModule({
    declarations: [PopupMenuComponent, AccordionComponent],
    exports: [PopupMenuComponent, AccordionComponent],
    imports: [
        CommonModule,
    ]
})
export class ModulesModule {}