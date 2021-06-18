import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from "@angular/common/http";
import { ApiUrlConstant } from "src/app/core/constant/api-url.constant";
import { BuyersStatus } from "../shared/models/BuyersStatus.model";
import { RequestObjectInterface } from "../shared/models/RequestObject.model";
import { TiersResponse, BaseTierResponse } from "../shared/models/Tier.model";
import {
  IWalletResponse,
  IWalletHistoryResponse,
} from "../pages/wallet-page/wallet.interface";
import { ProductLaunchStatus } from "../shared/models/ProductLaunchStatus.model";

@Injectable({
  providedIn: 'root',
})
export class AdminServicesService {
  constructor(private http: HttpClient) {}

  listAllSellers(data: RequestObjectInterface): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLSELLERS, data);
  }

  getXSLXSellers(): any {
    return this.http.get(ApiUrlConstant.XSLXSellers, {
      responseType: 'blob',
    });
  }

  listAllReferals(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLREFERALS, data);
  }

  listAllBuyers(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.LISTALLBUYERS, data);
  }

  getXSLXBuyers(): any {
    return this.http.get(ApiUrlConstant.XSLXBuyers, {
      responseType: 'blob',
    });
  }

  getListTiers(): Rx.Observable<TiersResponse> {
    return this.http.get<TiersResponse>(ApiUrlConstant.GET_LIST_TIERS);
  }

  updateTierInUser(
    idTier: string,
    idUser: string
  ): Rx.Observable<BaseTierResponse> {
    return this.http.put<BaseTierResponse>(ApiUrlConstant.UPDATE_TIER, {
      user_id: idUser,
      tier_id: idTier,
    });
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

  cancelProductLaunchByAdmin(
    id: string,
    data: ProductLaunchStatus
  ): Rx.Observable<any> {
    return this.http.patch(
      ApiUrlConstant.CANCELPRODUCTLAUNCHBYADMIN + id,
      data
    );
  }

  editProductLaunchByAdmin(data: any, launchId: string): Rx.Observable<any> {
    return this.http.put(
      ApiUrlConstant.EDITPRODUCTLAUNCHBYADMIN + launchId,
      data
    );
  }

  getProductLaunchDetailsForAdmin(data: string): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETPRODUCTLAUNCHDETAILSFORADMIN + data);
  }

  getAllOrders(data: RequestObjectInterface): Rx.Observable<any> {
    return this.http.get(
      ApiUrlConstant.GETALLORDERS +
        'page=' +
        data.page +
        '&' +
        'count=' +
        data.count +
        '&' +
        'searchText=' +
        data.searchText +
        '&' +
        'sort=' +
        data.sort +
        '&' +
        'sortBy=' +
        data.sortBy
    );
  }

  getXSLXOrders(data: RequestObjectInterface): any {
    return this.http.get(
      ApiUrlConstant.XSLXORDERS +
        'page=' +
        data.page +
        '&' +
        'count=' +
        data.count +
        '&' +
        'searchText=' +
        data.searchText +
        '&' +
        'sort=' +
        data.sort +
        '&' +
        'sortBy=' +
        data.sortBy,
      {
        responseType: 'blob',
      }
    );
  }

  getAllOrderHistory(
    data: RequestObjectInterface,
    orderId: string
  ): Rx.Observable<any> {
    return this.http
      .get(
        ApiUrlConstant.GETALLORDERHISTORY +
          orderId +
          '/order-history?' +
          'page=' +
          data.page +
          '&' +
          'count=' +
          data.count +
          '&' +
          'searchText=' +
          data.searchText +
          '&' +
          'sort=' +
          data.sort +
          '&' +
          'sortBy=' +
          data.sortBy
      )
      .pipe(
        map((orderHistoryData: any) => {
          const preparedOrderData = {
            data: orderHistoryData.data[0].data,
            total: orderHistoryData.total,
            status: orderHistoryData.status,
            message: orderHistoryData.message,
          };
          return preparedOrderData;
        })
      );
  }

  getXLSXOrderHistory(data: RequestObjectInterface, orderId: string): any {
    return this.http.get(
      ApiUrlConstant.GETALLORDERHISTORY + orderId + '/XLSXOrderHistory',
      {
        responseType: 'blob',
      }
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
        'page=' +
        data.page +
        '&' +
        'count=' +
        data.count +
        '&' +
        'searchText=' +
        data.searchText +
        '&' +
        'sort=' +
        data.sort +
        '&' +
        'sortBy=' +
        data.sortBy
    );
  }

  payPendingBalance(data: any[]): Rx.Observable<any> {
    return this.http.post(`${ApiUrlConstant.PAYPENDINGBALANCE}`, {
      data,
    });
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
  getXSLXStaff(): any {
    return this.http.get(ApiUrlConstant.XLSXSTAFF, {
      responseType: 'blob',
    });
  }

  // Bonus codes service section

  listAllBonusCodes(data: RequestObjectInterface): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETBONUSCODELIST, data);
  }

  deleteBonuCode(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DELETEBONUSCODE, data);
  }

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

  getXSLXDeals(): any {
    return this.http.get(ApiUrlConstant.XSLXDeals, {
      responseType: 'blob',
    });
  }

  getSpecialDeals(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETSPECIALDEALSFORADMIN);
  }

  setSpecialDeals(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.SETSPECIALDEALS, data);
  }

  // dump orders service
  dumpAllOrders(): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.DUMP_ALL_ORDERS, {});
  }

  // wallet service

  getWallet(userId: string): Rx.Observable<IWalletResponse> {
    return this.http.get<IWalletResponse>(
      `${ApiUrlConstant.GET_WALLET}/${userId}`
    );
  }

  getWalletHistory(
    userId: string,
    params: any = {}
  ): Rx.Observable<IWalletHistoryResponse> {
    return this.http.get<IWalletHistoryResponse>(
      `${ApiUrlConstant.GET_WALLET_BASE_HISTORY}/${userId}/history`,
      { params }
    );
  }

  getWalletSettings(userId: string): Rx.Observable<any> {
    return this.http.get<IWalletResponse>(
      `${ApiUrlConstant.GET_WALLET}/${userId}`
    );
  }
}
