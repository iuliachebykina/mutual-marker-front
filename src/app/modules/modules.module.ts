import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PopupMenuComponent } from "./popup-menu/popup-menu.component";

@NgModule({
    declarations: [PopupMenuComponent],
    exports: [PopupMenuComponent],
    imports: [
        CommonModule,
    ]
})
export class ModulesModule {}