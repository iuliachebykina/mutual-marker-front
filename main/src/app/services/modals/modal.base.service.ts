import { ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';
import { ActionButton } from './action-button.interface';
import { IMessageComponent } from './message-component.interface';
import { IModalContainer } from './modal-container.interface';
import { ModalBaseComponent } from './modal.base.component';

export abstract class IModalService {

    public abstract set componentFactoryResolver(value: ComponentFactoryResolver);

    public abstract set IsOpenModal(value: boolean);
    
    public abstract get IsOpenModal();

    public abstract get InnerComponentInstanse();

    public initialize(...params: any[]): void {
        throw new Error('Not implemented');
    }

    public abstract showLayer<T>(dialogType: Type<T>, ...params: any[]): any;

    public abstract showModal<T extends ModalBaseComponent>(componentType: Type<T>, ...params: any[]): IModalContainer;

    public abstract showInfo(message: string);

    public abstract showStatic(message: string, title?: string): ComponentRef<IMessageComponent>;

    public abstract showSuccess(message: string);

    public abstract showError(message: string);

    public abstract showConfirm(title: string, okButton: ActionButton, cancelButton?: ActionButton, message?: string, css?: string, loading?: boolean, isCancelBtnLink?: boolean): IModalContainer;

    public abstract closeAll(): Promise<any>;
}
