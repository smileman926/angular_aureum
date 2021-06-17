import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import * as Rx from "rxjs";
import { ApiUrlConstant } from "src/app/core/constant/api-url.constant";
import { map } from "rxjs/operators";
import { BuyersStatus } from "../shared/models/BuyersStatus.model";
import { RequestObjectInterface } from "../shared/models/RequestObject.model";

@Injectable({
  providedIn: "root",
})
export class AdminServicesService {
  constructor(private http: HttpClient) {}

  listAllSellers(data: RequestObjectInterface): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLSELLERS, data);
  }

  listAllReferals(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLREFERALS, data);
  }

  listAllBuyers(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLBUYERS, data);
  }

  getListStatusesBuyers(): Rx.Observable<BuyersStatus[]> {
    return this.http.get(ApiUrlConstant.GETLISTSTATUSESBUYER).pipe(
      map((v) => {
        const keys = Object.keys(v);
        return keys.map((item) => v[item]);
      })
    );
  }

  updateStatusInBuyers(idBuyer: string, status: string): Rx.Observable<any> {
    return this.http.put(`${ApiUrlConstant.UPDATESTATUSBUYER}/${idBuyer}`, {
      status,
    });
  }

  deleteBuyerById(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETEBUYERBYID, data);
  }

  listAllTestimonials(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLTESTIMONIALS, data);
  }

  listAllOrdersForAdmin(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLORDERSFORSETUPT, data);
  }

  getAllOrders(data: RequestObjectInterface): Rx.Observable<any> {
    return this.http.get(
      ApiUrlConstant.GETALLORDERS +
        "page=" +
        data.page +
        "&" +
        "count=" +
        data.count +
        "&" +
        "searchText=" +
        data.searchText +
        "&" +
        "sort=" +
        data.sort +
        "&" +
        "sortBy=" +
        data.sortBy
    );
  }

  listAllDeals(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLDEALS, data);
  }

  updateDealCategory(dealId: string, category: string): Rx.Observable<any> {
    return this.http.put(`${ApiUrlConstant.UPDATEDEALCATEGORY}/${dealId}`, {
      category,
    });
  }

  listAllCategories(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETCATEGORYLIST).pipe(
      map((v) => {
        const keys = Object.keys(v);
        return keys.map((item) => v[item]);
      })
    );
  }

  approveTestm(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.APPROVETESTIMONIAL, data);
  }
  deleteTestm(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETETESTIMONIAL, data);
  }

  listAllGiveawayData(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETGIVEAWAYDATA, data);
  }

  statsAnalysis(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.STATANALYSIS);
  }

  getRembursement(data: RequestObjectInterface): Rx.Observable<any> {
    return this.http.get(
      ApiUrlConstant.GETREMBURSEMENT +
        "page=" +
        data.page +
        "&" +
        "count=" +
        data.count +
        "&" +
        "searchText=" +
        data.searchText +
        "&" +
        "sort=" +
        data.sort +
        "&" +
        "sortBy=" +
        data.sortBy
    );
  }
  getBuyersCount(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETBUYERSCOUNT);
  }
  getProductsCount(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETPRODUCTSCOUNT);
  }
  getSelersCount(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETSELERSCOUNT);
  }
  getOrdersCount(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETORDERSCOUNT);
  }
  getStatsCount(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETSTATSCOUNT);
  }

  importUsersIntoSellerCollection(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.IMPORTSELLERCOLLECTION, data);
  }

  importUsersIntoBuyerCollection(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.IMPORTBUYERCOLLECTION, data);
  }
  approveProductLaunch(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.APPROVEPRODUCTLAUNCH, data);
  }

  listAllInstructions(data: any): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETINSTRUCTIONDATA, data);
  }
  addInstruction(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDINSTRUCTIONDATA, data);
  }
  editInstruction(data: any): Rx.Observable<any> {
    return this.http.put(ApiUrlConstant.EDITINSTRUCTIONDATA, data);
  }
  deleteInstruction(data: any): Rx.Observable<any> {
    return this.http.put(ApiUrlConstant.DELETEINSTRUCTIONDATA, data);
  }
  updateINSData(data: any): Rx.Observable<any> {
    return this.http.put(ApiUrlConstant.UPDATEINSDATA, data);
  }

  // staff service section
  listAllStaff(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETSTAFFLIST, data);
  }
  deleteStaff(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETESTAFF, data);
  }
  updateStaff(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.UPDATESTAFF, data);
  }
  addStaff(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDSTAFF, data);
  }

  // Bonus codes service section

  listAllBonusCodes(data: RequestObjectInterface): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETBONUSCODELIST, data);
  }

  deleteBonuCode(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETEBONUSCODE, data);
  }
  // updateBonuCode(data: any): Rx.Observable<any> {
  //   return this.http.post(ApiUrlConstant.UPDATESTAFF, data);
  // }

  addBonusCode(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDBONUSCODE, data);
  }

  updateUser(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.UPDATEUSERLOGIN, data);
  }

  changeSellerDataByAdmin(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.CHANGESELLERDATABYADMIN, data);
  }

  deleteDeal(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETEDEAL, data);
  }

  xlsx(data: any): any {
    return this.http.post(ApiUrlConstant.XSLX, data, { responseType: "blob" });
  }

  getSpecialDeals(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETSPECIALDEALSFORADMIN);
  }

  setSpecialDeals(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.SETSPECIALDEALS, data);
  }
}
