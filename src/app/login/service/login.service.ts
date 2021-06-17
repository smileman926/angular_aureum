import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiUrlConstant } from '../../core/constant/api-url.constant';
import { genralConfig } from '../../core/constant/genral-config.constant';
import { WebStorage } from '../../core/web.storage';
import { GenralService } from '../../core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  onLoggedOut: EventEmitter<boolean> = new EventEmitter();
  onLoggedIn: EventEmitter<boolean> = new EventEmitter();
  isLoggedIn: boolean = false;
  constructor(
    public _genralServices:GenralService,
    private http: HttpClient, 
    private _storage: WebStorage,
    private _localSt: LocalStorageService,
  ) { }

  login(data: any,isRemember:Boolean): Observable<any> {
    return this.http.post(ApiUrlConstant.LOGIN, data).pipe(map((result: any) => {
      if (result.code == genralConfig.statusCode.ok) {
        // this._genralServices.setLocalStorageDetails(result.data);
        // this.isLoggedIn = true;
        // if (result.data.rememberme == true) {
          if(isRemember){
          this._storage.localStore(genralConfig.storage.TOKEN, result.data.token);  
          }
          // this._storage.localStore(genralConfig.storage.TOKEN, result.data.token);
          // this._storage.localStore(genralConfig.storage.All, result.data);
          // localStorage.setItem('isLoggedin', 'true');

          // this._storage.sessionStore(genralConfig.storage.isLoggedin, true);
          // this._storage.sessionStore(genralConfig.storage.All, result.data);
          this._storage.sessionStore(genralConfig.storage.TOKEN, result.data.token);
        //   this._storage.localStore(genralConfig.storage.USERTYPE, result.data.userType);
        //   this._storage.localStore(genralConfig.storage.ID, result.data._id);
        //   this._storage.localStore(genralConfig.storage.USERNAME, result.data.userInfo.firstName + result.data.userInfo.lastName);
        //   this._storage.localStore(genralConfig.storage.USERFNAME, result.data.userInfo.firstName);
        //   this._storage.localStore(genralConfig.storage.USERLNAME, result.data.userInfo.lastName);
        //   this._storage.localStore(genralConfig.storage.PROFILE_PIC, result.data.userInfo.image);
          
        // } else {
          
        //   this._storage.sessionStore(genralConfig.storage.USERTYPE, result.data.userType);
          
        //   this._storage.sessionStore(genralConfig.storage.ID, result.data.userInfo._id);
        //   this._storage.sessionStore(genralConfig.storage.USERNAME, result.data.userInfo.firstName + result.data.userInfo.lastName);
        //   this._storage.sessionStore(genralConfig.storage.USERFNAME, result.data.userInfo.firstName);
        //   this._storage.sessionStore(genralConfig.storage.USERLNAME, result.data.userInfo.lastName);
        //   this._storage.sessionStore(genralConfig.storage.PROFILE_PIC, result.data.userInfo.image);
        // }

        // this._storage.sessionStore(genralConfig.storage.USERNAME, result.data.userInfo.firstName + result.data.userInfo.lastName);
        // this._storage.sessionStore(genralConfig.storage.USERFNAME, result.data.userInfo.firstName);
        // this._storage.sessionStore(genralConfig.storage.USERLNAME, result.data.userInfo.lastName);
        // this.onLoggedIn.emit(true);

        return result;
      }
      else {
        // this.isLoggedIn = false;
        return result;
      }
    }));
  }

  logout(): Observable<any> {
    this.isLoggedIn = false;
    let data = {
        token : this._localSt.retrieve('token')
    }
    this._storage.clearAll();
    this._storage.clear(genralConfig.storage.USER);
    this.onLoggedOut.emit(true);
    localStorage.removeItem('isLoggedin');
    // return this.http.post(ApiUrlConstant.LOGOUT, data);
    return this.http.post(ApiUrlConstant.LOGOUT, data);

}
}