import { IModalContent } from './modal-content.interface';
import { IModalButton } from './modal-button.interface';

export interface IMessageComponent extends IModalContent {
    title: string;
    message: string;
    css: string;
    type?: string;
    isHideCloseBtn?: boolean;
    customButton?: IModalButton;
}
