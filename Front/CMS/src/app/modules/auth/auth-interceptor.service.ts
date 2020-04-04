import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private readonly authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.authService.getTokenFromLocalstorage();
        if(token) {
            const modiFiedRequest = req.clone({
                headers: req.headers.append('token', token)
            });
            return next.handle(modiFiedRequest);
        } else {
            return next.handle(req);
        }
    }
}