import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { StorageService } from '../../core/services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: StorageService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = request.headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.auth.getCurrentToken()}`);
    const cloneReq = request.clone({ headers });    
    return next.handle(cloneReq);
  }
}