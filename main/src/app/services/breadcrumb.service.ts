
import { map, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject ,  Subscription } from 'rxjs';
import { Breadcrumb } from './breadcrumb';

@Injectable()
export class BreadcrumbsService {
    public AllBreadcrumbs: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);
    private _breadcrumbs: Breadcrumb[] = [];
    private _subscribers: Subscription[] = [];
    private _urlSegment: '';

    constructor(private _router: Router) {
        this.loadBreadCrumbs();
        this._router.events.pipe(filter(event => event instanceof NavigationEnd),
            map(event => event as NavigationEnd),)
            .subscribe(event => {
                this.loadBreadCrumbs();
            });
    }

    private loadBreadCrumbs() {
        this._subscribers.forEach(q => q.unsubscribe());
        this._subscribers = [];
        this._breadcrumbs = [];

        let currentRoute = this._router.routerState.root;
        this.resetUrlSegments();
        do {
            const childrenRoutes = currentRoute.children;
            currentRoute = null;
            childrenRoutes.forEach(route => {
                if (route.outlet === 'primary') {
                    if (route.snapshot) {
                        if (
                            (route.routeConfig.data && route.routeConfig.data['breadcrumb']) ||
                            (route.routeConfig.resolve && route.routeConfig.resolve['breadcrumb'])
                        ) {
                            const routeSnapshot = route.snapshot;
                            const breadcrumbData = routeSnapshot.data['breadcrumb'];

                            let result: Breadcrumb;
                            if (!breadcrumbData) {
                                result = new Breadcrumb('');
                            } else if (typeof breadcrumbData === 'string') {
                                result = new Breadcrumb(breadcrumbData);
                            } else {
                                result = (breadcrumbData instanceof Breadcrumb) ? breadcrumbData : undefined;
                            }
                            result.Url = this.getUrlfromSegments(route);

                            // result.Label = result.Label.length > 12 ? result.Label.slice(0, 12) + '...' : result.Label;
                            this._breadcrumbs.push(result);
                            const subscriber = result.BreadcrumbUpdated.subscribe(q => {
                                this.AllBreadcrumbs.next(this._breadcrumbs);
                            });
                            this._subscribers.push(subscriber);
                        } else {
                            this._breadcrumbs.push(new Breadcrumb('', this.getUrlfromSegments(route)));
                        }
                    }
                    currentRoute = route;
                }
            });
        } while (currentRoute);
        this.AllBreadcrumbs.next(this._breadcrumbs);
    }

    private resetUrlSegments() {
        this._urlSegment = '';
    }

    private getUrlfromSegments(route: ActivatedRoute): string {
        const snapshot = route.snapshot;
        const partUrl = snapshot.url.map(segment => segment.path).join('/');
        if (partUrl.length > 0) {
            this._urlSegment += '/' + partUrl;
        }
        
        return this._urlSegment;
    }
}