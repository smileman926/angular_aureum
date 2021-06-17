import { environment } from "../../../environments/environment";

export class ApiUrlConstant {
  private static appurl = environment.apiUrl;

  // master api
  public static get GETCOUNTRIES(): string {
    return this.appurl + "/country/getAllCountry";
  }

  public static get GETSTATES(): string {
    return this.appurl + "/state/getAllState";
  }

  public static get GETCASESTATES(): string {
    return this.appurl + "/caseState/getAllCaseState";
  }

  public static get GETCASETYPES(): string {
    return this.appurl + "/casesType/getAllcaseType";
  }

  public static get GETDETAIL(): string {
    return this.appurl + "/casesType/getDetail";
  }

  public static get GETSPCLREQMT(): string {
    return this.appurl + "/specialRequirement/getAllspecialRqmt";
  }

  public static get GETICCOMPANIES(): string {
    return this.appurl + "/user/getIncurenceCompanies";
  }

  public static get GETCASEMANAGER(): string {
    return this.appurl + "/user/getCaseManager";
  }

  public static get LISTALLCOUNTRIES(): string {
    return this.appurl + "/country/listAllCountries";
  }

  public static get ADDCOUNTRY(): string {
    return this.appurl + "/country/addCountry";
  }

  public static get GETCOUNTRYDETAILS(): string {
    return this.appurl + "/country/getCountryDetails";
  }

  public static get EDITCOUNTRY(): string {
    return this.appurl + "/country/editCountry";
  }

  public static get DELETECOUNTRY(): string {
    return this.appurl + "/country/deleteCountry";
  }

  public static get ACTIVEDEACTIVECOUNTRY(): string {
    return this.appurl + "/country/activeDeactive";
  }

  public static get LISTALLSTATES(): string {
    return this.appurl + "/state/listAllStates";
  }

  public static get DELETESTATE(): string {
    return this.appurl + "/state/deleteState";
  }

  public static get ADDSTATE(): string {
    return this.appurl + "/state/addState";
  }

  public static get GETSTATEDETAILS(): string {
    return this.appurl + "/state/getStateDetails";
  }

  public static get EDITSTATE(): string {
    return this.appurl + "/state/editState";
  }

  public static get ACTIVEDEACTIVESTATE(): string {
    return this.appurl + "/state/activeDeactive";
  }

  public static get GETREPORTTYPES(): string {
    return this.appurl + "/reporttype/reportTypeList";
  }

  public static get GETREPORTDETAILS(): string {
    return this.appurl + "/reporttype/getReportDetails";
  }

  public static get GETSPECIALITYLIST(): string {
    return this.appurl + "/skills/getAllSkill";
  }

  public static get LISTALLCASESTATES(): string {
    return this.appurl + "/caseState/listAllCaseStates";
  }

  public static get ADDEDITCASESTATE(): string {
    return this.appurl + "/caseState/addEditCaseState";
  }

  public static get GETCASESTATEDETAILS(): string {
    return this.appurl + "/caseState/getCaseStateDetails";
  }

  public static get DELETECASESTATE(): string {
    return this.appurl + "/caseState/deleteCaseState";
  }

  public static get ACTIVEDEACTIVECASESTATE(): string {
    return this.appurl + "/caseState/activeDeactive";
  }

  public static get LISTLAWFIRMS(): string {
    return this.appurl + "/lawfirm/listLawfirms";
  }

  public static get GETLAWFIRMDETAILS(): string {
    return this.appurl + "/lawfirm/getLawfirmDetails";
  }

  public static get EDITLAWFIRM(): string {
    return this.appurl + "/lawfirm/editLawfirm";
  }

  public static get DELETELAWFIRM(): string {
    return this.appurl + "/lawfirm/deleteLawfirm";
  }

  public static get ADDLAWFIRM(): string {
    return this.appurl + "/lawfirm/addLawfirm";
  }

  public static get LISTPATIENTS(): string {
    return this.appurl + "/patient/listPatients";
  }

  public static get GETPATIENTDETAILS(): string {
    return this.appurl + "/patient/getPatientDetails";
  }

