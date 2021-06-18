import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { GenralService } from "src/app/core";
import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { Observable } from "rxjs";

@Injectable()
export class UserDetailsResolve implements Resolve<any> {
  constructor(private _general_service: GenralService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this._general_service.getSubAdminPermission();
  }
}
