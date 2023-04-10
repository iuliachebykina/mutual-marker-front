import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContainerDirective } from './container.directive';
import { ModalContainerWebComponent } from './modal-container.web.component';
import { ModalLayoutWebComponent } from './modal-layout.web.component';
import { IModalService } from './modal.base.service';
import { ModalService } from './modal.service';
@NgModule({
    declarations: [ModalContainerWebComponent, ModalLayoutWebComponent, ContainerDirective],
    exports: [ModalContainerWebComponent, ModalLayoutWebComponent, ContainerDirective],
    imports: [BrowserModule, CommonModule]
})
export class ModalModule {
    public static forRoot(): ModuleWithProviders<ModalModule> {
        return {
            ngModule: ModalModule,
            providers: [{
                provide: IModalService, useClass: ModalService
            }]
        };
    }
}