  public static get LISTLAWYERS(): string {
    return this.appurl + "/admin/ListLawyer";
  }

  public static get EDITPATIENT(): string {
    return this.appurl + "/patient/editPatientDetails";
  }

  public static get ADDPATIENT(): string {
    return this.appurl + "/patient/addPatientDetails";
  }

  public static get ACTIVEDEACTIVEPATIENT(): string {
    return this.appurl + "/patient/activeDeactivePatient";
  }

  public static get EDITSPECIALISTLOCATION(): string {
    return this.appurl + "/specialist/editSpecialistLocation";
  }

  public static get DELETESPECIALISTDOCUMENT(): string {
    return this.appurl + "/specialist/deleteSpecialistDocument";
  }

  public static get SAVENEGILENCE(): string {
    return this.appurl + "/medicalnegligence/addMedicalNegligenceRequest";
  }

  public static get LISTNEGLIGENCE(): string {
    return this.appurl + "/medicalnegligence/medicalNegligenceList";
  }

  public static get NEGLIGENCEDETAILS(): string {
    return this.appurl + "/medicalnegligence/getMedicalNegligenceDetails";
  }

  // user api
  public static get REGISTRATION(): string {
    return this.appurl + "/userRegistration";
  }

  public static get FORGOTPASSWORD(): string {
    return this.appurl + "/forgetPassword";
  }

  public static get LOGIN(): string {
    return this.appurl + "/userLogin";
  }

  public static get GETUSERDETAILS(): string {
    return this.appurl + "/getUserDetails";
  }

  public static get GETIMAGE(): string {
    return this.appurl + "/uploads/profile/";
  }

  public static get UPLOADPROFILE(): string {
    return this.appurl + "/uploadUserProfilePic";
  }

  public static get GETNOTIFICATIONS(): string {
    return this.appurl + "/getNotificationList";
  }

  public static get ADDCONTACTDETAILS(): string {
    return this.appurl + "/getInTouch";
  }

  // Dwolla
  public static get DWOLLAREGISTRATION(): string {
    return this.appurl + "/dwollaUserRegistration";
  }

  public static get GETFUNDINGSOURCETOKEN(): string {
    return this.appurl + "/getFundingSourceToken";
  }

  public static get SETFUNDINGSOURCE(): string {
    return this.appurl + "/setFundingSource";
  }

  public static get INITIATETRANSFER(): string {
    return this.appurl + "/initiateTransfer";
  }

  public static get CREATEPROCCESSORTOKEN(): string {
    return this.appurl + "/createProcessorToken";
  }

  public static get RETRIEVEFUNDINGSOURCE(): string {
    return this.appurl + "/retrieveFundingSource";
  }

  public static get INITIATETRANSFERBYSELLER(): string {
    return this.appurl + "/initiateTransferBySeller";
  }

  // Product api
  public static get GETPRODUCTDETAILSFROMASIN(): string {
    return this.appurl + "/getProductDetailsFromASIN/";
  }

  public static get ADDPRODUCT(): string {
    return this.appurl + "/addProduct";
  }

  public static get EDITPRODUCT(): string {
    return this.appurl + "/editProduct";
  }

  public static get UPLOADPODUCTPIC(): string {
    return this.appurl + "/uploadProductPic";
  }

  public static get LISTSELLERPRODUCT(): string {
    return this.appurl + "/listSellerProducts";
  }

  public static get DELETESELLERPRODUCT(): string {
    return this.appurl + "/deleteProduct/";
  }

  public static get DELETESELLERLAUNCH(): string {
    return this.appurl + "/deleteLaunch/";
  }

  public static get GETCERTAINPRODUCTFORLAUNCH(): string {
    return this.appurl + "/getCertainProductForLaunch/";
  }

  public static get GETSELLERPRODUCTBYID(): string {
    return this.appurl + "/getProductDetails/";
  }

  public static get GETGIVEAWAYOPTIONSCOST(): string {
    return this.appurl + "/listGiveawayCost";
  }

  public static get ADDPRODUCTLAUNCH(): string {
    return this.appurl + "/addProductLaunch";
  }

