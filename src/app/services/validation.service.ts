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

    public static checkDeadline(field: AbstractControl): Validators | null {
        if (field.value && !(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/).exec(field.value)) {
            return {
                other: 'Неверный формат',
            }
        } else if (new Date(field.value) && new Date(field.value) < new Date()) {
            return {
                other: 'Дата не может быть меньше текущей',
            }
        } else {
            return null;
        }
    }
}