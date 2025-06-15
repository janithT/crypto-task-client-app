import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get JWT from localStorage
    const authToken = localStorage.getItem('token');

    // Clone request and add Authorization and CSRF headers
    const modifiedReq = req.clone({
      headers: new HttpHeaders({
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        'X-Requested-With': 'XMLHttpRequest' 
      }),
      withCredentials: true 
    });

    return next.handle(modifiedReq);
  }
}