  public static get ADDEVERGREENPRODUCTLAUNCH(): string {
    return this.appurl + "/addEverGreenProductLaunch";
  }

  public static get ADDSAVEDPRODUCTLAUNCH(): string {
    return this.appurl + "/addSavedProductLaunch";
  }

  public static get EXECUTEPAYMENT(): string {
    return this.appurl + "/executePayment";
  }

  public static get EXECUTEPAYMENTFORPLAN(): string {
    return this.appurl + "/executePaymentForPlan";
  }

  public static get GETGIVEAWAYDATA(): string {
    return this.appurl + "/getGiveawayData";
  }

  public static get GETSUBSCRIPTIONPLANS(): string {
    return this.appurl + "/getSubscriptionList";
  }

  public static get GETBANKINFOLIST(): string {
    return this.appurl + "/getBankInfoList";
  }

  public static get UPDATEBANKINFO(): string {
    return this.appurl + "/updateBankInfo";
  }

  public static get GETCATEGORYLIST(): string {
    return this.appurl + "/listCategory";
  }

  public static get UPDATEDEALCATEGORY(): string {
    return this.appurl + "/aureum/deal";
  }

  // Instruction api
  public static get GETINSTRUCTIONDATA(): string {
    return this.appurl + "/listInstructions";
  }

  public static get ADDINSTRUCTIONDATA(): string {
    return this.appurl + "/addInstruction";
  }

  public static get EDITINSTRUCTIONDATA(): string {
    return this.appurl + "/editInstruction";
  }

  public static get DELETEINSTRUCTIONDATA(): string {
    return this.appurl + "/deleteInstruction";
  }

  public static get UPDATEINSDATA(): string {
    return this.appurl + "/updateINSData";
  }

  // Billing api
  public static get SELLERBILLINGHISTORY(): string {
    return this.appurl + "/sellerBillingHistory";
  }

  public static get GETBILLINGHDETAIL(): string {
    return this.appurl + "/billingDetails/";
  }

  // admin api
  public static get LISTALLSELLERS(): string {
    return this.appurl + "/listAllSellers";
  }

  public static get LISTALLREFERALS(): string {
    return this.appurl + "/referals";
  }

  public static get LISTALLBUYERS(): string {
    return this.appurl + "/listAllBuyers";
  }

  public static get GETLISTSTATUSESBUYER(): string {
    return this.appurl + "/buyers/statuses";
  }

  public static get UPDATESTATUSBUYER(): string {
    return this.appurl + "/buyers";
  }

  public static get DELETEBUYERBYID(): string {
    return this.appurl + "/deleteBuyer";
  }

  public static get STATANALYSIS(): string {
    return this.appurl + "/statsAnalysis";
  }

  public static get LISTALLORDERSFORSETUPT(): string {
    return this.appurl + "/listProductsForAdmin";
  }

  public static get GETALLORDERS(): string {
    return this.appurl + "/aureum/orders?";
  }

  public static get GETBUYERSCOUNT(): string {
    return this.appurl + "/getBuyersCount";
  }

  public static get GETPRODUCTSCOUNT(): string {
    return this.appurl + "/getProductCount";
  }

  public static get GETSELERSCOUNT(): string {
    return this.appurl + "/getSelersCount";
  }

  public static get GETORDERSCOUNT(): string {
    return this.appurl + "/getOrderCount";
  }

  public static get GETSTATSCOUNT(): string {
    return this.appurl + "/getStatsCount";
  }

  public static get UPDATEUSERLOGIN(): string {
    return this.appurl + "/updateUserLogin";
  }

  public static get CHANGESELLERDATABYADMIN(): string {
    return this.appurl + "/changeSellerDataByAdmin";
  }

  // admin api for staff
  public static get GETSTAFFLIST(): string {
    return this.appurl + "/listSubAdmin";
  }

  public static get DELETESTAFF(): string {
    return this.appurl + "/deleteSubAdmin";
  }

  public static get UPDATESTAFF(): string {
    return this.appurl + "/updateSubAdmin";
  }

