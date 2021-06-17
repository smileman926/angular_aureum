import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConstant } from '../../../constant/api-url.constant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private http: HttpClient) { }

  changePassword(data: any):Observable<any> {
    return this.http.post(ApiUrlConstant.CHANGEPASSWORD,data);
  }
}
