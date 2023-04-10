import { Subject } from 'rxjs';
import { Directive } from '@angular/core';

@Directive()
export class ModalBaseComponent {
    public cancel: Subject<void> = new Subject<void>();
    public submit: Subject<any> = new Subject<any>();
    public initialize(...params: any[]): any {
        throw new Error('Not implemented');
    }
}