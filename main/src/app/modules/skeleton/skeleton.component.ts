import { Component } from '@angular/core';


@Component({
    selector: 'skeleton',
    templateUrl: 'skeleton.component.html',
    styleUrls: ['styles/skeleton.scss']
})

export class SkeletonComponent {

    public get Loading(): boolean {
        return this._loading;
    }

    private _loading: boolean = true;
    private _fakeLoading: number = 1000;

    constructor() {
        setTimeout(() => {
            this._loading = false;
        }, this._fakeLoading);
    }
}