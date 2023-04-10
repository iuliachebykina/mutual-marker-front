import { Directive, ViewContainerRef } from '@angular/core';


@Directive({
    selector: '[container]'
})
export class ContainerDirective implements IViewContainerRef {

    constructor(public viewContainerRef: ViewContainerRef) {
    }
}

export interface IViewContainerRef {
    viewContainerRef?: ViewContainerRef;
}