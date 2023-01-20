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
        if (!field.value?.TuiDay) {
            return null;
        }
        if (new Date(field.value.TuiDay.year, field.value.TuiDay.month - 1, field.value.TuiDay.day) < new Date()) {
            return {
                other: 'Дата не может быть меньше текущей',
            }
        } else {
            return null;
        }
    }
}