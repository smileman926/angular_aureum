import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SubscriptionService } from './services/subscription.service';
import { environment } from 'src/environments/environment';
const URL = environment.apiUrl + '/uploadUserProfilePic';
// const path = environment.baseUrl + 'uploads/profile/';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  // path = environment.baseUrl + 'uploads/profile/';
  path = '../../../../assets/img/';

  planPicPath: string = '../../../../assets/img/pricing-brand1.jpg';
  // {{planPicPath+'pricing-brand1.jpg'}}

  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  FAQId: any;
  pageCountLink: any;
  subscription_id: any;
  page = genralConfig.paginator.PAGE;
  sortValue: any = '';
  sortOrder: any = -1;
  loader: boolean = false;
  displayDialogue: boolean = false;
  subscriptionListdata: any = [];
  noRecordFound: boolean = false;
  subscriptionPlanForm: FormGroup;
  searchText: any;
  imageUrl: any;
  serviceData: FormArray;
  header_title: any;
  public url = <any>'';
  baseimageurl: string = environment.backendBaseUrl;
  displayColumns = [
    'Image',
    'subscription_name',
    'per_month',
    'per_year',
    'year_off_discount',
    'allowed_unit_giveaways',
    'proprietary_interactive_product_giveaways',
    'premium_launch_dashboard',
    'keyword_rank_tracking',
    'expert_live_support',
    'additional_analytics',
    'evergreenBX',
    'action'];
  @ViewChild("imageInput", { static: true }) imageInpt: ElementRef;
  evergreenBX: Boolean = false;
  proprietaryInteractiveProductGiveaways: Boolean = false;
  premiumLaunchDashboard: Boolean = false;
  keywordRankTracking: Boolean = false;
  expertLiveSupport: Boolean = false;
  additionalAnalytics: Boolean = false;


  constructor(
    public _subscriptionService: SubscriptionService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.subscriptionPlanForm = this._formBuilder.group({
      imagePath: null,
      subscription_name: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      allowed_unit_giveaways: ['', [Validators.required]],
      per_month: ['', [Validators.required, Validators.pattern(genralConfig.pattern.PRICING)]],
      per_year: ['', [Validators.required, Validators.pattern(genralConfig.pattern.PRICING)]],
      year_off_discount: ['', [Validators.required, Validators.pattern(genralConfig.pattern.DURATION)]],
      proprietary_interactive_product_giveaways: [''],
      premium_launch_dashboard: ['',],
      keyword_rank_tracking: [''],
      expert_live_support: [''],
      additional_analytics: [''],
    })
    this.listSubscription()
  }

  listSubscription() {
    let speclObject = {
      searchText: this.searchText ? this.searchText : '',
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
      sortValue: this.sortValue ? this.sortValue : '',
      sortOrder: this.sortOrder ? this.sortOrder : 1
    };
    this.loader = true;
    this._subscriptionService.getSubscriptionPlan(speclObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.subscriptionListdata = res.data;
        this.totalCount = res.total;
        this.noRecordFound = false;
        if (this.subscriptionListdata.length == 0) {
          this.noRecordFound = true;
        }
      }
      else if (res && res.code == genralConfig.statusCode.data_not_found) {
        this.subscriptionListdata = [];
        if (this.subscriptionListdata.length == 0) {
          this.noRecordFound = true;
        }
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }

  // getPlans() {
  //   this.loader = true
  //   this.general_service.getSubscriptionPlans().subscribe(res => {

  //     if (res.code == genralConfig.statusCode.ok) {
  //       this.loader = false;
  //       this.planData = res.data;
  //       console.log("plan data on pricing is===>", this.planData)
  //     } else {
  //       this.loader = false;
  //       this._toastr.error(res.message)
  //     }
  //   })
  // }

  searchPrice(event) {
    this.searchText = event.target.value;

    this.listSubscription();
  }

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listSubscription();
  }

  sortBy(value, order) {
    this.sortValue = value;
    this.sortOrder = order;
    this.listSubscription();
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loader = true;
        this._subscriptionService.deleteSubscription({ id: id }).subscribe((res: any) => {
          this.loader = false;
          if (res && res.code == genralConfig.statusCode.ok) {
            this.toastr.success(res.message);

            this.listSubscription();

          }
          else {
            this.toastr.error(res.message);
          }
        })
      }
    });
  }

  DisplaySubscription(value, data) {
    this.subscriptionPlanForm.clearValidators()
    this.subscriptionPlanForm.reset();
    this.subscriptionPlanForm.markAsPristine();
    this.subscriptionPlanForm.markAsUntouched();
    this.subscriptionPlanForm.updateValueAndValidity();

    if (value == 'edit') {
      this.subscription_id = data._id;
      this.header_title = 'Update';

      this.subscriptionPlanForm.patchValue({
        subscription_name: data ? data.subscription_name : '',
        allowed_unit_giveaways: data ? data.allowed_unit_giveaways : '',
        per_month: data.subscription_price ? data.subscription_price.per_month : '',
        per_year: data.subscription_price ? data.subscription_price.per_year : '',
        year_off_discount: data.subscription_price ? data.subscription_price.year_off_discount : '',
      })
      this.url = data.image;

      this.proprietaryInteractiveProductGiveaways = data.proprietary_interactive_product_giveaways;
      this.premiumLaunchDashboard = data.premium_launch_dashboard;
      this.keywordRankTracking = data.keyword_rank_tracking;
      this.expertLiveSupport = data.expert_live_support;
      this.additionalAnalytics = data.additional_analytics;
      this.evergreenBX = data.evergreenBX;
      this.imageUrl = this.baseimageurl + '/uploads/profile/' + this.url
      console.log("thisimageurl", this.imageUrl);

    } else {
      this.header_title = 'Add';
      this.proprietaryInteractiveProductGiveaways = false;
      this.premiumLaunchDashboard = false;
      this.keywordRankTracking = false;
      this.expertLiveSupport = false;
      this.additionalAnalytics = false;
      this.evergreenBX = false;

      // this.imageUrl = ''
      // this.imageInpt.nativeElement.value = null;
      // this.subscriptionPlanForm.clearValidators()
      // this.subscriptionPlanForm.reset();
      // this.subscriptionPlanForm.markAsPristine();
      // this.subscriptionPlanForm.markAsUntouched();
      // this.subscriptionPlanForm.updateValueAndValidity();
    }
    // this.imageInput.nativeElement.value = null;
    // (<ElementRef>this.imageInput).nativeElement.value = null;
    // console.log("this.imageInput.nativeElement.value", this.imageInput.nativeElement.value)

    this.displayDialogue = true
  }

  createValueServices(e): FormGroup {
    // console.log("eee", e)
    return this._formBuilder.group({
      service: [e.service, [Validators.required]]

    });
  }

  onSelectFile(event) {
    if (event.target.files[0].size > 5072000) {
      this.toastr.error("File Size should be less then 5 MB");
      this.imageInpt.nativeElement.value = "";

    }
    else {

      let reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.imageUrl = (<FileReader>event.target).result;
      }

      reader.onloadend = (event: ProgressEvent) => {


      }

      reader.readAsDataURL(event.target.files[0]);
      let file = event.target.files[0];
      this.subscriptionPlanForm.get('imagePath').setValue(file);





    }
  }

  createServiceItem() {
    return this._formBuilder.group({
      service: ['', [Validators.required]],
    })
  }

  duplicateServiceRow() {
    this.serviceData = this.subscriptionPlanForm.controls.serviceArray as FormArray;
    this.serviceData.push(this.createServiceItem());
  }

  onRemoveServiceRow(i) {
    this.serviceData.removeAt(i)
  }

  closedilog() {
    this.displayDialogue = false
  }

  AddSubscription() {
    this.loader = true;
    const formModel = this.prepareSave();

    console.log(formModel, "formModel", this.subscriptionPlanForm);
    this._subscriptionService.addSubscription(formModel).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {

        this.toastr.success(res.message);
        this.loader = false;
        this.displayDialogue = false
        this.subscriptionPlanForm.reset();
        this.listSubscription();
        //reset all to initials
      } else {
        this.loader = false;
        this.subscriptionPlanForm.reset();
        this.displayDialogue = false
        this.toastr.error(res.message);
        this.listSubscription();

      }
    });

    // if (this.subscriptionPlanForm.get('imagePath').value == null) {
    //   this.toastr.info('Please Select Image')
    // } else {
    //   this.loader = true;
    //   const formModel = this.prepareSave();

    //   console.log(formModel, "formModel", this.subscriptionPlanForm);
    //   this._subscriptionService.addSubscription(formModel).subscribe((res: any) => {
    //     this.loader = false;
    //     if (res && res.code == genralConfig.statusCode.ok) {

    //       this.toastr.success(res.message);
    //       this.loader = false;
    //       this.displayDialogue = false
    //       this.subscriptionPlanForm.reset();
    //       this.listSubscription();
    //       //reset all to initials
    //     } else {
    //       this.loader = false;
    //       this.subscriptionPlanForm.reset();
    //       this.displayDialogue = false
    //       this.toastr.error(res.message);
    //       this.listSubscription();

    //     }
    //   });
    // }


  }

  checkMarkChanged(event, changedProperty) {
    // this.evergreenBX = event.checked;
    switch (changedProperty) {
      case 'evergreenBX': this.evergreenBX = event.checked;
        break;
      case 'proprietaryInteractiveProductGiveaways': this.proprietaryInteractiveProductGiveaways = event.checked;
        break;
      case 'premiumLaunchDashboard': this.premiumLaunchDashboard = event.checked;
        break;
      case 'keywordRankTracking': this.keywordRankTracking = event.checked;
        break;
      case 'expertLiveSupport': this.expertLiveSupport = event.checked;
        break;
      case 'additionalAnalytics': this.additionalAnalytics = event.checked;
        break;
    }
  }

  private prepareSave(): any {

    const price = {
      month: this.subscriptionPlanForm.get('per_month').value,
      year: this.subscriptionPlanForm.get('per_year').value,
      year_off: this.subscriptionPlanForm.get('year_off_discount').value
    }

    let inputData = new FormData();
    inputData.append('subscription_name', this.subscriptionPlanForm.get('subscription_name').value);
    inputData.append('allowed_unit_giveaways', this.subscriptionPlanForm.get('allowed_unit_giveaways').value);
    // inputData.append('tier1', this.subscriptionPlanForm.get('tier1').value);
    // inputData.append('tier2', this.subscriptionPlanForm.get('tier2').value);
    // inputData.append('tier3', this.subscriptionPlanForm.get('tier3').value);
    // inputData.append('tier4', this.subscriptionPlanForm.get('tier4').value);
    // inputData.append('tier5', this.subscriptionPlanForm.get('tier5').value);
    // inputData.append('tier6', this.subscriptionPlanForm.get('tier6').value);
    // inputData.append('basic_boosts', this.subscriptionPlanForm.get('basic_boosts').value);
    // inputData.append('intermediate_boosts', this.subscriptionPlanForm.get('intermediate_boosts').value);
    // inputData.append('advanced_boosts', this.subscriptionPlanForm.get('advanced_boosts').value);
    inputData.append('price', JSON.stringify(price));
    inputData.append('proprietary_interactive_product_giveaways', JSON.stringify(this.proprietaryInteractiveProductGiveaways));
    inputData.append('premium_launch_dashboard', JSON.stringify(this.premiumLaunchDashboard));
    inputData.append('keyword_rank_tracking', JSON.stringify(this.keywordRankTracking));
    inputData.append('expert_live_support', JSON.stringify(this.expertLiveSupport));
    inputData.append('additional_analytics', JSON.stringify(this.additionalAnalytics));
    inputData.append('evergreenBX', JSON.stringify(this.evergreenBX));
    inputData.append('image', this.subscriptionPlanForm.get('imagePath').value);
    inputData.append('_id', this.subscription_id);
    return inputData;
  }

  updateSubscription() {

    this.loader = true;
    const formModel = this.prepareSave();

    console.log("formModel", this.subscriptionPlanForm.get('imagePath').value)
    this._subscriptionService.updateSubscription(formModel).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {

        this.toastr.success(res.message);
        this.loader = false;
        this.displayDialogue = false
        this.subscriptionPlanForm.reset();
        this.listSubscription();
        //reset all to initials
      } else {
        this.loader = false;
        this.subscriptionPlanForm.reset();
        this.displayDialogue = false
        this.toastr.error(res.message);
        this.listSubscription();

      }
    })


  }

}

