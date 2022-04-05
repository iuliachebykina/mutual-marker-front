import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/login.style.scss']
})
export class LoginComponent extends FormBaseViewModel {

    public submitForm(): void {
        //TODO
    }

    protected override getControls(): FormGroup {
        return new FormGroup({
            testValue: new FormControl('', [
                Validators.required,
            ]),
            passwordValue: new FormControl('', [
                Validators.required,
            ])
        })
    }

}