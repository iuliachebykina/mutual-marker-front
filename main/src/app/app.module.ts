import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { ALL_TAIGA_UI_MODULES } from 'src/libraries/all-taiga-modules';
import { AppComponent } from './app.component';
import { routes } from "./app.routing";
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { AuthService } from './services/auth.service';
import { Breadcrumb } from './services/breadcrumb';
import { BreadcrumbsService } from './services/breadcrumb.service';
import { GlobalNotificationService } from './services/global-notification.service';
import { ModalModule } from './services/modals/modal.module';
import { RoomService } from './services/room.service';
import { TokenInterceptor } from './services/token-interceptor.service';
import { UserBaseService } from './services/user.base.service';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ALL_TAIGA_UI_MODULES,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        ModalModule.forRoot(),
    ],
    providers: [
        UserBaseService,
        CookieService,
        GlobalNotificationService,
        RoomService,
        BreadcrumbsService,
        Breadcrumb,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, // добавляем интерсептор в провайдеры
        AuthGuard,
        AuthService,
        LoginGuard

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
