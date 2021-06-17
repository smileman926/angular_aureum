
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { WebStorage } from 'src/app/core/web.storage';
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, public _webStorage: WebStorage) { }
  // ...
  public isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      let returnValue: boolean = false;
      const token = this._webStorage.get('token');
      

      if (token) {
        // Check whether the token is expired and return
        // true or false
        returnValue = this.jwtHelper.isTokenExpired(token);
        if(returnValue){
          resolve(false);
        }else{
          resolve(true);
        }
      } else {
        resolve(false);
      }

    });
    return promise;
  }
}