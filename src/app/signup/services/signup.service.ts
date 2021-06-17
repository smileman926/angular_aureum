import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlConstant } from '../../core/constant/api-url.constant';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient
  ) { }

  userRegistration(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.REGISTRATION,data);
  }

  dwollaUserRegistration(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.DWOLLAREGISTRATION, data);
  }
}
