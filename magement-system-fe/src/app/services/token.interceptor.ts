import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
constructor(private auth: AuthService,private router: Router) {}


intercept(req: HttpRequest<any>, next: HttpHandler) {
// skip auth endpoints
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next.handle(req);
  }

  const token = this.auth.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    });
  }else {
    this.router.navigate(['/login']);
  }

  return next.handle(req);
}
}