  public static get ADDSTAFF(): string {
    return this.appurl + "/addSubAdmin";
  }

  public static get ADDBONUSCODE(): string {
    return this.appurl + "/createBonusCode";
  }

  public static get GETBONUSCODELIST(): string {
    return this.appurl + "/listBonusCodes";
  }

  public static get DELETEBONUSCODE(): string {
    return this.appurl + "/deleteBonusCode";
  }

  public static get GETPERMISSION(): string {
    return this.appurl + "/getSubAdminPermission";
  }

  // MWS api
  public static get ADDSELLERMWSDETAILS(): string {
    return this.appurl + "/addSellerMWSDetails";
  }

  public static get CHECKMWSCONNECTION(): string {
    return this.appurl + "/checkMWSConnection";
  }

  public static get REMOVEMWSCONNECTION(): string {
    return this.appurl + "/removeMWSDetails";
  }

  public static get CONNECTMWSCONNECTION(): string {
    return this.appurl + "/connectMWSDetails";
  }

  public static get LISTMARKETPLACES(): string {
    return this.appurl + "/listMarketplace";
  }

  public static get GETBANKACCOUNTDETAILS(): string {
    return this.appurl + "/getBankDetails";
  }

  public static get LOGOUT(): string {
    return this.appurl + "/user/userLogout";
  }

  public static get RESETPASSWORD(): string {
    return this.appurl + "/changePassword";
  }

  public static get VERIFYEMAIL(): string {
    return this.appurl + "/verifyEmail";
  }

  public static get READNOTIFICATION(): string {
    return this.appurl + "/readNotification";
  }

  public static get UPDATEUSERVIDEOTUTORIAL(): string {
    return this.appurl + "/UPDATEUSERVIDEOTUTORIAL";
  }

  public static get UPDATEUSERPROFILE(): string {
    return this.appurl + "/updateUserName";
  }

  public static get CHANGEPASSWORD(): string {
    return this.appurl + "/user/changePassword";
  }

  public static get ACCEPTORREJECTREQUEST(): string {
    return this.appurl + "/user/acceptOrRejectRequest";
  }

  public static get ACTIVEDEACTIVEUSER(): string {
    return this.appurl + "/user/activeDeactiveUser";
  }

  // notifiaction API
  public static get NOTIFICATIONLISTING(): string {
    return this.appurl + "/notification/notificationListing";
  }

  // add new case
  public static get ADDNEWCASE(): string {
    return this.appurl + "/case/addNewCase";
  }

  public static get EDITCASE(): string {
    return this.appurl + "/case/EditCase";
  }

  public static get CASELISTING(): string {
    return this.appurl + "/case/getCaseList";
  }

  public static get CASEDETAIL(): string {
    return this.appurl + "/case/getCaseDetail";
  }

  public static get DELCASE(): string {
    return this.appurl + "/case/deleteCase";
  }

  public static get ACTIVEDEACTIVECASE(): string {
    return this.appurl + "/case/activeDeactiveCase";
  }

  public static get UPDATECASEAFTERCREATEFOLDER(): string {
    return this.appurl + "/case/updateCaseAfterCreateFolder";
  }

  // lawyer
  public static get ADDLAWYER(): string {
    return this.appurl + "/lawyer/addLawyer";
  }

  // public static get DELETELAWYER(): string { return this.appurl + '/lawyer/deleteLawyer'};
  // profile
  public static get EDITPROFILE(): string {
    return this.appurl + "/user/editProfile";
  }

  public static get USERDETAILS(): string {
    return this.appurl + "/user/getProfile";
  }

  public static get LISTLAWYER(): string {
    return this.appurl + "/lawyer/listLawyer";
  }

  public static get GETLAWYERDETAILS(): string {
    return this.appurl + "/lawyer/getLawyerDetails";
  }

  public static get EDITLAWYER(): string {
    return this.appurl + "/lawyer/editLawyer";
  }

  public static get DELETELAWYER(): string {
    return this.appurl + "/lawyer/deleteLawyer";
  }

