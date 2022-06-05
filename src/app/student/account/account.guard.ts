import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, Subscriber } from "rxjs";

@Injectable()
export class CanActivateLogin implements CanActivate {

    constructor(
        private _router: Router
    ) { }

    public canActivate(): Observable<boolean> {
        return new Observable((observer: Subscriber<boolean>): void => {
            if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.role === 'ROLE_STUDENT') {
                this._router.navigate(['cabinet', 'main']);
            } else if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))?.role !== 'ROLE_STUDENT') {
                this._router.navigate(['account', 'main']);
            } else {
                observer.next(true);
            }
        })
    }
}