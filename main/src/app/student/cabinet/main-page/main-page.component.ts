import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FormBaseViewModel } from "src/libraries/form-base-view-model";

@Component({
    templateUrl: './main-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./styles/main-page.style.scss']
})
export class MainPageComponent extends FormBaseViewModel {

    protected override getControls(): FormGroup {
        return new FormGroup({
            code: new FormControl('', [
                Validators.required,
            ]),
        })
    }
}