  // create password
  public static get CHECKURL(): string {
    return this.appurl + "/user/checkUrl";
  }

  public static get CHECKPATIENTACTIVATIONURL(): string {
    return this.appurl + "/patient/checkPatientActivationUrl";
  }

  public static get RESETPATIENTPASSWORD(): string {
    return this.appurl + "/patient/resetPatientPassword";
  }

  // Report type
  public static get ADDOREDITREPORTTYPE(): string {
    return this.appurl + "/reporttype/addEditreporttype";
  }

  public static get DELETEREPORTTYPE(): string {
    return this.appurl + "/reporttype/deletereporttype";
  }

  public static get ACTIVEDEACTIVEREPORTTYPE(): string {
    return this.appurl + "/reporttype/activeDeactive";
  }

  public static get GETREPORTDETAIL(): string {
    return this.appurl + "/reporttype/getReportDetails";
  }

  // SPECIALITY
  public static get ADDSPECIALITY(): string {
    return this.appurl + "/skills/addSkill";
  }

  public static get EDITSPECIALITY(): string {
    return this.appurl + "/skills/editSkill";
  }

  public static get DELETESPECIALITY(): string {
    return this.appurl + "/skills/deleteSkill";
  }

  public static get GETSPECIALITYDETAILS(): string {
    return this.appurl + "/skills/getSpecialityDetails";
  }

  public static get ACTIVEDEACTIVESKILL(): string {
    return this.appurl + "/skills/activeDeactiveSkill";
  }

  // SPECIALIST
  public static get ADDSPECIALIST(): string {
    return this.appurl + "/specialist/addSpecialist";
  }

  public static get LISTSPECIALIST(): string {
    return this.appurl + "/specialist/SpecialistList";
  }

  public static get VIEWSPECIALIST(): string {
    return this.appurl + "/specialist/addSpecialist";
  }

  public static get EDITSPECIALIST(): string {
    return this.appurl + "/specialist/editSpecialist";
  }

  public static get EDITSPECIALISTPROFILE(): string {
    return this.appurl + "/specialist/editProfile";
  }

  public static get EDITSPECIALISTMULTILOCATION(): string {
    return this.appurl + "/specialist/updateMultiLocations";
  }

  public static get DELETESPECIALIST(): string {
    return this.appurl + "/specialist/deleteSpecialist";
  }

  public static get GETSPECIALISTDETAILS(): string {
    return this.appurl + "/specialist/getSpecialistDetail";
  }

  public static get UPLOADDOCUMENT(): string {
    return this.appurl + "/specialist/uploadDocument";
  }

  // clinic module
  public static get ADDCLINIC(): string {
    return this.appurl + "/clinic/addClinic";
  }

  public static get CLINICLISTING(): string {
    return this.appurl + "/clinic/listClinic";
  }

  public static get DELETECLINIC(): string {
    return this.appurl + "/clinic/deleteClinic";
  }

  public static get GETCLINIC(): string {
    return this.appurl + "/clinic/getClinicDetails";
  }

  public static get EDITCLINIC(): string {
    return this.appurl + "/clinic/editClinic";
  }

  public static get ACTIVEEACTIVECLINIC(): string {
    return this.appurl + "/clinic/activeDeactive";
  }

  public static get AMALISTING(): string {
    return this.appurl + "/amaQualification/getAllAMA";
  }

  public static get ACTIVEDEACTIVEAMA(): string {
    return this.appurl + "/amaQualification/activeDeactiveAMA";
  }

  public static get ADDQUALIFICATION(): string {
    return this.appurl + "/amaQualification/addQualification";
  }

  public static get EDITQUALIFICATION(): string {
    return this.appurl + "/amaQualification/editQualification";
  }

  public static get GETQUALIFICATION(): string {
    return this.appurl + "/amaQualification/GetQualification";
  }

  public static get DELETEAMA(): string {
    return this.appurl + "/amaQualification/deleteAMA";
  }

  // specialist
  public static get ADDSPECIALISTLOCATION(): string {
    return this.appurl + "/specialist/addSpecialistLocations";
  }

