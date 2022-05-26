import { Component } from "@angular/core";

@Component({
    templateUrl: './layout.component.html',
    styleUrls: ['./styles/layout.style.scss']
})
export class LayoutComponent {
    public currentComponent: string = CurrentComponent.login;

    public submitRegistration(): void {
        this.currentComponent = CurrentComponent.login;
    }
}

export enum CurrentComponent {
    login = 'login',
    registration = 'registration'
}