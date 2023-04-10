import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['./styles/layout.style.scss']
})
export class MainComponent {
    constructor(
        private _route: Router,
    ) {
    }

    public toRegistration(): void {
        this._route.navigate(['student', 'registration']);
    }

    public toLogin(): void {
        this._route.navigate(['student', 'login']);
    }

    public switchToTeacher(): void {
        this._route.navigate(['teacher']);
    }
}