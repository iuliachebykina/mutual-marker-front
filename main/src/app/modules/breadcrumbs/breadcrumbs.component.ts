import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BreadcrumbsService } from 'src/app/services/breadcrumb.service';

interface Breadcrumb {
    label: string;
    url: string;
}

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['styles/breadcrumbs.style.scss']
})
export class BreadcrumbsComponent implements OnInit {
    @Input()
    public color: string = '#FE7451';

    public breadcrumbs: BreadcrumbViewModel[] = [];
    protected subscription: Subscription;

    constructor(protected breadcrumbsService: BreadcrumbsService) {

    }

    public ngOnInit() {
        this.subscription = this.breadcrumbsService.AllBreadcrumbs
            .pipe(
                delay(0)
            )
            .subscribe(models => {
                models = models.filter(i => i.Label);
                
                this.breadcrumbs = Array.isArray(models) ? models : [models]
                    .filter((q: BreadcrumbViewModel) => q.Label)
                    .map((q: BreadcrumbViewModel) => new BreadcrumbViewModel(q.Label, q.Url))

                if (this.breadcrumbs.length < 2) {
                    this.breadcrumbs = [];

                    return;
                }
            });
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public toBack() {
        window.history.back();
    }
}

export class BreadcrumbViewModel {
    public Label: string;
    public Url: string;

    constructor(label: string, url: string) {
        this.Label = label;
        this.Url = url;
    }
}