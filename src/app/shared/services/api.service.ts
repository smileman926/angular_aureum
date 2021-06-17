import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiUrlConstant } from "../../core/constant/api-url.constant";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // to check mws connection
  checkMWSConnection(): Observable<any> {
    return this.http.get(ApiUrlConstant.CHECKMWSCONNECTION);
  }

  getBankAccountDetails(): Observable<any> {
    return this.http.get(ApiUrlConstant.GETBANKACCOUNTDETAILS);
  }

  // remove mws connection
  removeMWSConnection(): Observable<any> {
    return this.http.get(ApiUrlConstant.REMOVEMWSCONNECTION);
  }

  // connect mws connection
  connectMWSDetails(): Observable<any> {
    return this.http.get(ApiUrlConstant.CONNECTMWSCONNECTION);
  }

  // mws connection
  addSellerMWSDetails(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.ADDSELLERMWSDETAILS, data);
  }

  listMarketPlaces(): Observable<any> {
    return this.http.get(ApiUrlConstant.LISTMARKETPLACES);
  }

  // Product Services

  uploadProductPic(data: FormData): Observable<any> {
    return this.http.post(ApiUrlConstant.UPLOADPODUCTPIC, data);
  }

  listGiveawayCost(): Observable<any> {
    return this.http.get(ApiUrlConstant.GETGIVEAWAYOPTIONSCOST);
  }

  executePayment(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.EXECUTEPAYMENT, data);
  }

  // Billing services
  sellerBillingHistory(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.SELLERBILLINGHISTORY, data);
  }

  getBillingDetailByID(data: any): Observable<any> {
    return this.http.get(ApiUrlConstant.GETBILLINGHDETAIL + data);
  }

  statsAnalysis(): Observable<any> {
    return this.http.get(ApiUrlConstant.STATANALYSIS);
  }

  getSubscriptionLevelDetails(): Observable<any> {
    return this.http.get(ApiUrlConstant.GETSUBSCRIPTIONPLANDETAILS);
  }

  addSavedProductLaunch(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.ADDSAVEDPRODUCTLAUNCH, data);
  }

  getBankInfoList(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.GETBANKINFOLIST, data);
  }

  updateBankInfo(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.UPDATEBANKINFO, data);
  }

  getFundingSourceToken(): Observable<any> {
    return this.http.get(ApiUrlConstant.GETFUNDINGSOURCETOKEN);
  }

  setFundingSource(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.SETFUNDINGSOURCE, data);
  }

  retrieveFundingSource(): Observable<any> {
    return this.http.get(ApiUrlConstant.RETRIEVEFUNDINGSOURCE);
  }

  initiateTransferBySeller(data: any): Observable<any> {
    return this.http.post(ApiUrlConstant.INITIATETRANSFERBYSELLER, data);
  }
}
