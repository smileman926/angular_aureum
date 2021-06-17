import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlConstant } from '../../core/constant/api-url.constant';

@Injectable()
export class ForgetpasswordService {

  constructor( private http: HttpClient) { }

  sendEmail(data: any):Observable<any> {
   return  this.http.post(ApiUrlConstant.FORGOTPASSWORD, data);
  }
}
