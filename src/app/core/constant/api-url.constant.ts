import { environment } from '../../../environments/environment';

export class ApiUrlConstant {
  private static appurl = environment.apiUrl;

  // user api
  public static get REGISTRATION(): string {
    return this.appurl + '/public/userRegistration';
  }

  public static get FORGOTPASSWORD(): string {
    return this.appurl + '/public/forgetPassword';
  }

  public static get LOGIN(): string {
    return this.appurl + '/public/userLogin';
  }

  public static get LOGOUT(): string {
    return this.appurl + '/public/user/userLogout';
  }

  public static get GETUSERDETAILS(): string {
    return this.appurl + '/aureum/getUserDetails';
  }

  public static get GETIMAGE(): string {
    return this.appurl + '/uploads/profile/';
  }

  public static get UPLOADPROFILE(): string {
    return this.appurl + '/uploadUserProfilePic';
  }

  public static get GETPERMISSION(): string {
    return this.appurl + '/aureum/getSubAdminPermission';
  }

  public static get GETGIVEAWAYDATA(): string {
    return this.appurl + '/aureum/getGiveawayData';
  }

  public static get GETSUBSCRIPTIONPLANS(): string {
    return this.appurl + '/public/getSubscriptionList';
  }

  public static get GETBANKINFOLIST(): string {
    return this.appurl + '/aureum/getBankInfoList';
  }

  public static get UPDATEBANKINFO(): string {
    return this.appurl + '/aureum/updateBankInfo';
  }

  public static get GETCATEGORYLIST(): string {
    return this.appurl + '/aureum/listCategory';
  }

  public static get UPDATEDEALCATEGORY(): string {
    return this.appurl + '/aureum/deal';
  }

  // Instruction api
  public static get GETINSTRUCTIONDATA(): string {
    return this.appurl + '/aureum/listInstructions';
  }

  public static get ADDINSTRUCTIONDATA(): string {
    return this.appurl + '/aureum/addInstruction';
  }

  public static get EDITINSTRUCTIONDATA(): string {
    return this.appurl + '/aureum/editInstruction';
  }

  public static get DELETEINSTRUCTIONDATA(): string {
    return this.appurl + '/aureum/deleteInstruction';
  }

  public static get UPDATEINSDATA(): string {
    return this.appurl + '/aureum/updateINSData';
  }

  // admin api
  public static get LISTALLSELLERS(): string {
    return this.appurl + '/aureum/listAllSellers';
  }

  public static get XSLXSellers(): string {
    return this.appurl + '/aureum/XLSXSellers';
  }

  public static get LISTALLREFERALS(): string {
    return this.appurl + '/aureum/referals';
  }

  public static get LISTALLBUYERS(): string {
    return this.appurl + '/aureum/listAllBuyers';
  }

  public static get GETLISTSTATUSESBUYER(): string {
    return this.appurl + '/aureum/buyers/statuses';
  }

  public static get XSLXBuyers(): string {
    return this.appurl + '/aureum/XLSXBuyers';
  }

  public static get UPDATESTATUSBUYER(): string {
    return this.appurl + '/aureum/buyers';
  }

  public static get DELETEBUYERBYID(): string {
    return this.appurl + '/aureum/deleteBuyer';
  }

  public static get STATANALYSIS(): string {
    return this.appurl + '/aureum/statsAnalysis';
  }

  public static get LISTALLORDERSFORSETUPT(): string {
    return this.appurl + '/aureum/listProductsForAdmin';
  }

  public static get CANCELPRODUCTLAUNCHBYADMIN(): string {
    return this.appurl + '/aureum/productLaunch/';
  }

  public static get EDITPRODUCTLAUNCHBYADMIN(): string {
    return this.appurl + '/aureum/productLaunch/';
  }

  public static get GETPRODUCTLAUNCHDETAILSFORADMIN(): string {
    return this.appurl + '/aureum/productLaunch/';
  }

  public static get GETALLORDERS(): string {
    return this.appurl + '/aureum/orders?';
  }

  public static get XSLXORDERS(): string {
    return this.appurl + '/aureum/XLSXOrders?';
  }

  public static get GETALLORDERHISTORY(): string {
    return this.appurl + '/aureum/orders/';
  }

  public static get GETBUYERSCOUNT(): string {
    return this.appurl + '/aureum/getBuyersCount';
  }

  public static get GETPRODUCTSCOUNT(): string {
    return this.appurl + '/aureum/getProductCount';
  }

  public static get GETSELERSCOUNT(): string {
    return this.appurl + '/aureum/getSelersCount';
  }

  public static get GETORDERSCOUNT(): string {
    return this.appurl + '/aureum/getOrderCount';
  }

  public static get GETSTATSCOUNT(): string {
    return this.appurl + '/aureum/getStatsCount';
  }

  public static get UPDATEUSERLOGIN(): string {
    return this.appurl + '/aureum/updateUserLogin';
  }

  public static get CHANGESELLERDATABYADMIN(): string {
    return this.appurl + '/aureum/changeSellerDataByAdmin';
  }

  // admin api for staff
  public static get GETSTAFFLIST(): string {
    return this.appurl + '/aureum/listSubAdmin';
  }

  public static get DELETESTAFF(): string {
    return this.appurl + '/aureum/deleteSubAdmin';
  }

  public static get UPDATESTAFF(): string {
    return this.appurl + '/aureum/updateSubAdmin';
  }

  public static get ADDSTAFF(): string {
    return this.appurl + '/aureum/addSubAdmin';
  }

