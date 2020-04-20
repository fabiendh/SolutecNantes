import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Router } from '@angular/router';
import { StatService } from './stat.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private tokenExtractor: HttpXsrfTokenExtractor,
    private statService: StatService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add an header to prevent auth popup in browser

    let customReq;
    if (this.tokenExtractor.getToken()) {
      const token = this.tokenExtractor.getToken() as string;
      customReq = req.clone({
        headers: req.headers.set('X-Requested-With', 'XMLHttpRequest').set('widthCredentials', 'true').set('X-XSRF-TOKEN', token)
      });
    } else {
      customReq = req.clone({
        headers: req.headers.set('X-Requested-With', 'XMLHttpRequest').set('widthCredentials', 'true')
      });
    }

    // Re-route to login on 401
    return next.handle(customReq).pipe(tap(
      (err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401)
        this.router.navigate(['/login']);
      }
    ))
  }
}
