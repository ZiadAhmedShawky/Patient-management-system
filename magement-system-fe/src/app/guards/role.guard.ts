import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
constructor(private auth: AuthService, private router: Router) {}


canActivate(route: ActivatedRouteSnapshot): boolean {
const expectedRoles: string[] = route.data['roles'] || [];
const userRoles = this.auth.getUserRoles();


const hasRole = expectedRoles.some(r => userRoles.includes(r));
if (!hasRole) {
// redirect to unauthorized or login
this.router.navigate(['/unauthorized']);
}
return hasRole;
}
}