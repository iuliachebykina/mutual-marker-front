import { Directive, OnInit } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

@Directive()
export abstract class FormBaseViewModel {

    public controlsGroup!: FormGroup;

    constructor() {
        this.controlsGroup = this.getControls();
    }

    /**
     * получаем контрол по имени
     * @param controlName имя контрола
     * @returns контрол если такой есть
     */
    public getControl(controlName: string): AbstractControl | null {
        const name = Object.keys(this.controlsGroup.controls).find(name => name === controlName);

        return name ? this.controlsGroup.controls[name] : null;
    }

    /**
     * получаем текущее значение по имени контрола
     * @param controlName имя контрола
     * @returns текущее значение контрола
     */
    public getFormValue(controlName: string): string {
        return this.getControl(controlName)?.value?.toString();
    }

    /**
     * метод для установки значения в контрол
     * @param controlName имя
     * @param value значение
     */
    public setFormValue(controlName: string, value: string): void {
        return this.getControl(controlName)?.setValue(value);
    }

    protected getControls(): FormGroup {
        throw new Error('');
    }
}