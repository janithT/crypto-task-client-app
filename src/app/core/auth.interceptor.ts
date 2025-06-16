import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');

    const modifiedReq = req.clone({
      headers: new HttpHeaders({
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        'X-Requested-With': 'XMLHttpRequest'
      }),
      withCredentials: true
    });

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {debugger
        if (error.status === 401) {
          // Token expired or unauthorized
          localStorage.removeItem('token');
          this.router.navigate(['/auth/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
