import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { from, mergeMap, Observable } from 'rxjs';
import { AuthService } from './auth.service';

export class NotAuthenticatedError {};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes('/oauth2/token') && !request.url.includes('/usuarios') && this.authService.isAccessTokenValido()) {
      return from(this.authService.gerarTokenComRefreshToken())
        .pipe(
          mergeMap(() => {
            if (this.authService.isAccessTokenValido()) {
              throw new NotAuthenticatedError();
            }
            
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            
            return next.handle(request);
            
          })
        )
    }

    return next.handle(request);
  }
}
