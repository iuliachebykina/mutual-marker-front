import { IModalContainer } from './modal-container.interface';
import { IViewContainerRef } from './view-container.interface';

export interface IHasModal {
    dialogAncor: IViewContainerRef;
    modalContainer?: IModalContainer;
    /** для подтверждения отдельный слой */
    modalConfirmContainer?: IModalContainer;
}