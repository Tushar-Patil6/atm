import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([400].includes(err.status)) {
          // console.log('User Not Found', err);
        } else if ([404].includes(err.status)) {
          // console.log('Page Not Found', err);
        }
        const error = err.error?.message || err.statusText;
        return throwError(() => error);
      })
    );
  }
}
