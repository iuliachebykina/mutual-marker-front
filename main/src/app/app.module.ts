import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { TuiDialogModule, TuiNotificationsModule, TuiRootModule } from "@taiga-ui/core";
import { AppComponent } from './app.component';
import { routes } from "./app.routing";
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        TuiRootModule,
        BrowserAnimationsModule,
        TuiDialogModule,
        TuiNotificationsModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
