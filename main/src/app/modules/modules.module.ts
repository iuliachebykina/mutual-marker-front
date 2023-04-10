import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AccordionComponent } from "./accordion/accordion.component";
import { WarningAlertComponent } from "./alert/warning-alert/warning-alert.component";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { ButtonDropdownComponent } from "./button-dropdown/button-dropdown.component";
import { DefaultMessageWebComponent } from "./dialogs/message.web.component";
import { PopupMenuComponent } from "./popup-menu/popup-menu.component";
import { SkeletonComponent } from "./skeleton/skeleton.component";

@NgModule({
    declarations: [
        PopupMenuComponent,
        AccordionComponent,
        WarningAlertComponent,
        SkeletonComponent,
        ButtonDropdownComponent,
        BreadcrumbsComponent,
        DefaultMessageWebComponent
    ],
    exports: [
        PopupMenuComponent,
        AccordionComponent,
        WarningAlertComponent,
        SkeletonComponent,
        ButtonDropdownComponent,
        BreadcrumbsComponent,
        DefaultMessageWebComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ModulesModule { }