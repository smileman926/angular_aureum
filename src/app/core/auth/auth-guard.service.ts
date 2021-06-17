import { Injectable } from '@angular/core';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router,CanActivateChild} from "@angular/router";
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { GenralService } from '../services';
@Injectable()
export class AuthGuardService implements CanActivateChild, CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate( route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
   return this.auth.isAuthenticated().then((status : boolean) => {
    if(status) {
      return status
    }else{
      this.router.navigate(["login"]);
      return status
    }
    
  })
  .catch(() => {
    this.router.navigate(["login"]);
    return false
    // ... or any other way you want to handle such error case
  })
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}