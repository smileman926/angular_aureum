import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from 'rxjs';
import { ApiUrlConstant } from '../../../../core/constant/api-url.constant';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  listAllStates(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLSTATES, data)
  }

  deleteState(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETESTATE, data)
  }

  addState(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDSTATE, data)
  }

  getStateDetails(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETSTATEDETAILS, data)
  }

  editState(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.EDITSTATE, data)
  }
  activeDeactive(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ACTIVEDEACTIVESTATE, data)
  }
}
