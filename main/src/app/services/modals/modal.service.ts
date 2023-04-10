import { ClassProvider, ComponentFactory, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, NgModuleRef, Type, ViewContainerRef } from '@angular/core';
import { ActionButton } from './action-button.interface';
import { IHasModal } from './has-modal.interface';
import { IModalContainer } from './modal-container.interface';
import { IModalContent } from './modal-content.interface';
import { ModalBaseComponent } from './modal.base.component';
import { IModalService } from './modal.base.service';

@Injectable()
export class ModalService extends IModalService {

    public set componentFactoryResolver(_cfr: ComponentFactoryResolver) {
        this._componentFactoryResolver = _cfr;
    }

    public set IsOpenModal(value: boolean) {
        this._isOpenModal = value;
    }

    public get IsOpenModal(): boolean {
        return this._isOpenModal;
    }

    public get InnerComponentInstanse(): ModalBaseComponent {
        return this._modalComponent.InnerComponent ? this._modalComponent.InnerComponent.instance : null;
    }

    private _rootComponent: IHasModal;
    private _dialogInstance: ComponentRef<any>;
    private _messageComponentType: Type<IMessageComponent>;
    private _confirmComponentType: Type<ModalBaseComponent>;
    private _modalComponent: IModalContainer;
    private _dialogAncor: ViewContainerRef;
    /** для подтверждения отдельный слой */
    private _modalConfirmComponent: IModalContainer;

    private _autoClose: boolean;
    private _componentFactoryResolver: ComponentFactoryResolver;

    private _initialized: boolean = false;
    private _isOpenModal: boolean;

    constructor(@Inject(ComponentFactoryResolver) private _cfr: any) {
        super();
        this._componentFactoryResolver = _cfr;
    }

    public override initialize(messageComponentType: Type<IMessageComponent>, confirmComponentType: Type<ModalBaseComponent>, rootComponent: IHasModal, autoClose: boolean = true): void {
        this._messageComponentType = messageComponentType;
        this._confirmComponentType = confirmComponentType;
        this._rootComponent = rootComponent;
        this._modalComponent = rootComponent.modalContainer;
        this._modalConfirmComponent = rootComponent.modalConfirmContainer;
        if (rootComponent.dialogAncor) {
            this._dialogAncor = rootComponent.dialogAncor.viewContainerRef;
        }

        this._initialized = true;
        this._autoClose = autoClose;
    }

    public closeAll(): Promise<any> {
        if (this._dialogInstance) {
            this._dialogInstance.destroy();
            this._dialogInstance = null;
        }
        if (!this._modalComponent.OffCloseAll) {
            this._modalComponent.close();
            this._dialogAncor.clear();
            this.IsOpenModal = false;
            if (this._modalConfirmComponent) {
                this._modalConfirmComponent.close();
            }
        }

        return Promise.resolve();
    }

    public showError(error: string, title?: string, css?: string): ComponentRef<IMessageComponent> {
        let message: string = error || 'Сервис временно недоступен. Попробуйте позже.';
        this.IsOpenModal = true;
        
        const dialog: ComponentRef<IMessageComponent> = this.showLayer(this._messageComponentType);
        if (dialog) {
            const instance: IMessageComponent = dialog.instance as IMessageComponent;
            instance.title = title || 'Операция не удалась';
            instance.message = message;
            instance.css = css || 'isError';
            instance.type = 'error';
            instance.close.subscribe((): void => {
                this.IsOpenModal = false;
            });
            if (this._autoClose) {
                window.setTimeout(() => {
                    if (typeof instance.closeLayer === 'function') { instance.closeLayer(); }
                    else { instance.close.next(true); }
                }, 5000);
            }
        }

        return dialog;
    }


    public showLayer<T>(dialogType: Type<T>): ComponentRef<T> {
        if (this._initialized) {
            this._dialogInstance = this.create(
                dialogType,
                this._dialogAncor
            );
        } else {
            this._dialogInstance = null;
        }

        return this._dialogInstance as ComponentRef<T>;
    }

    public showModal<T extends ModalBaseComponent>(componentType: Type<T>, param?: IModalParams): IModalContainer {
        this.IsOpenModal = true;
        if (!this._modalComponent) {
            return null;
        }
        let component: ComponentRef<T>;
        if (param?.componentParams) {
            component = this.createWithoutFactory<T>(componentType, this._modalComponent.viewContainerRef, param?.componentParams);
        } else {
            component = this.create<T>(componentType, this._modalComponent.viewContainerRef);
        }
        this._modalComponent.InnerComponent = component;
        this._modalComponent.onClose
            .subscribe(() => {
                this.IsOpenModal = false;
            });

        component.instance.cancel.subscribe(() => {
            this._modalComponent.close();
            this.IsOpenModal = false;
        });
        this._modalComponent.InnerComponent.instance.submit.subscribe(() => {
            this.IsOpenModal = false;
        });

        return this._modalComponent;
    }

    /**
     * Новая версия метода создания компонента, если в компоненте есть зависимости, нужно прокидывать либо через
     * ngModuleRef, либо через injector
     * */
    public createWithoutFactory<T>(dialogType: Type<T>, viewContainer: ViewContainerRef, params: IComponentParams): ComponentRef<T> {
        viewContainer.clear();

        let injector: Injector;

        if (params) {
            let providers: ClassProvider[] = [];

            if (params.dependencies) {
                providers = params.dependencies.map((dependency: Type<any>) => {
                    return { provide: dependency, useClass: dependency };
                });
            }

            if (params.injector) {
                injector = Injector.create({
                    providers: providers,
                    parent: params.injector
                });
            }
        }

        return viewContainer.createComponent(dialogType, {
            index: params?.index,
            injector: injector,
            ngModuleRef: params?.ngModuleRef,
            projectableNodes: params?.projectableNodes,
        });
    }

