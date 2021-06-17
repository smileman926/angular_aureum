import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Observable, BehaviorSubject, Observer } from "rxjs";
import { LocalStorageService } from "ngx-webstorage";
import * as Rx from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiUrlConstant } from "../../../constant/api-url.constant";
import { FormGroup } from "@angular/forms";
import { WebStorage } from "src/app/core/web.storage";
import { Router } from "@angular/router";
import { genralConfig } from "src/app/core/constant/genral-config.constant";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";
const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" }),
};
@Injectable()
export class GenralService {
  public tempUserDetails: any;
  public loggedInUserDetails: any;
  public globalImage: any;
  public headerUserName: any;
  public dataForShare: any;
  isLoggedin: Boolean = false;

  constructor(
    public location: Location,
    public localSt: LocalStorageService,
    private http: HttpClient,
    public router: Router,
    private _webStorage: WebStorage,
    private toster: ToastrService
  ) {
    // this.getDetails();
  }

  goBack() {
    this.location.back();
  }

  isloggedInRedirect() {
    this.isLoggedin = this._webStorage.get("token") ? true : false;

    if (this.isLoggedin) {
      this.getUserDetails().subscribe((res) => {
        if (res.code == genralConfig.statusCode.ok) {
          this.loggedInUserDetails = res.data;
          // console.log("@@@@@@@@@@@@@@@role@@@@@@@@@@@@@@@", this.loggedInUserDetails.role_id.role);
          switch (this.loggedInUserDetails.role_id.role) {
            case "seller": {
              this.router.navigate(["/layout/seller/dashboard"]);
              break;
            }
            case "buyer": {
              this.toster.info(
                "Sorry! You are trying to login on seller platform"
              );
              break;
            }
            case "admin": {
              this.router.navigate(["/layout/admin/dashboard"]);
              break;
            }

            case "superAdmin": {
              this.router.navigate(["/layout/admin/dashboard"]);
              break;
            }
          }
        } else {
          this.loggedInUserDetails = {};
          this.router.navigate(["/"]);
          this._webStorage.clearAll();
        }
      });
    } else {
    }
  }

  getDetails() {
    // this.loggedInUserDetails = this.localSt.retrieve('all');
    // this.loggedInUserDetails = JSON.parse(this.loggedInUserDetails);
    if (this.loggedInUserDetails) {
      this.globalImage = this.loggedInUserDetails.image
        ? this.loggedInUserDetails.image
        : this.globalImage;
      if (
        this.loggedInUserDetails.userType == "user" ||
        this.loggedInUserDetails.userType == "staff"
      ) {
        this.headerUserName =
          this.loggedInUserDetails.firstName +
          this.loggedInUserDetails.lastName;
      } else {
        this.headerUserName = this.loggedInUserDetails.clinicName;
      }
    }
  }

  getLogInDetails(): Observable<any> {
    return this.loggedInUserDetails;
  }

  setHeaderName(name: any): Observable<any> {
    this.headerUserName = name;
    return this.headerUserName;
  }

  setImage(url: any): Observable<any> {
    this.globalImage = url;
    return this.globalImage;
  }

  setLocalStorageDetails(data: any): Observable<any> {
    this.tempUserDetails = data;
    return this.tempUserDetails;
  }

  countryList(data: any): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETCOUNTRIES, data);
  }

  getUserDetails(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETUSERDETAILS);
  }

  getImageLink(profilePice: string): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETIMAGE + profilePice, {
      responseType: "text",
    });
  }

  getSubAdminPermission(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETPERMISSION);
  }

  uploadProfile(data: any): Rx.Observable<any> {
    return this.http.post(
      ApiUrlConstant.UPLOADPROFILE,
      data,
      HttpUploadOptions
    );
  }
  stateList(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETSTATES, data);
  }

  getDetail(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETDETAIL, data);
  }

  getNotifications(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.GETNOTIFICATIONS, data);
  }
  getSubscriptionPlans(): Rx.Observable<any> {
    return this.http.get(ApiUrlConstant.GETSUBSCRIPTIONPLANS);
  }
  addContactDetails(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ADDCONTACTDETAILS, data);
  }

  //for creating password
  checkUrl(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.CHECKURL, data);
  }

  createPassword(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.RESETPASSWORD, data);
  }

  updateUserProfile(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.UPDATEUSERPROFILE, data);
  }
  verifyEmail(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.VERIFYEMAIL, data);
  }

  readNotification(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.READNOTIFICATION, data);
  }

  updateUserVideoTutorial(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.UPDATEUSERVIDEOTUTORIAL, data);
  }

  IDGenerate(digitValue) {
    if (!digitValue) {
      digitValue = 11;
    }
    var text = "";
    var hdntxt = "";
    var captchatext = "";
    var possible =
      "ABCDEFGHIkLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < digitValue; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      if (i == 5) {
        text = text + "-";
      }
    }
    return text;
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  updateConfirmationBox(obj): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      return Swal.fire(obj).then((val) => {
        if (val.value) {
          return observer.next(true);
        } else if (val.dismiss === Swal.DismissReason.cancel) {
          return observer.next(false);
        }
      });
    });
  }

  successNotification(obj): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      return Swal.fire(obj).then((val) => {
        if (val.value) {
          return observer.next(true);
        } else if (val.dismiss === Swal.DismissReason.cancel) {
          return observer.next(false);
        }
      });
    });
  }
}
