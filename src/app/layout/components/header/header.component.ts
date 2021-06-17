import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { GenralService } from "../../../core";
import { HeaderService } from "./service/header.service";
import { LoginService } from "../../../login/service/login.service";
import { genralConfig } from "../../../core/constant/genral-config.constant";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { WebStorage } from "../../../core/web.storage";
import { environment } from "../../../../environments/environment";
import { Subscription, generate, BehaviorSubject, Observable } from "rxjs";
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { FileUploader, FileItem } from "ng2-file-upload";
import { ApiService } from "src/app/shared/services/api.service";
import { MatDialog } from "@angular/material";
import { ConfirmationDialogComponent } from "../../../shared/confirmation-dialog/confirmation-dialog.component";
import { AutoLogoutService } from "src/app/shared/services/auto-logout.service";
import { SignupService } from "src/app/signup/services/signup.service";
import * as moment from "moment";
import { scan } from "rxjs/operators";

const URL = environment.apiUrl + "/uploadUserProfilePic";
const path = environment.apiUrl + "/uploads/profile/";
interface Window {
  dwolla: any;
}
declare let window: Window;
const dwolla = window.dwolla;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [AutoLogoutService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild("picInput", { static: false }) picInput;
  loader: Boolean = false;
  isSeller: Boolean = false;
  cPassword: Boolean = false;
  showHideSidebar: any = "";
  username: string = "";
  image: string = "";
  imageUrl: any;
  email: string = "";
  usermail: string = "";
  userType: string;
  profileurl: string = "";
  loggedInUserDetails: any;
  baseimageurl: string = environment.backendBaseUrl;
  subscriptionname: Subscription;
  subscriptionimage: Subscription;
  user_type: string = "";
  display: boolean = false;

  changePasswordForm: FormGroup;
  editProfileForm: FormGroup;

  mwsConnectForm: FormGroup;
  mwsConnect: Boolean = false;
  isMwsConnected: Boolean = false;

  dwollaConnect: Boolean = false;
  dwollaBusinessConnectSelected = false;
  dwollaBusinessConnect: Boolean = false;
  signUpForm: FormGroup;
  signUpBusinessForm: FormGroup;
  registrationSucess: Boolean = false;
  dataObject = {};
  lessThan18 = false;
  maxDate = new Date();
  stateJson = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
    "AS",
    "GU",
    "MP",
    "PR",
    "UM",
    "VI",
  ];
  userState: any;

  marketPlace: any = "";
  isMarketPlaceSelected: Boolean = false;
  redirectionLink: any;
  resettoken: any;
  isEditProfile: Boolean = false;
  message: string = genralConfig.passwordChangemessage;
  uploader: FileUploader;
  token: any;
  url: any;
  planName: any;
  notificationCount: Number;
  notificationList: any;
  mwsConnectStatus: any;
  isRemoveBtn: Boolean = false;
  marketPlacesList: any = [];
  region: any;
  paymentDetailsTab = false;
  loaderIAV: boolean;
  displayDialog: boolean;
  financialData: any;
  paymentLoader: boolean;
  productList: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public _genralServices: GenralService,
    private _headerService: HeaderService,
    private _loginService: LoginService,
    private toastr: ToastrService,
    public router: Router,
    private _webStorage: WebStorage,
    private apiService: ApiService,
    private autoLogoutService: AutoLogoutService,
    private signUpService: SignupService,
    private dialog: MatDialog
  ) {
    let password = new FormControl("", [
      Validators.required,
      Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH),
    ]);
    let prev_password = new FormControl("", [
      Validators.required,
      Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH),
    ]);

    let confirmPassword = new FormControl("", [
      Validators.required,
      CustomValidators.equalTo(password),
    ]);
    this.changePasswordForm = this.formBuilder.group({
      prev_password: prev_password,
      password: password,
      confirmPassword: confirmPassword,
    });

    this.editProfileForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)],
      ],
      firstname: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      lastname: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      companyname: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
    });
    this.mwsConnectForm = this.formBuilder.group({
      marketplace_id: [null, [Validators.required]],
      seller_central_id: ["", [Validators.required]],
      mws_auth_token: ["", [Validators.required]],
    });

    this.signUpForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]],
      password: password,
      confirmPassword: confirmPassword,
      // first_name: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      // last_name: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      address1: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      city: [
        "",
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.CITY),
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      state: [""],
      postalCode: [
        "",
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.POSTAL_CODE),
        ],
      ],
      dateOfBirth: ["", [Validators.required]],
      ssn: [
        "",
        [Validators.required, Validators.pattern(genralConfig.pattern.SSN)],
      ],
      // businessName: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.MAXLENGTH), Validators.minLength(genralConfig.pattern.MINLENGTH)]],
      // businessType: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.MAXLENGTH), Validators.minLength(genralConfig.pattern.MINLENGTH)]],
      // businessClassification:['', [Validators.required, Validators.maxLength(genralConfig.pattern.MAXLENGTH), Validators.minLength(genralConfig.pattern.MINLENGTH)]]
      // phone:['',[Validators.required,Validators.pattern(genralConfig.pattern.PHONE_NO)]]
    });

    this.signUpBusinessForm = this.formBuilder.group({
      // email: ['', [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]],
      password: password,
      confirmPassword: confirmPassword,
      // first_name: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      // last_name: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      address1: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      city: [
        "",
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.CITY),
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      state: [""],
      postalCode: [
        "",
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.POSTAL_CODE),
        ],
      ],
      businessDateOfBirth: ["", [Validators.required]],
      ssn: [
        "",
        [Validators.required, Validators.pattern(genralConfig.pattern.SSN)],
      ],
      businessName: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      businessType: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      businessClassification: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      // phone:['',[Validators.required,Validators.pattern(genralConfig.pattern.PHONE_NO)]]
    });

    this.token = this._webStorage.get("token");
    this.uploader = new FileUploader({
      url: URL,
      queueLimit: 100,
      authToken: this.token,
      disableMultipart: false,
      removeAfterUpload: true,
      filters: [
        {
          name: "propertiesExtension",
          fn: (item: any): boolean => {
            const file = item.type.split("/");
            const fileExt = file[1];
            const fileType = file[0];
            const size = item.size;
            if (fileType == "image") {
              if ("|jpg|png|jpeg|".indexOf(fileExt) === -1) {
                this.toastr.error(
                  genralConfig.Image.IMAGE_FORMAT_NOT_SUPPORTED
                );

                return false;
              } else if (size >= 20185920) {
                //20mb
                this.toastr.error(genralConfig.Image.IMAGE_SIZE_EXCEED);

                return false;
              } else {
                return true;
              }
            } else {
              this.toastr.error(genralConfig.Image.FILE_FORMAT_NOT_SUPPORTED);
            }
          },
        },
      ],
    });
    this.uploader.onBeforeUploadItem = (item) => {
      // console.log('before add 1', item)
    };
    this.uploader.onAfterAddingFile = function (item) {
      // console.log('after add 1', item)
    };
    this.uploader.onErrorItem = function (item, res, sta, he) {
      // console.log('error  add 1', item, res, sta, he)
    };
    this.uploader.onCompleteItem = function (item, res, sta, he) {
      // console.log('complete  item 1', item, res, sta, he)
    };
    this.uploader.onCompleteAll = function () {
      // console.log('complte ALL 1')
    };
    this.uploader.uploadAll();
    this.uploader.onBuildItemForm = (item, form) => {
      // console.log(' here u r ... ', item, form)
    };
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      if (this.uploader.queue.length > 1) {
        this.uploader.queue.splice(0, 1);
      }
    };
    // this.ngOnInit();
  }

  ngOnInit() {
    this.syncUserData();

    this.user_type = this.router.url.replace(/\/layout\/([a-z]+)\/.*/gm, "$1");
    let token = this._webStorage.get("token");
    this.resettoken = token.split("Bearer ").pop();
    this.personalAccountSelected();
    // this.loggedInUserDetails = this._webStorage.get('all') || {};
    // this.url = this.loggedInUserDetails.profile_image;

    // console.log("Login user details in header============>", this.loggedInUserDetails);

    // this.username = this._genralServices.loggedInUserDetails.userInfo.firstName + this._genralServices.loggedInUserDetails.userInfo.lastName;
    // this.image = this._genralServices.globalImage;
    // this.email = this._genralServices.loggedInUserDetails.userInfo.email;
  }

  ngOnDestroy(): void {
    // this.subscriptionname.unsubscribe();
    // this.subscriptionimage.unsubscribe();
    // this._headerService.unsubscribeFunc();
  }

  businessAcountSelected() {
    let password = new FormControl("", [
      Validators.required,
      Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH),
    ]);
    let prev_password = new FormControl("", [
      Validators.required,
      Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH),
    ]);

    let confirmPassword = new FormControl("", [
      Validators.required,
      CustomValidators.equalTo(password),
    ]);
    this.signUpForm = this.formBuilder.group({
      password: password,
      confirmPassword: confirmPassword,
      address1: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      city: [
        "",
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.CITY),
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      state: [""],
      postalCode: [
        "",
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.POSTAL_CODE),
        ],
      ],
      dateOfBirth: ["", [Validators.required]],
      ssn: [
        "",
        [Validators.required, Validators.pattern(genralConfig.pattern.SSN)],
      ],
      businessName: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      businessType: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      businessClassification: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      // phone:['',[Validators.required,Validators.pattern(genralConfig.pattern.PHONE_NO)]]
    });
    this.dwollaBusinessConnectSelected = true;
    this.userType = "business";
  }

  personalAccountSelected() {
    console.log("Personal acc selecteeeeeeeed!");
    let password = new FormControl("", [
      Validators.required,
      Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH),
    ]);
    let prev_password = new FormControl("", [
      Validators.required,
      Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH),
    ]);

    let confirmPassword = new FormControl("", [
      Validators.required,
      CustomValidators.equalTo(password),
    ]);
    this.signUpForm = this.formBuilder.group({
      password: password,
      confirmPassword: confirmPassword,
      address1: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      city: [
        "",
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.CITY),
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      state: [""],
      postalCode: [
        "",
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.POSTAL_CODE),
        ],
      ],
      dateOfBirth: ["", [Validators.required]],
      ssn: [
        "",
        [Validators.required, Validators.pattern(genralConfig.pattern.SSN)],
      ],
      // businessName: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.MAXLENGTH), Validators.minLength(genralConfig.pattern.MINLENGTH)]],
      // businessType: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.MAXLENGTH), Validators.minLength(genralConfig.pattern.MINLENGTH)]],
      // businessClassification:['', [Validators.required, Validators.maxLength(genralConfig.pattern.MAXLENGTH), Validators.minLength(genralConfig.pattern.MINLENGTH)]]
      // phone:['',[Validators.required,Validators.pattern(genralConfig.pattern.PHONE_NO)]]
    });
    this.dwollaBusinessConnectSelected = false;
    this.userType = "personal";
  }

  listMarketplaces() {
    this.loader = true;
    this.apiService.listMarketPlaces().subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loader = false;
        this.marketPlacesList = res.data;
      } else {
        this.loader = false;
        this.marketPlacesList = [];
      }
    });
  }

  checkMwsConnection() {
    this.apiService.checkMWSConnection().subscribe((res) => {
      console.log("mws connection response=====>", res);
      if (res.code == genralConfig.statusCode.ok) {
        this.isMwsConnected = true;

        if (res.data.marketplace_id == "A1AM78C64UM0Y8") {
          // mx
          this.region = "MX";
        } else if (res.data.marketplace_id == "A2EUQ1WTGCTBG2") {
          // ca
          this.region = "CA";
        } else if (res.data.marketplace_id == "ATVPDKIKX0DER") {
          // com
          this.region = "US";
        }

        if (res.data.isRemoved) {
          // this.isMwsConnected = true
          this.mwsConnectStatus = "Connect";
          this.isRemoveBtn = false;
        } else {
          // this.isMwsConnected = true
          this.mwsConnectStatus = "Connected";
          this.isRemoveBtn = true;
        }
      } else {
        this.isMwsConnected = false;
      }
    });
  }

  openDialog() {
    let confirmObj = {
      title: "Are you sure?",
      text: "You want to remove mws authorisation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    };

    this._genralServices.updateConfirmationBox(confirmObj).subscribe((res) => {
      console.log("Response from update confirmation=========>", res);
      if (res) {
        this.removeMwsAuth();
      } else {
        console.log("False console----_>", res);
      }
    });
  }

  enableMarketplace() {
    if (this.mwsConnectForm.value.marketplace_id == "A1AM78C64UM0Y8") {
      this.redirectionLink = `https://sellercentral.amazon.com.mx/gp/mws/registration/register.html?signInPageDisplayed=1&developerName=BrandExpand&devMWSAccountId=724030458169`;
    } else if (this.mwsConnectForm.value.marketplace_id == "A2EUQ1WTGCTBG2") {
      this.redirectionLink = `https://sellercentral.amazon.ca/gp/mws/registration/register.html?signInPageDisplayed=1&developerName=BrandExpand&devMWSAccountId=724030458169`;
    } else if (this.mwsConnectForm.value.marketplace_id == "ATVPDKIKX0DER") {
      this.redirectionLink = `https://sellercentral.amazon.com/gp/mws/registration/register.html?signInPageDisplayed=1&developerName=BrandExpand&devMWSAccountId=724030458169`;
    }
    this.isMarketPlaceSelected = true;
  }

  patchValuesInEditProfile() {
    this.editProfileForm.patchValue({
      firstname: this.loggedInUserDetails.firstname,
      lastname: this.loggedInUserDetails.lastname,
      email: this.loggedInUserDetails.email,
      companyname: this.loggedInUserDetails.companyname,
    });
  }

  removeMwsAuth() {
    this.loader = true;
    console.log("Remove mws auth call------------>");
    // this.mwsConnectStatus = "Connect"
    // this.isRemoveBtn = false;
    this.apiService.removeMWSConnection().subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loader = false;
        // this.toastr.success(res.message);
        let successObj = {
          title: "Removed",
          text: res.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        };
        this._genralServices
          .successNotification(successObj)
          .subscribe((res) => {
            console.log("response after success", res);
          });
        this.checkMwsConnection();
        // this.closedilog();
      } else {
        this.loader = false;
        this.toastr.error(res.message);
        this.closedilog();
      }
    });
  }

  mwsConnectBtn() {
    // this.mwsConnectStatus = "Connected"
    // this.isRemoveBtn = true;
    this.loader = true;
    if (this.mwsConnectStatus == "Connect") {
      this.apiService.connectMWSDetails().subscribe((res) => {
        if (res.code == genralConfig.statusCode.ok) {
          this.loader = false;
          this.toastr.success(res.message);
          this.checkMwsConnection();
        } else {
          this.loader = false;
          this.toastr.error(res.message);
          this.closedilog();
        }
      });
    } else {
      this.toastr.info("Your MWS Account already connected");
    }
  }

  updateProfilePic() {
    console.log("Upload new profile picture calling here.......");
    // this.loader = true;

    if (this.uploader.queue.length > 0) {
      this.loader = true;

      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (fileItem, response, status, headers) => {
        console.log(" on complete item response ==", JSON.parse(response));
        let res = JSON.parse(response);
        if (res.code == genralConfig.statusCode.ok) {
          this.loader = false;
          console.log("Succes msg------>", res.message);
          this.syncUserData();
          this.toastr.success(res.message);
        } else {
          this.loader = false;
          this.toastr.error(res.message);
        }
      };
    }
  }

  getNotification() {
    let notObj = {
      page: 1,
      isRead: "false",
    };
    this._genralServices.getNotifications(notObj).subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        // this.notificationCount = res.total;
        this._headerService.setNotificationCount(res.total.totalUnRead);
        this._headerService.getNotificationCount().subscribe((res) => {
          this.notificationCount = res;
        });
        this._headerService.setUnReadNotificationList(res.data);
        this._headerService.getUnReadNotificationList().subscribe((res) => {
          this.notificationList = res;
        });
      } else {
        this.notificationCount = 0;
        this.notificationList = [];
      }
    });
  }

  readNotification(id) {
    // console.log("Notification id is======>", id);
    let readNotid = {
      notification_id: id,
    };
    this._genralServices.readNotification(readNotid).subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        this.getNotification();
      } else {
      }
    });
  }

  // toggleSidebar(){
  //   document.getElementsByTagName('body')[0].classList.toggle('sidebarCollapsed');
  // }

  HideShowSidebar() {
    document
      .getElementsByTagName("body")[0]
      .classList.toggle("sidebar-collaps");
  }

  logOut() {
    this._webStorage.clearAll();
    this.router.navigate(["/"]);
    // this._loginService.logout().subscribe((res) => {
    //   if (res.code == genralConfig.statusCode.ok) {
    //     this.loggedInUserDetails = {};
    //     this.router.navigate(['/login']);
    //   } else {
    //     this.toastr.error(res.message)
    //   }
    // })
  }

  closedilog() {
    this.cPassword = false;
  }

  closeEditDilog() {
    this.isEditProfile = false;
  }

  openChangePassword() {
    this.cPassword = true;
    this.changePasswordForm.reset();
  }

  changePassword() {
    let objToAdd = {
      password: this.changePasswordForm.value.password,
      prev_password: this.changePasswordForm.value.prev_password,
      token: this.resettoken,
    };

    this._genralServices.createPassword(objToAdd).subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loader = false;
        this.toastr.success(res.message);
        this.closedilog();
      } else {
        this.loader = false;
        this.toastr.error(res.message);
        // this.closedilog();
      }
    });
  }

  submitProfile() {
    this.loader = true;

    this._genralServices
      .updateUserProfile(this.editProfileForm.value)
      .subscribe((res) => {
        if (res.code == genralConfig.statusCode.ok) {
          this.loader = false;
          this.toastr.success(res.message);
          this.syncUserData();
          this.closeEditDilog();
        } else if (res.code == genralConfig.statusCode.created) {
          this.loader = false;
          this.logOut();
          this.toastr.success(res.message);
        } else {
          this.loader = false;
          this.toastr.error(res.message);
          // this.closeEditDilog();
        }
      });
  }

  editProfile() {
    this.isEditProfile = true;
    this.patchValuesInEditProfile();
  }

  syncUserData() {
    this._genralServices.getUserDetails().subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loggedInUserDetails = res.data;
        this.getUserImage(this.loggedInUserDetails.profile_image);
        this.planName = res.data.plan_id
          ? res.data.plan_id.subscription_level_name
          : null;
        const userRole =
          this.loggedInUserDetails && this.loggedInUserDetails.role_id
            ? this.loggedInUserDetails.role_id.role || ""
            : "";
        if (userRole === "seller") {
          this.checkMwsConnection();
          this.getNotification();
          this.listMarketplaces();
          this.isSeller = true;
          this._headerService.setTitle(
            this.loggedInUserDetails.firstname +
              " " +
              this.loggedInUserDetails.lastname
          );
          this._headerService.setImage(this.loggedInUserDetails.profile_image);

          this.subscriptionname = this._headerService.username.subscribe(
            (username) => {
              this.username = username
                ? username
                : this.loggedInUserDetails.firstname +
                  " " +
                  this.loggedInUserDetails.lastname;
            }
          );
          // this.subscriptionimage = this._headerService.image.subscribe(url => {
          //   this.imageUrl = url;
          //   console.log("header image in url in header component is========>", this.imageUrl);
          // });
        }
      } else {
        this.loggedInUserDetails = {};
      }
    });
  }

  getUserImage(url: string) {
    console.log("Startin getUserImage in header component");
    this._genralServices.getImageLink(url).subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        console.log("This link from api is =====>", JSON.stringify(res));
        this.image = res;
      } else {
        this.image = res;
      }
    });
  }

  openDwollaConnectionInfo() {
    this.dwollaConnect = true;
    this.changePasswordForm.reset();
  }

  openDwollaConnectionBusinessInfo() {
    this.dwollaBusinessConnect = true;
    this.changePasswordForm.reset();
  }

  getState(event) {
    this.userState = event.value;
    this.signUpForm.value.state = event.value;
    console.log(this.userState, "this.userState");
  }

  getBusinessState(event) {
    this.userState = event.value;
    this.signUpBusinessForm.value.state = event.value;
    console.log(this.userState, "this.userState");
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    console.log([year, month, day].join("-"));
    return [year, month, day].join("-");
  }

  checkAge() {
    const a = moment(new Date());
    const b = moment(this.signUpForm.value.dateOfBirth);
    const dobDiff = a.diff(b, "years");
    if (dobDiff < 18) {
      this.toastr.error("Sorry!, your age must be 18 years or older.");
      this.loader = false;
      this.lessThan18 = true;
    } else {
      this.lessThan18 = false;
    }
  }

  checkBusinessAge() {
    const a = moment(new Date());
    const b = moment(this.signUpBusinessForm.value.businessDateOfBirth);
    const dobDiff = a.diff(b, "years");
    if (dobDiff < 18) {
      this.toastr.error("Sorry!, your age must be 18 years or older.");
      this.loader = false;
      this.lessThan18 = true;
    } else {
      this.lessThan18 = false;
    }
  }

  userRegister() {
    this.loader = true;

    this._genralServices.getUserDetails().subscribe((res) => {
      if (res.code === genralConfig.statusCode.ok) {
        console.log(res.data);
        const dataObject = {
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          email: res.data.email,
          role: "seller",
          address1: this.signUpForm.value.address1,
          city: this.signUpForm.value.city,
          password: this.signUpForm.value.password,
          state: this.userState,
          postalCode: this.signUpForm.value.postalCode,
          dateOfBirth: this.formatDate(this.signUpForm.value.dateOfBirth),
          ssn: this.signUpForm.value.ssn,
          type: this.userType,
          businessName: this.signUpForm.value.businessName,
          businessType: this.signUpForm.value.businessType,
          businessClassification: this.signUpForm.value.businessClassification,
          user: res.data,
        };
        console.log("This data object is ======>", dataObject);
        this.signUpService
          .dwollaUserRegistration(dataObject)
          .subscribe((response) => {
            console.log(response, "response after dwolla account creation");
            if (response.code === 200) {
              this.loader = false;
              this.registrationSucess = true;
              this.toastr.success(response.message);
            } else {
              console.log("This messsage is ======>", response);
              const message = JSON.parse(response.message);
              this.toastr.error(
                message._embedded.errors[0].message ||
                  "Some error occurred, try again later"
              );
              this.loader = false;
            }
          });
      } else {
        this.toastr.error(res.message);
        this.loader = false;
      }
    });
  }

  businessUserRegister() {
    console.log("Business registration");

    this.loader = true;

    this._genralServices.getUserDetails().subscribe((res) => {
      if (res.code === genralConfig.statusCode.ok) {
        console.log(res.data);

        const dataObject = {
          firstName: res.data.firstname,
          lastName: res.data.lastname,
          email: res.data.email,
          // email: 'ntss@tut.by',
          role: "seller",
          address1: this.signUpBusinessForm.value.address1,
          city: this.signUpBusinessForm.value.city,
          password: this.signUpBusinessForm.value.password,
          state: this.userState,
          postalCode: this.signUpBusinessForm.value.postalCode,
          dateOfBirth: this.formatDate(
            this.signUpBusinessForm.value.businessDateOfBirth
          ),
          ssn: this.signUpBusinessForm.value.ssn,
          type: "business",
          businessName: this.signUpBusinessForm.value.businessName,
          businessType: this.signUpBusinessForm.value.businessType,
          businessClassification: this.signUpBusinessForm.value
            .businessClassification,
          user: res.data,
        };
        console.log("This data object is ======>", dataObject);
        this.signUpService
          .dwollaUserRegistration(dataObject)
          .subscribe((response) => {
            console.log(response, "response after dwolla account creation");
            if (response.code === 200) {
              this.loader = false;
              this.registrationSucess = true;
              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.message);
              this.loader = false;
            }
          });
      } else {
        this.toastr.error(res.message);
        this.loader = false;
      }
    });
  }

  mwsOpenDialog() {
    this.mwsConnect = true;
    this.checkMwsConnection();
  }

  mwsConnection() {
    this.loader = true;
    // this.mwsConnectForm.value.marketplace_id = " "
    this.apiService
      .addSellerMWSDetails(this.mwsConnectForm.value)
      .subscribe((res) => {
        if (res.code == genralConfig.statusCode.ok) {
          console.log("after adding mws in ctrl===>", res);
          this.loader = false;
          this.toastr.success(res.message);
          this.checkMwsConnection();
        } else {
          this.loader = false;
          this.toastr.error(res.message);
        }
      });
  }

  setMarketPlace(m_id) {
    console.log("marketplace Id=====>", m_id);
  }

  // Billing section

  bilOpenDialog() {
    this.router.navigate(["layout/seller/billing"]);
  }

  profile() {
    // switch (this.loggedInUserDetails.role_id.name) {
    //   case "Law firms": {
    //     this.router.navigate(['/layout/lawfirm/profile']);
    //     break;
    //   }
    //   case "Lawyer": {
    //     this.router.navigate(['/layout/lawyer/profile']);
    //     break;
    //   }
    //   case "Admin": {
    //     this.router.navigate(['/layout/admin/profile']);
    //     break;
    //   }
    //   case "Insurance company": {
    //     this.router.navigate(['/layout/insurancecompany/profile']);
    //     break;
    //   }
    //   case "Case manager": {
    //     this.router.navigate(['/layout/casemanager/profile']);
    //     break;
    //   }
    //   case "Patient": {
    //     this.router.navigate(['/layout/patient/profile']);
    //     break;
    //   }
    //   case "Specialist": {
    //     this.router.navigate(['/layout/Specialist/profile']);
    //     break;
    //   }
    // }
  }

  //Payment details
  openPaymentDetails() {
    this.paymentDetailsTab = true;
    this.paymentLoader = true;

    this.apiService.retrieveFundingSource().subscribe((res) => {
      this.paymentLoader = false;
      this.loaderIAV = false;
      if (res.code === 200) {
        this.financialData = res.data;
      } else {
        this.financialData = null;
      }
    });
  }
  closePaymentDetails() {
    this.paymentDetailsTab = false;
  }

  createIAVToken() {
    this.loaderIAV = true;
    this.displayDialog = true;
    this.closePaymentDetails();

    this.apiService.getFundingSourceToken().subscribe((tokenRes) => {
      if (tokenRes.code === 200) {
        const iavToken = tokenRes.data.token;
        dwolla.configure("sandbox");

        dwolla.iav.start(
          iavToken,
          {
            container: "iavContainer",
            stylesheets: [
              "https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext",
            ],
            microDeposits: true,
            fallbackToMicroDeposits: true,
            backButton: true,
            subscriber: ({ currentPage, error }) => {
              console.log(
                "currentPage:",
                currentPage,
                "error:",
                JSON.stringify(error)
              );
              if (currentPage == "BankSearch") {
                this.loaderIAV = false;
              }
            },
          },
          (err, res) => {
            console.log("trueeeeeeeee");
            this.loaderIAV = false;
            if (res) {
              const data = {
                fundingSourceHref: res._links["funding-source"].href,
              };
              this.apiService.setFundingSource(data).subscribe((finaleRes) => {
                if (finaleRes.code === 200) {
                  this.loaderIAV = false;
                } else {
                  this.loaderIAV = false;
                }
              });
            }
          }
        );
      } else {
        this.loaderIAV = false;
        this.displayDialog = false;
        this.toastr.error(tokenRes.message);
      }
    });
  }

  closeViewdilog() {
    this.displayDialog = false;
  }
}
