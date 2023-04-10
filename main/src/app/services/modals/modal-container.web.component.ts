import { Component, ComponentRef, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ContainerDirective } from './container.directive';
import { IModalContainer, IModalContainerOptions, AbSizeModal } from './modal-container.interface';


@Component({
    selector: "modal-container",
    templateUrl: "./modal-container.web.component.html",
})
export class ModalContainerWebComponent implements IModalContainer {
    @ViewChild(ContainerDirective, { static: true }) public container: ContainerDirective;
    @Output() public onClose = new EventEmitter<void>();

    public InnerComponent: ComponentRef<any>;
    public className: string;
    public HideClose: boolean;
    public OffOverlayClose: boolean;
    public OffCloseAll: boolean;
    public get viewContainerRef(): ViewContainerRef { return this.container.viewContainerRef; }
    public Visible: boolean;
    public disabledCalculatePosition: boolean = false;
    public size: string  = '';
    private _open: boolean;

    /** disabledCalculatePosition - отключает автоматический пересчёт позиции слоя*/
    public open(className?: string, options?: IModalContainerOptions): Promise<any> {
        this.setOptions(options);
        this.Visible = true;
        this._open = true;
        this.className = className || "";

        if (options && options.sizeModal) {
            this.size = this.getSize(options.sizeModal);
        }

        return Promise.resolve();
    }

    public setOptions(options?: IModalContainerOptions) {
        options = options ? options : {};
        this.HideClose = options.hideClose;
        this.OffOverlayClose = options.offOverlayClose;
        this.disabledCalculatePosition = options.disabledCalculatePosition;
        this.OffCloseAll = options.offCloseAll;
    }

    public close(): void {
        this.Visible = false;
    }

    public innerClose(): void {
        this.Visible = false;
        this.onClose.emit();
    }

    public complete(): void {
        if (this.InnerComponent) {
            this.viewContainerRef.clear();
            this.InnerComponent.destroy();
            this.InnerComponent = null;
        }
        this._open = false;
        this.onClose = new EventEmitter<void>();
    }

    private getSize(size: AbSizeModal): string {
        switch (size) {
            case 's':
                return 'modal_size-s';
            case 'm':
                return 'modal_size-m';
            case 'l':
                return 'modal_size-l';
            case 'xl':
                return 'modal_size-xl';
            default:
                return '';
        }

    }
}