import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from 'rxjs';
import { ApiUrlConstant } from '../../../../core/constant/api-url.constant';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }

  listAllFaqs(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLFAQS, data)
  }
  deleteFaq(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETEFAQ, data)
  }
  answerFaq(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ANSWERFAQ, data)
  }
  updateFaqStatus(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.UPDATEFAQSTATUS, data)
  }
  addFAQ(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDFAQ, data)
  }
}
