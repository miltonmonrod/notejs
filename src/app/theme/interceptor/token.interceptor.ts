import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../../core/services/storage.service';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private keycloakService: KeycloakService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.storageService.getCurrentSession() === null)
    {
      console.log('session lost');
      //this.keycloakService.logout();
      //return;
    }
    console.log('Interceptor log');
    let headers = request.headers;
    /*.set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.auth.getCurrentToken()}`);*/
    const cloneReq = request.clone({ headers });
    return next.handle(cloneReq);
  }
}