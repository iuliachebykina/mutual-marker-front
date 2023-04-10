import { Subject } from 'rxjs';

export interface IModalContent {
    close: Subject<boolean>;
    closeLayer?: () => void;
}