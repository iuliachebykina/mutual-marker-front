import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { TuiDialogModule, TuiNotificationModule, TuiNotificationsModule, TuiRootModule } from "@taiga-ui/core";
import { UserBaseService } from './services/user.base.service';
import { AppComponent } from './app.component';
import { routes } from "./app.routing";
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { GlobalNotificationService } from './services/global-notification.service';
import { RoomService } from './services/room.service';
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
        RouterModule.forRoot(routes),
        HttpClientModule,
        TuiNotificationModule
    ],
    providers: [
        UserBaseService,
        CookieService,
        GlobalNotificationService,
        RoomService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
