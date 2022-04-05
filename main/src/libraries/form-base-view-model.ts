import { Directive, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Directive()
export abstract class FormBaseViewModel implements OnInit {

    public controlsGroup: FormGroup;

    public ngOnInit(): void {
        this.controlsGroup = this.getControls();
    }

    protected getControls(): FormGroup {
        throw new Error('');
    }
}