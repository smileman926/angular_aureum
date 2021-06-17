// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class SubscriptionService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from 'rxjs';
import { Observable } from 'rxjs';

import { ApiUrlConstant } from '../../../../core/constant/api-url.constant';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getSubscriptionPlan(data: any): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.LISTSUBSCRIPTIONPLAN, data)
  }
  deleteSubscription(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETESUBSCRIPTION, data)
  }
  // addSubscription(data: any): Rx.Observable<any> {
  //   return this.http.post(ApiUrlConstant.ADDSUBSCRIPTION, data)
  // }
  addSubscription(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.ADDSUBSCRIPTION, data);
  }
  updateSubscription(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.UPDATESUBSCRIPTION, data)
  }

}
