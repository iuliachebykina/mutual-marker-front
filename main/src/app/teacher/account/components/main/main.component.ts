import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: 'main.component.html',
    styleUrls: ['./styles/layout.style.scss']
})
export class MainComponent extends FormBaseViewModel {
    constructor(
        private _route: Router,
    ) {
        super();
    }

    public toRegistration(): void {
        this._route.navigate(['teacher', 'registration']);
    }

    public toLogin(): void {
        this._route.navigate(['teacher', 'login']);
    }

    public switchStudent(): void {
        this._route.navigate(['student']);
    }

    public toRegistrationWithEmail(): void {
        if (!this.getControl('email').valid) {
            return;
        }

        this._route.navigate(['teacher', 'registration'], { state: { email: this.getFormValue('email') } });
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            email: new FormControl('', [
                Validators.email,
                Validators.required
            ])
        })
    }
}