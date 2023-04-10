import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Directive } from '@angular/core';
import { IMessageComponent } from 'src/app/services/modals';

@Directive()
export class DefaultMessageComponent implements IMessageComponent {
    public title: string;
    public message: string;
    public css: string;
    public type: string = '';
    public close: Subject<boolean> = new Subject<boolean>();
    public opened: boolean = true;
    public isHideCloseBtn: boolean;

    constructor(protected router: Router) {
    }

    public onClickedExit(): void {
        this.closeLayer();
    }

    public closeLayer(): void {
        this.opened = false;
        setTimeout(() => {
            this.close.next(false);
        }, 500);
    }

    public toRoute(link: string): void {
        if (link) {
            this.opened = false;
            this.router.navigate([link]);
            setTimeout(() => {
                this.close.next(false);
            }, 500);
        }
    }
}
