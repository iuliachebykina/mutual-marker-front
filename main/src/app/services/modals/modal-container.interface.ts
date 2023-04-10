import { IViewContainerRef } from './view-container.interface';
import { Observable } from 'rxjs';
import { ModalBaseComponent } from './modal.base.component';

export interface IModalContainer extends IViewContainerRef {
    /** Текущий компонент, помещенный в контейнер модального окна */
    InnerComponent: IModaIinstance;
    onClose: Observable<any>;
    OffCloseAll?: boolean;
    open(className?: string, options?: IModalContainerOptions): Promise<any>;
    setOptions?(options?: IModalContainerOptions);
    close();
}
export interface IModaIinstance {
    instance: ModalBaseComponent;
    component?: any;
}

export interface IModalContainerOptions {
    /** скрыть крестик */
    hideClose?: boolean;
    /** отключает закрытие слоя по клику вне окна */
    offOverlayClose?: boolean;
    /** отключает закрытие слоя при вызове метода closeAll в modalService */
    offCloseAll?: boolean;
    /** отключает автоматический пересчёт позиции слоя*/
    disabledCalculatePosition?: boolean;
    sizeModal?: AbSizeModal;
}

export type AbSizeModal = 's' | 'm' | 'l' | 'xl';