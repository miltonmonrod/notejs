import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './util/app-init'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { AuthenticationService } from './theme/auth/login/shared/authentication.service';
import { UsuariosService } from './services/usuario.service';
import { TokenInterceptor } from './theme/auth/token.interceptor';
import { DxDataGridModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NotificationsService } from 'angular2-notifications';
import { ToastyService, ToastyModule } from 'ng2-toasty';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent
  ],
  imports: [
    KeycloakAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    DxDataGridModule,
    ToastyModule.forRoot(),
    SimpleNotificationsModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    MenuItems, AuthenticationService, NotificationsService, ToastyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//platformBrowserDynamic().bootstrapModule(AppModule);