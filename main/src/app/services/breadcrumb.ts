
import { of, Subject, Observable } from 'rxjs';
import { Optional, Inject, Injectable } from '@angular/core';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';

import { IBreadcrumb } from './breadcrumb.interface';

@Injectable()
export class Breadcrumb implements Resolve<Breadcrumb>, IBreadcrumb {
    public get Label() { return this.label; }
    public set Label(value) { this.label = value; this.BreadcrumbUpdated.next(); }
    public get Url() { return this.url; }
    public set Url(value) { this.url = value; this.BreadcrumbUpdated.next(); }
    // public get Route() { return this._route; }
    // public set Route(value) { this._route = value; }
    public BreadcrumbUpdated: Subject<void> = new Subject<void>();

    private _route: ActivatedRoute;

    constructor(@Optional() @Inject('label') protected label?: string, @Optional() @Inject('url') protected url?: string) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breadcrumb> {
        return this.getData();
    }

    protected getData(): Observable<Breadcrumb> {
        return of(this);
    }
}