    public showConfirmModal<T extends ModalBaseComponent>(componentType: Type<T>): IModalContainer {
        this.IsOpenModal = true;
        if (!this._modalConfirmComponent && !this._modalComponent) {
            return null;
        }
        const modal: IModalContainer = this._modalConfirmComponent || this._modalComponent;
        const component: ComponentRef<T> = this.create<T>(componentType, modal.viewContainerRef);
        modal.InnerComponent = component;
        modal.onClose
            .subscribe(() => {
                this.IsOpenModal = false;
            });

        return modal;
    }

    public showAttention(message: string): ComponentRef<IMessageComponent> {
        const dialog: ComponentRef<IMessageComponent> = this.showLayer(this._messageComponentType);
        this.IsOpenModal = true;
        if (dialog) {
            const instance: IMessageComponent = dialog.instance as IMessageComponent;
            instance.title = 'Обратите внимание';
            instance.message = message;
            instance.css = 'isAttention';
            instance.type = 'attention';
            instance.close.subscribe((res: boolean): void => {
                this.IsOpenModal = false;
            });
            if (this._autoClose) {
                window.setTimeout(() => {
                    if (typeof instance.closeLayer === 'function') { instance.closeLayer(); }
                    else { instance.close.next(true); }
                }, 3000);
            }
        }

        return dialog;
    }

    public showInfo(message: string): ComponentRef<IMessageComponent> {
        const dialog: ComponentRef<IMessageComponent> = this.showLayer(this._messageComponentType);
        this.IsOpenModal = true;
        if (dialog) {
            const instance: IMessageComponent = dialog.instance as IMessageComponent;
            instance.title = 'Новое сообщение от Банка';
            instance.message = message;
            instance.css = 'isInfo';
            instance.type = 'default';
            instance.close.subscribe((res: boolean): void => {
                this.IsOpenModal = false;
            });
            if (this._autoClose) {
                window.setTimeout(() => {
                    if (typeof instance.closeLayer === 'function') { instance.closeLayer(); }
                    else { instance.close.next(true); }
                }, 3000);
            }
        }

        return dialog;
    }

    public showStatic(message: string, title?: string): ComponentRef<IMessageComponent> {
        const dialog: ComponentRef<IMessageComponent> = this.showLayer(this._messageComponentType);
        this.IsOpenModal = true;
        if (dialog) {
            const instance: IMessageComponent = dialog.instance as IMessageComponent;
            instance.title = title ? title : message;
            instance.message = title ? message : '';
            instance.css = 'isStatic';
            instance.type = 'loading';
            instance.isHideCloseBtn = true;
            instance.close.subscribe((res: boolean): void => {
                this.IsOpenModal = false;
            });
        }

        return dialog;
    }

    public showSuccess(message: string, title: string = 'Операция прошла успешно'): ComponentRef<IMessageComponent> {
        const dialog: ComponentRef<IMessageComponent> = this.showLayer(this._messageComponentType);
        this.IsOpenModal = true;
        if (dialog) {
            const instance: IMessageComponent = dialog.instance as IMessageComponent;
            instance.title = title;
            instance.message = message;
            instance.css = 'isSuccess';
            instance.type = 'success';
            instance.close.subscribe((res: boolean): void => {
                this.IsOpenModal = false;
            });
            if (this._autoClose) {
                window.setTimeout(() => {
                    if (typeof instance.closeLayer === 'function') { instance.closeLayer(); }
                    else { instance.close.next(true); }
                }, 3000);
            }
        }

        return dialog;
    }

    public showConfirm(title: string, okButton: ActionButton, cancelButton?: ActionButton, message?: string, css?: string, loading?: boolean, isCancelBtnLink?: boolean): IModalContainer {
        const modal: IModalContainer = this.showConfirmModal(this._confirmComponentType);
        const component: ModalBaseComponent = modal.InnerComponent.instance;
        component.initialize(title, okButton, cancelButton, message, loading, isCancelBtnLink);
        modal.open(css);
        component.cancel.subscribe(() => {
            modal.close();
            this.IsOpenModal = false;
        });

        return modal;
    }

    public create<T>(dialogType: Type<T>, viewConatiner: ViewContainerRef): ComponentRef<T> {
        viewConatiner.clear();
        const factory: ComponentFactory<T> = this._componentFactoryResolver.resolveComponentFactory<T>(dialogType);
        const dialogComponent: ComponentRef<T> = viewConatiner.createComponent(factory);

        return dialogComponent;
    }
}

/**
 * Параметры модалки
 * */
export interface IModalParams {
    isConfirm?: boolean;
    isHint?: boolean;
    isService?: boolean;
    isPinCode?: boolean;
    [key: string]: any;
    componentParams: IComponentParams;

}

/**
 * Параметры компоненты, вызываемой внутри модалки
 * @property injector - инжектор, который получен
 * @property dependencies - Зависимости (провайдеры), которые требуются компоненте
 * */
export interface IComponentParams {
    index?: number;
    injector?: Injector;
    ngModuleRef?: NgModuleRef<unknown>;
    projectableNodes?: Node[][];
    dependencies?: Array<Type<any>>
}

export interface IMessageComponent extends IModalContent {
    title: string;
    message: string;
    css: string;
    type?: string;
    isHideCloseBtn?: boolean;
}