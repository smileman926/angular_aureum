import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlConstant } from '../../../constant/api-url.constant';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) 
    { }

    editProfile(data: any ): Observable<any> {
      return this.http.post(ApiUrlConstant.EDITPROFILE ,data);
    }
    getUserDetails(data:any):Observable<any> {
      return this.http.post(ApiUrlConstant.USERDETAILS ,data);
    }
}
