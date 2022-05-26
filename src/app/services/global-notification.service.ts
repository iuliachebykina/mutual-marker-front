import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class GlobalNotificationService {

    public subject$: Subject<INotificationOptions> = new Subject<INotificationOptions>();
    
    constructor() { }

}

export interface INotificationOptions {
    status: string;
    text: string;
}