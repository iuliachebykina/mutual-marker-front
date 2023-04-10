import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['./styles/layout.style.scss']
})
export class MainComponent {
    constructor(
        private _route: Router,
    ) { }

    public toRegistration(): void {
        this._route.navigate(['teacher', 'registration']);
    }

    public toLogin(): void {
        this._route.navigate(['teacher', 'login']);
    }

    public switchStudent(): void {
        this._route.navigate(['student']);
    }
}