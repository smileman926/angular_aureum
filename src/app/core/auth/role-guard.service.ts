import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import decode from "jwt-decode";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { WebStorage } from "src/app/core/web.storage";
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    public _webStorage: WebStorage
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = this._webStorage.get("token");
    const helper = new JwtHelperService();
    // decode the token to get its payload
    const tokenPayload = helper.decodeToken(token);
    return this.auth.isAuthenticated().then((status: boolean) => {
      if (status && tokenPayload.user_type === expectedRole) {
        return true;
      } else {
        this.router.navigate([""]);
        return false;
      }
    });
  }
}
