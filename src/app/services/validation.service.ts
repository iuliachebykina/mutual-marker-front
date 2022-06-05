import { Injectable } from "@angular/core";
import { AbstractControl, Validators } from "@angular/forms";

@Injectable()
export class ValidationService {
    public static checkFioFormat(field: AbstractControl): Validators | null {
        return field.value.toString().split(' ').length === 3
            ? null
            : {
                other: 'Неверный формат ФИО',
            };
    }

}