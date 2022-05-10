import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, Subscriber } from "rxjs";
import { IUser } from "../account/interfaces/user-registration.interface";
import { UserBaseService } from "../../services/user.base.service";

@Injectable()
export class CanActivateCabinet implements CanActivate {

    constructor(
        private _userBaseSerice: UserBaseService,
        private _router: Router
    ) { }

    public canActivate(): Observable<boolean> {
        return new Observable((observer: Subscriber<boolean>): void => {
            this._userBaseSerice.getUser()
                .subscribe((user: IUser): void => {
                    if (user && user.role === 'ROLE_TEACHER') {
                        observer.next(true);
                    } else {
                        this._router.navigate(['login', 'teacher']);
                    }
                });
        })
    }
}