  public static get LISTSPECIALISTLOCATIONS(): string {
    return this.appurl + "/specialist/listSpecialistLocations";
  }

  public static get DELETESPECIALISTLOCATION(): string {
    return this.appurl + "/specialist/deleteSpecialistLocation";
  }

  public static get ADDSPECIALISTAVAILABILITY(): string {
    return this.appurl + "/specialistAvailability/setSpecialistAvailability";
  }

  public static get GETSPECIALISTAVAILABILITY(): string {
    return this.appurl + "/specialistAvailability/getSpecialistAvailability";
  }

  public static get SEARCHSPECIALIST(): string {
    return this.appurl + "/specialist/searchSpecialist";
  }

  public static get SEARCHSLOCATIONS(): string {
    return this.appurl + "/specialist/searchLocations";
  }

  public static get FILTERSPECIALIST(): string {
    return this.appurl + "/specialist/filterSpecialist";
  }

  // document
  public static get ADDFOLDER(): string {
    return this.appurl + "/document/addFolder";
  }

  public static get DOCLIST(): string {
    return this.appurl + "/document/docListing";
  }

  public static get DELFILE(): string {
    return this.appurl + "/document/deleteFileOrFolder";
  }

  public static get CHILDFILES(): string {
    return this.appurl + "/document/uploadFiles";
  }

  public static get FILELIST(): string {
    return this.appurl + "/document/fileListing";
  }

  // faqs
  public static get LISTALLFAQS(): string {
    return this.appurl + "/listFAQByAdmin";
  }

  public static get DELETEFAQ(): string {
    return this.appurl + "/deleteFaq";
  }

  public static get ANSWERFAQ(): string {
    return this.appurl + "/answerFaq";
  }

  public static get UPDATEFAQSTATUS(): string {
    return this.appurl + "/approveFaq";
  }

  // testimonials
  public static get LISTALLTESTIMONIALS(): string {
    return this.appurl + "/listTestimonialForAdmin";
  }

  public static get APPROVETESTIMONIAL(): string {
    return this.appurl + "/approveTestimonial";
  }

  public static get DELETETESTIMONIAL(): string {
    return this.appurl + "/deleteTestm";
  }

  // Deals
  public static get LISTALLDEALS(): string {
    return this.appurl + "/listDealsForAdmin";
  }

  public static get DELETEDEAL(): string {
    return this.appurl + "/deleteDeal";
  }

  public static get XSLX(): string {
    return this.appurl + "/getXLSXDeals";
  }

  // Subscription
  public static get LISTSUBSCRIPTIONPLAN(): string {
    return this.appurl + "/getSubscriptionList";
  }

  public static get DELETESUBSCRIPTION(): string {
    return this.appurl + "/deleteSubscription";
  }

  public static get ADDSUBSCRIPTION(): string {
    return this.appurl + "/addSubscriptionPlan";
  }

  public static get UPDATESUBSCRIPTION(): string {
    return this.appurl + "/updateSubscriptionPlan";
  }

  public static get GETSUBSCRIPTIONPLANDETAILS(): string {
    return this.appurl + "/getSubscriptionLevelDetails";
  }

  public static get UPDATEQUESTIONNIRE(): string {
    return this.appurl + "/product";
  }

  // Rembursement
  public static get GETREMBURSEMENT(): string {
    return this.appurl + "/aureum/reimbursements?";
  }

  public static get ADDFAQ(): string {
    return this.appurl + "/addFAQByAdmin";
  }

  public static get IMPORTSELLERCOLLECTION(): string {
    return this.appurl + "/importUsersIntoSellerCollection";
  }

  public static get IMPORTBUYERCOLLECTION(): string {
    return this.appurl + "/importUsersIntoBuyerCollection";
  }

  public static get APPROVEPRODUCTLAUNCH(): string {
    return this.appurl + "/approveLaunchProducts";
  }

  public static get GETSPECIALDEALSFORADMIN(): string {
    return this.appurl + "/getSpecialDealsForAdmin";
  }

  public static get SETSPECIALDEALS(): string {
    return this.appurl + "/setSpecialDeals";
  }
}
