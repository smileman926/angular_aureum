import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import * as Rx from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConstant } from 'src/app/core/constant/api-url.constant';

@Injectable({
  providedIn: 'root'
})
export class ClinicServiceService {

  constructor(public localSt: LocalStorageService, private http: HttpClient) { }
  clinicList(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.CLINICLISTING, data)
  }
  addClinic(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDCLINIC, data);
  }
  deleteClinic(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETECLINIC, data)
  }
  getClinicDetails(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETCLINIC, data)
  }
  editClinic(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.EDITCLINIC, data);
  }
  activeDeactive(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ACTIVEEACTIVECLINIC, data);
  }
}
