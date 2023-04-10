import { ActionButton } from './action-button.interface';
import { IModalContent } from './modal-content.interface';

export interface IConfirmComponent extends IModalContent {
    title: string;
    message: string;
    okButton: ActionButton;
    cancelButton: ActionButton;
}
