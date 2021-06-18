import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConstant } from '../../core/constant/api-url.constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // Bank info

  statsAnalysis(): Observable<any> {
    return this.http.get(ApiUrlConstant.STATANALYSIS);
  }

  getBankInfoList(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.GETBANKINFOLIST, data);
  }

  updateBankInfo(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.UPDATEBANKINFO, data);
  }
}