  public static get XLSXSTAFF(): string {
    return this.appurl + '/aureum/XLSXStaffs';
  }

  // Admin api for Bonus codes

  public static get ADDBONUSCODE(): string {
    return this.appurl + '/aureum/createBonusCode';
  }

  public static get GETBONUSCODELIST(): string {
    return this.appurl + '/aureum/listBonusCodes';
  }

  public static get DELETEBONUSCODE(): string {
    return this.appurl + '/aureum/deleteBonusCode';
  }

  public static get RESETPASSWORD(): string {
    return this.appurl + '/public/changePassword';
  }

  public static get VERIFYEMAIL(): string {
    return this.appurl + '/public/verifyEmail';
  }

  public static get READNOTIFICATION(): string {
    return this.appurl + '/public/readNotification';
  }

  public static get UPDATEUSERPROFILE(): string {
    return this.appurl + '/aureum/updateUserName';
  }

  public static get CHANGEPASSWORD(): string {
    return this.appurl + '/public/user/changePassword';
  }

  public static get ACCEPTORREJECTREQUEST(): string {
    return this.appurl + '/public/user/acceptOrRejectRequest';
  }

  // notifiaction API
  public static get NOTIFICATIONLISTING(): string {
    return this.appurl + '/public/notification/notificationListing';
  }

  // user notifiaction API
  public static get USER_NOTIFICATION_LIST(): string {
    return this.appurl + '/aureum/notifications';
  }

  // profile
  public static get EDITPROFILE(): string {
    return this.appurl + '/public/user/editProfile';
  }

  public static get USERDETAILS(): string {
    return this.appurl + '/public/user/getProfile';
  }

  // create password
  public static get CHECKURL(): string {
    return this.appurl + '/public/user/checkUrl';
  }

  // faqs

  public static get ADDFAQ(): string {
    return this.appurl + '/aureum/addFAQByAdmin';
  }

  public static get LISTALLFAQS(): string {
    return this.appurl + '/aureum/listFAQByAdmin';
  }

  public static get DELETEFAQ(): string {
    return this.appurl + '/aureum/deleteFaq';
  }

  public static get ANSWERFAQ(): string {
    return this.appurl + '/aureum/answerFaq';
  }

  public static get UPDATEFAQSTATUS(): string {
    return this.appurl + '/aureum/approveFaq';
  }

  // testimonials
  public static get LISTALLTESTIMONIALS(): string {
    return this.appurl + '/aureum/listTestimonialForAdmin';
  }

  public static get APPROVETESTIMONIAL(): string {
    return this.appurl + '/aureum/approveTestimonial';
  }

  public static get DELETETESTIMONIAL(): string {
    return this.appurl + '/aureum/deleteTestm';
  }

  // Deals
  public static get LISTALLDEALS(): string {
    return this.appurl + '/aureum/listDealsForAdmin';
  }

  public static get DELETEDEAL(): string {
    return this.appurl + '/aureum/deleteDeal';
  }

  public static get XSLXDeals(): string {
    return this.appurl + '/aureum/XLSXDeals';
  }

  // Subscription
  public static get LISTSUBSCRIPTIONPLAN(): string {
    return this.appurl + '/public/getSubscriptionList';
  }

  public static get DELETESUBSCRIPTION(): string {
    return this.appurl + '/aureum/deleteSubscription';
  }

  public static get ADDSUBSCRIPTION(): string {
    return this.appurl + '/aureum/addSubscriptionPlan';
  }

  public static get UPDATESUBSCRIPTION(): string {
    return this.appurl + '/aureum/updateSubscriptionPlan';
  }

  // Rembursement

  public static get UPDATEQUESTIONNIRE(): string {
    return this.appurl + '/aureum/product';
  }

  public static get GETREMBURSEMENT(): string {
    return this.appurl + '/aureum/reimbursements?';
  }

  public static get PAYPENDINGBALANCE(): string {
    return this.appurl + '/aureum/pendingBalance';
  }

  public static get COMPLETED_PAYMENT_CHECK(): string {
    return this.appurl + '/aureum/pending-balance-check';
  }

  public static get IMPORTSELLERCOLLECTION(): string {
    return this.appurl + '/aureum/importUsersIntoSellerCollection';
  }

  public static get IMPORTBUYERCOLLECTION(): string {
    return this.appurl + '/aureum/importUsersIntoBuyerCollection';
  }

  public static get APPROVEPRODUCTLAUNCH(): string {
    return this.appurl + '/aureum/approveLaunchProducts';
  }

  public static get GETSPECIALDEALSFORADMIN(): string {
    return this.appurl + '/aureum/getSpecialDealsForAdmin';
  }

  public static get SETSPECIALDEALS(): string {
    return this.appurl + '/aureum/setSpecialDeals';
  }

  public static get GET_LIST_TIERS(): string {
    return this.appurl + '/aureum/tiers';
  }

  // update tier
  public static get UPDATE_TIER(): string {
    return this.appurl + '/aureum/tier';
  }

  // Dump all orders endpoint
  public static get DUMP_ALL_ORDERS(): string {
    return this.appurl + '/aureum/dump-orders';
  }

  // Wallet endpoints
  public static get GET_WALLET(): string {
    return this.appurl + '/aureum/wallet';
  }

  public static get UPDATE_WALLET(): string {
    return this.appurl + '/aureum/wallet/balance';
  }

  public static get GET_WALLET_HISTORY(): string {
    return this.appurl + '/aureum/wallet/history';
  }

  public static get GET_WALLET_BASE_HISTORY(): string {
    return this.appurl + '/aureum/wallet';
  }
}
