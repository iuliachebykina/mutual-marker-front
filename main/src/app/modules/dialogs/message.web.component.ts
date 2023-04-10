import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultMessageComponent } from './message.component';

@Component({
    selector: 'dlg',
    templateUrl: './message.web.component.html',
    styleUrls: ['./styles/message.web.component.scss']
})
export class DefaultMessageWebComponent extends DefaultMessageComponent {

    constructor(router: Router) {
        super(router);
    }
}
