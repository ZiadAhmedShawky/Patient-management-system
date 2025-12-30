import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { jwtDecode } from "jwt-decode";
import { UserRequest } from '../models/UserRequest.model';
import { UserInfo } from "../models/user-info.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

      private tokenKey = 'auth_token';

    constructor(private http: HttpClient,private router: Router) {}
    login(userRequest: UserRequest) {

    return this.http.post<{ token: string }>('http://localhost:8080/auth/login', { email:userRequest.email, password:userRequest.password });
  }

  create(user: UserInfo): Observable<any> {
    return this.http.post<any>('http://localhost:8080/auth/register', user);
  }

    saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

    getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
    isAuthenticated(): boolean {
    return !!this.getToken();
  }
  redirectByRole() {
    const roles = this.getUserRoles();
    if (roles.includes('ADMIN')) this.router.navigate(['/patients']);
    else if (roles.includes('USER')) this.router.navigate(['/patients']);
    else this.router.navigate(['/']);
  }

  private decodeToken(token: string): any {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error('Invalid token', e);
    return null;
  }
}
  getUserRoles() {
    const token = this.getToken();
    
    if (!token) return;
    try {
      const decoded: any = this.decodeToken(token);
      const roles = decoded.roles || decoded.role || [];
      return roles;
    } catch {
      return;
    }
  }

}