import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');

    const modifiedReq = req.clone({
      headers: new HttpHeaders({
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        'X-Requested-With': 'XMLHttpRequest',
      }),
      withCredentials: true,
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or unauthorized
          this.authService.logout();
        }

        return throwError(() => error);
      })
    );
  }
}
