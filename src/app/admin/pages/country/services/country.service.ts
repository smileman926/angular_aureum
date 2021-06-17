import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Rx from 'rxjs';
import { ApiUrlConstant } from 'src/app/core/constant/api-url.constant';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  listAllCountries(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLCOUNTRIES, data)
  }

  addCountry(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDCOUNTRY, data)
  }

  getCountryDetails(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETCOUNTRYDETAILS, data)
  }

  editCountry(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.EDITCOUNTRY, data)
  }

  deleteCountry(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETECOUNTRY, data)
  }
  activeDeactive(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ACTIVEDEACTIVECOUNTRY, data)
  }
}
