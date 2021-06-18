import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatSelectChange, MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
// services
import { GenralService } from 'src/app/core/services/sharedservices/genralservice/genral.service';
import { AdminServicesService } from 'src/app/admin/services/admin-services.service';
// constants
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { environment } from 'src/environments/environment';
import { launchPlanformOptionList, LaunchPlatformType } from 'src/app/core/constant/launch.constant';

@Component({
  selector: 'app-edit-product-launch-by-admin',
  templateUrl: './edit-product-launch-by-admin.component.html',
  styleUrls: ['./edit-product-launch-by-admin.component.scss'],
})
export class EditProductLaunchByAdminComponent implements OnInit {
  // first step
  addLaunchForm: FormGroup;
  // second step
  addGiveawayForm: FormGroup;
  // thrird step
  addLaunchSetup: FormGroup;
  // fourht step
  addEvergreenLaunchSetup: FormGroup;

  advanceGiveawayForm: FormGroup;
  isCompleted: Boolean = false;

  public addChildOrders: FormGroup;

  duration: number = 0;

  path: any = environment.baseUrl + 'uploads/profile/';
  seller_id: string;
  launch_id: string;
  keywordValidationRegex = /^[^-\s][a-zA-Z0-9\s%\*#\@?\&\(\)_\$-]{2,50}$/;
  linkValidationRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  subscriptionListdata: any = [];
  showSubscriptionTab: Boolean = false;
  planChoosen: any = {};
  planTypeChoosed: number = null;
  pricePerMonth: number;
  bonusId: string;
  bonusCode: string;
  discount: number;
  pricePerYear: number;
  isBonusCodeActivated: boolean = false;
  openImportDail: boolean = false;

  sum = 0;
  value = 0;
  minDays = 1;
  maxDays = 90;
  maxEvergreenGiveaways = 6;
  minEvergreenGiveaways = 1;
  evergreenProductDetailsPrice = 0;
  evergeenAdditionalFee = 0;
  evergreenTotalUnits = 0;
  evergreenLaunchDays = 1;
  evergreenProductPrice = 0;
  evergreenTotalLaunchCost = 0;
  evergreenPerDayPaiment: string = '';
  isShowPaymentSchedule = false;
  startDate: string;
  usualLaunchEndDate;
  evergreenLaunchEndDate;
  evergreenStartDate;

  totalUnits = 0;
  paidUnits = 0;
  optionCount = 0;
  remain: any = 0;
  remainingFreeGiveaways: number;
  minDaysValue = 10;
  maxEvergreenDailyGiveaways = 1;
  additionalFee = 0;
  giveAwayPrice = 0;
  totalLaunchCost = 0;

  totalUsualLaunchCost = 0;
  usualPerDayPaiment: string = '';
  productDetailsPrice = 0;

  showEvergreenSelect: boolean = false;
  showSubscriptionUpgradeSelect: boolean = false;
  showNeedMoreRegularLaunches: boolean = false;
  showLaunchDailySchedule: boolean = false;
  isPlanPaymentFrame = false;

  user_basic_boosts = 0;
  user_intermediate_boosts = 0;
  user_advanced_boosts = 0;
  daysList: any = [];
  productList: any = ['any list'];
  productDetails: any = [];
  giveAwayOptionsCost: any = [];
  minDate = new Date();
  maxDate = moment(new Date()).add(3, 'M').format();
  loader = false;
  isLinear = false;
  thumbLabel = true;
  isOptional = false;
  isAdvanceOption = false;
  isPaymentFrame = false;
  isKeyMethod = false;
  isEverGreenKeyMethod = false;
  canMoveToStepThree = false;
  showVideoTab = false;
  isMethod = true;
  isLinkMethod = false;
  isEvergreenLaunch = false;
  isUsualLaunch = false;
  advanceDailyGiveaway = false;
  displayOtherPlatform = false;
  userSubscriptionGiveaways: number;
  allowedUnitGiveaways = 100;
  product_image_url: string = '../../../../assets/img/default_img.png';
  defaultDaysData = [
    {
      day: 'day 1',
    },
    {
      day: 'day 2',
    },
    {
      day: 'day 3',
    },
    {
      day: 'day 4',
    },
    {
      day: 'day 5',
    },
    {
      day: 'day 6',
    },
    {
      day: 'day 7',
    },
    {
      day: 'day 8',
    },
    {
      day: 'day 9',
    },
    {
      day: 'day 10',
    },
  ];
  editedProductDaysData = [];
  launchPlatformOptionList = launchPlanformOptionList;
  displayedColumns = ['Options', 'Cost/Giveaway', 'Quantity'];
  dayLength: any;
  launch_number: any;
  paymentLinkUrl: any;
  tierToUpdateObj: any;
  daysRemaining: number;
  launch_identifier: any;
  subscriptionLevelDetails: any;
  boostToUpdateObj: {};
  otionSix = 0;
  otionFive = 0;
  otionZero = 0;
  displayPaymentDialogue = false;
  displayWireDialogue = false;
  totalCost: any;
  Reference: any;
  bankDetails: any;
  tierName: any;
  launchPrice: any;
  evalKeyWeighted = false;
  product_actual_price: any = 0;
  evalLinkWeighted = false;
  payType = 'full';
  productLaunchId: string;
  productId: string;
  skip = 0;
  innerSkip = 0;
  private static readonly forEvergreenUnitsQuantiy = 100;

  constructor(
    private _formBuilder: FormBuilder,
    private adminService: AdminServicesService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private general_service: GenralService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.productLaunchId =
      this.activatedRoute.snapshot.paramMap.get('productLaunchId');
    this.getProductData();
  }

  closedilog1() {
    this.openImportDail = false;
    this.loader = false;
  }

  prepareProductData(): any {
    let daily_gv = [];
    let day = 0;
    this.advanceGiveawayForm.value.day.forEach((element, index) => {
      if (element.day >= 0) {
        daily_gv.push({
          day: 'Day' + (day + 1),
          quantity: element.day,
        });
      }
      day++;
    });
    let keywords = [];
    let links = [];
    if (this.isKeyMethod) {
      keywords = this.addLaunchSetup.value.keyword
        ? this.addLaunchSetup.value.keyword
        : [];
    }
    if (this.isLinkMethod) {
      links = this.addLaunchSetup.value.link
        ? this.addLaunchSetup.value.link
        : [];
    }
    const productData = {
      product_id: this.productId,
      product_giveaway: this.addLaunchForm.value.giveaway_price,
      launch_date: this.addGiveawayForm.value.start_date,
      launch_period: this.minDaysValue,
      giveaway_quantity: this.totalUnits,
      free_giveaway_quantity: this.totalUnits - this.paidUnits,
      giveaway_quantity_map: daily_gv,
      launch_isActive: false,
      search_keywords: keywords,
      special_links: links,
      additional_boosts: [],
      giveaway_type: daily_gv.length ? 'day' : 'total',
      search_method: this.isKeyMethod ? 'keywords' : 'link',
      price: this.addLaunchForm.getRawValue().price,
      totalLaunchCost: this.totalLaunchCost,
      payType: this.payType,
      paymentMethod: '',
    };

    return productData;
  }

  calculateFreeGiveaways(
    allowedUnitsGiveaways,
    projectedUnitGiveaways,
    freeGiveaways?
  ): void {
    this.userSubscriptionGiveaways = allowedUnitsGiveaways;
    this.remainingFreeGiveaways =
      projectedUnitGiveaways + (freeGiveaways ? freeGiveaways : 0);

    if (this.remainingFreeGiveaways > 0) {
      this.giveAwayPrice = 0;
    } else {
      this.giveAwayPrice = this.totalUnits ? Number(4.95 * this.totalUnits) : 0;
    }
    this.additionalFee = this.productDetailsPrice
      ? Number((this.productDetailsPrice * 5) / 100)
      : 0;
    this.totalUsualLaunchCost = Number(
      (
        this.productDetailsPrice +
        this.giveAwayPrice +
        this.additionalFee
      ).toFixed(2)
    );
    this.totalLaunchCost =
      this.totalUsualLaunchCost + this.evergreenTotalLaunchCost;
  }

  getLaunchPlatform(event: MatSelectChange) {
    const selectedPlatform = event.value as LaunchPlatformType;

    this.addLaunchForm.controls['otherPlatform'].reset();
    if (selectedPlatform === 'other') {
      this.displayOtherPlatform = true;
      this.addLaunchForm
        .get('otherPlatform')
        .setValidators([Validators.required]);
    } else {
      this.addLaunchForm.get('otherPlatform').setValidators(null);
      this.displayOtherPlatform = false;
      this.addLaunchForm.get('otherPlatform').updateValueAndValidity();
    }
  }

  initGiveAwayOptionRows(count) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      if (i > 0) {
        arr.push(this.initGivAwayRows(false));
      } else {
        arr.push(this.initGivAwayRows(false));
      }
    }
    return arr;
  }

  initGivAwayRows(val): FormGroup {
    return this._formBuilder.group({
      option: new FormControl({ value: 0, disabled: val }),
    });
  }

  isSecondStepNextButtonDisabled(): Boolean {
    return (
      !this.canMoveToStepThree ||
      this.totalUnits <= 0 ||
      !this.addGiveawayForm.valid ||
      this.remain !== 0 ||
      this.duration !== this.minDaysValue
    );
  }

  setProdCost(event, totalUnits?) {
    let totUn = 0;
    if (this.totalUnits === 0) {
      totUn = totalUnits > 0 ? totalUnits : 1;
    } else {
      totUn = this.totalUnits;
    }
    this.productDetailsPrice = Number(
      (this.productDetails.product_id.price - parseFloat(event.target.value)) *
        totUn
    );
    this.product_actual_price = Number(
      this.productDetails.product_id.price - parseFloat(event.target.value)
    );
    this.additionalFee = this.productDetailsPrice
      ? Number((this.productDetailsPrice * 5) / 100)
      : 0;
    this.totalUsualLaunchCost = this.totalUsualLaunchCost = Number(
      (
        this.productDetailsPrice +
        this.giveAwayPrice +
        this.additionalFee
      ).toFixed(2)
    );
    this.totalLaunchCost =
      this.totalUsualLaunchCost + this.evergreenTotalLaunchCost;
    this.addLaunchForm.controls['giveaway_price'].markAsUntouched();
  }

  setTotalUnit(event) {
    this.canMoveToStepThree = false;
    this.advanceDailyGiveaway = false;
    this.totalUnits = parseInt(event.target.value);
    if (this.advanceGiveawayForm) {
      const res = this.advanceGiveawayForm.value.day
        .map((x) => (x.day ? x.day : 0))
        .reduce((total, currentValue) => {
          console.log(currentValue);
          return total + Number.parseInt(currentValue);
        });
      this.remain = this.totalUnits - res;
    } else {
      this.remain = this.totalUnits;
    }

    this.productDetailsPrice = Number(
      this.product_actual_price * this.totalUnits
    );

    if (
      this.totalUnits >=
        EditProductLaunchByAdminComponent.forEvergreenUnitsQuantiy &&
      this.userSubscriptionGiveaways >= this.allowedUnitGiveaways
    ) {
      console.log('first if selection');
      this.showSubscriptionUpgradeSelect = false;
      this.showNeedMoreRegularLaunches = false;
      this.showEvergreenSelect = true;
    } else if (
      this.totalUnits <
        EditProductLaunchByAdminComponent.forEvergreenUnitsQuantiy &&
      this.userSubscriptionGiveaways >= this.allowedUnitGiveaways
    ) {
      this.showSubscriptionUpgradeSelect = false;
      this.showEvergreenSelect = false;
      this.showNeedMoreRegularLaunches = true;
      this.isEvergreenLaunch = false;
    } else {
      console.log('first else selection');
      if (this.showEvergreenSelect) {
        console.log('second if selection');
        this.showEvergreenSelect = false;
        this.isEvergreenLaunch = false;
        this.showNeedMoreRegularLaunches = false;
      }
      console.log('second else selection');
      this.showEvergreenSelect = false;
      this.showSubscriptionUpgradeSelect = true;
      this.showNeedMoreRegularLaunches = false;
    }

    this.paidUnits =
      this.totalUnits - this.remainingFreeGiveaways > 0
        ? this.totalUnits - this.remainingFreeGiveaways
        : 0;
    this.giveAwayPrice = this.totalUnits ? Number(4.95 * this.paidUnits) : 0;
    this.additionalFee = this.productDetailsPrice
      ? Number((this.productDetailsPrice * 5) / 100)
      : 0;
    this.totalUsualLaunchCost = Number(
      (
        this.productDetailsPrice +
        this.giveAwayPrice +
        this.additionalFee
      ).toFixed(2)
    );
    this.totalLaunchCost = this.totalUsualLaunchCost;

    if (this.isEvergreenLaunch) {
      this.evergreenTotalUnits = 0;
      this.evergreenProductDetailsPrice = 0;
      this.evergeenAdditionalFee = 0;
      this.evergreenTotalLaunchCost = 0;
      this.addEvergreenLaunchSetup = this._formBuilder.group({
        evergreen_giveaways: [
          '',
          [
            Validators.required,
            Validators.pattern(genralConfig.pattern.PRICING),
            Validators.max(this.totalUnits),
            Validators.min(1),
          ],
        ],
        evergreen_daily_giveaways: [
          '',
          [
            Validators.required,
            Validators.pattern(genralConfig.pattern.PRICING),
            Validators.max(this.maxEvergreenGiveaways),
            Validators.min(this.minEvergreenGiveaways),
          ],
        ],
        everGreenKeyword: this._formBuilder.array([
          this.initEverGreenKeywordRows(),
        ]),
      });
    } else {
      // this.usualLaunchIsSelected();
    }
  }

  setEditedTotalUnit(event) {
    this.canMoveToStepThree = false;
    console.log('this event obj is =====>', event);
    this.totalUnits = parseInt(event.target.value);
    console.log('this total units is=====>', this.totalUnits);
    this.remain = this.totalUnits;
    this.advanceGiveawayForm.reset();
    this.productDetailsPrice = Number(
      this.product_actual_price * this.totalUnits
    );

    if (
      this.totalUnits >=
        EditProductLaunchByAdminComponent.forEvergreenUnitsQuantiy &&
      this.userSubscriptionGiveaways >= this.allowedUnitGiveaways
    ) {
      this.showSubscriptionUpgradeSelect = false;
      this.showNeedMoreRegularLaunches = false;
      this.showEvergreenSelect = true;
    } else if (
      this.totalUnits <
        EditProductLaunchByAdminComponent.forEvergreenUnitsQuantiy &&
      this.userSubscriptionGiveaways >= this.allowedUnitGiveaways
    ) {
      this.showSubscriptionUpgradeSelect = false;
      this.showEvergreenSelect = false;
      this.showNeedMoreRegularLaunches = true;
      this.isEvergreenLaunch = false;
    } else {
      if (this.showEvergreenSelect) {
        this.showEvergreenSelect = false;
        this.isEvergreenLaunch = false;
        this.showNeedMoreRegularLaunches = false;
      }
      this.showEvergreenSelect = false;
      this.showSubscriptionUpgradeSelect = true;
      this.showNeedMoreRegularLaunches = false;
    }

    this.paidUnits =
      this.totalUnits - this.remainingFreeGiveaways > 0
        ? this.totalUnits - this.remainingFreeGiveaways
        : 0;
    this.giveAwayPrice = this.totalUnits ? Number(4.95 * this.paidUnits) : 0;
    this.additionalFee = this.productDetailsPrice
      ? Number((this.productDetailsPrice * 5) / 100)
      : 0;
    this.totalUsualLaunchCost = Number(
      (
        this.productDetailsPrice +
        this.giveAwayPrice +
        this.additionalFee
      ).toFixed(2)
    );
    this.totalLaunchCost =
      this.totalUsualLaunchCost + this.evergreenTotalLaunchCost;
    this.advanceGiveawayForm = this._formBuilder.group({
      day: this._formBuilder.array([...this.initDefaultDayRows()]),
    });

    if (this.editedProductDaysData.length) {
      this.showLaunchDailySchedule = true;
      this.canMoveToStepThree = true;
      this.eval2(
        {
          target: {
            value:
              this.editedProductDaysData[this.editedProductDaysData.length - 1]
                .quantity,
          },
        },
        this.editedProductDaysData.length - 1,
        this.remain
      );
    }
  }

  setTotalEvergreenUnits(event) {
    // Evergreen Launch Calc = Total Evergreen Launch Cost / Total Number of Evergreen Days
    // $8, 453.10(product costs) + $422.66(rebate fees + taxes) = $8, 875.76 / 19 = $467.15 per day(rounded)

    this.evergreenTotalUnits = parseInt(event.target.value);
    // this.unitsRemain = parseInt(event.target.value);
    this.evergreenProductDetailsPrice = Number(
      this.product_actual_price * this.evergreenTotalUnits
    ); //new to test

    this.evergeenAdditionalFee = this.evergreenProductDetailsPrice
      ? Number((this.evergreenProductDetailsPrice * 5) / 100)
      : 0;
    this.evergreenTotalLaunchCost = Number(
      (this.evergreenProductDetailsPrice + this.evergeenAdditionalFee).toFixed(
        2
      )
    );
    this.evergreenLaunchDays = Math.round(
      this.evergreenTotalUnits / this.maxEvergreenDailyGiveaways
    );
    this.totalLaunchCost =
      this.totalUsualLaunchCost + this.evergreenTotalLaunchCost;
  }

  setMaxDailyGiveaways(event) {
    this.maxEvergreenDailyGiveaways = event.target.value;
    this.evergreenLaunchDays = Math.round(
      this.evergreenTotalUnits / this.maxEvergreenDailyGiveaways
    );
    this.evergreenPerDayPaiment = Number(
      this.evergreenTotalLaunchCost / this.evergreenLaunchDays
    ).toFixed(2);
  }

  // for add new keyword

  get keywordArr() {
    return this.addLaunchSetup.get('keyword') as FormArray;
  }

  initEditedKeywordRows(keyword, weightPercent) {
    return this._formBuilder.group({
      keyword: [
        keyword,
        [Validators.required, Validators.pattern(this.keywordValidationRegex)],
      ],
      keywordWeight: [weightPercent, Validators.required],
    });
  }

  initKeywordRows() {
    return this._formBuilder.group({
      keyword: [
        '',
        [Validators.required, Validators.pattern(this.keywordValidationRegex)],
      ],
      keywordWeight: [100, Validators.required],
    });
  }

  get everGreenKeywordArr() {
    return this.addEvergreenLaunchSetup.get('everGreenKeyword') as FormArray;
  }

  initEverGreenKeywordRows() {
    return this._formBuilder.group({
      everGreenKeyword: [
        '',
        [Validators.required, Validators.pattern(this.keywordValidationRegex)],
      ],
      everGreenKeywordWeight: [100, Validators.required],
    });
  }

  initEditedEverGreenKeywordRows(keyword, weightPercent) {
    return this._formBuilder.group({
      everGreenKeyword: [
        keyword,
        [Validators.required, Validators.pattern(this.keywordValidationRegex)],
      ],
      everGreenKeywordWeight: [weightPercent, Validators.required],
    });
  }

  addNewKeyword() {
    let maxKeyWordlength = 5;
    if (this.keywordArr.length !== maxKeyWordlength) {
      this.keywordArr.push(this.initKeywordRows());
      if (this.keywordArr.length === 2) {
        this.addLaunchSetup.value.keyword[0].keywordWeight = 50;
        this.addLaunchSetup.value.keyword[1].keywordWeight = 50;
      } else if (this.keywordArr.length === 3) {
        this.addLaunchSetup.value.keyword[0].keywordWeight = 34;
        this.addLaunchSetup.value.keyword[1].keywordWeight = 33;
        this.addLaunchSetup.value.keyword[2].keywordWeight = 33;
      } else if (this.keywordArr.length === 4) {
        this.addLaunchSetup.value.keyword[0].keywordWeight = 25;
        this.addLaunchSetup.value.keyword[1].keywordWeight = 25;
        this.addLaunchSetup.value.keyword[2].keywordWeight = 25;
        this.addLaunchSetup.value.keyword[3].keywordWeight = 25;
      } else if (this.keywordArr.length === 5) {
        this.addLaunchSetup.value.keyword[0].keywordWeight = 20;
        this.addLaunchSetup.value.keyword[1].keywordWeight = 20;
        this.addLaunchSetup.value.keyword[2].keywordWeight = 20;
        this.addLaunchSetup.value.keyword[3].keywordWeight = 20;
        this.addLaunchSetup.value.keyword[4].keywordWeight = 20;
      }
      this.addLaunchSetup.patchValue({
        keyword: this.addLaunchSetup.value.keyword,
      });
      this.evalKeyWeight();
      return this.addLaunchSetup.get('keyword') as FormArray;
    } else {
      this.toastr.info('Max Keyword Limit Reached');
    }
  }

  addEditedNewKeyword(keyword, keywordLength) {
    let maxKeyWordlength = 5;
    if (this.keywordArr.length !== maxKeyWordlength) {
      this.keywordArr.push(this.initEditedKeywordRows(keyword, keywordLength));
      if (this.keywordArr.length === 2) {
        this.addLaunchSetup.value.keyword[0].keywordWeight = 50;
        this.addLaunchSetup.value.keyword[1].keywordWeight = 50;
      } else if (this.keywordArr.length === 3) {
        this.addLaunchSetup.value.keyword[0].keywordWeight = 34;
        this.addLaunchSetup.value.keyword[1].keywordWeight = 33;
        this.addLaunchSetup.value.keyword[2].keywordWeight = 33;
      } else if (this.keywordArr.length === 4) {
        this.addLaunchSetup.value.keyword[0].keywordWeight = 25;
        this.addLaunchSetup.value.keyword[1].keywordWeight = 25;
        this.addLaunchSetup.value.keyword[2].keywordWeight = 25;
        this.addLaunchSetup.value.keyword[3].keywordWeight = 25;
      } else if (this.keywordArr.length === 5) {
        this.addLaunchSetup.value.keyword[0].keywordWeight = 20;
        this.addLaunchSetup.value.keyword[1].keywordWeight = 20;
        this.addLaunchSetup.value.keyword[2].keywordWeight = 20;
        this.addLaunchSetup.value.keyword[3].keywordWeight = 20;
        this.addLaunchSetup.value.keyword[4].keywordWeight = 20;
      }
      this.addLaunchSetup.patchValue({
        keyword: this.addLaunchSetup.value.keyword,
      });
      this.evalKeyWeight();
      return this.addLaunchSetup.get('keyword') as FormArray;
    } else {
      this.toastr.info('Max Keyword Limit Reached');
    }
  }

  deleteKeyword(index: number) {
    this.keywordArr.removeAt(index);
    if (this.keywordArr.length === 1) {
      this.addLaunchSetup.value.keyword[0].keywordWeight = 100;
    } else if (this.keywordArr.length === 2) {
      this.addLaunchSetup.value.keyword[0].keywordWeight = 50;
      this.addLaunchSetup.value.keyword[1].keywordWeight = 50;
    } else if (this.keywordArr.length === 3) {
      this.addLaunchSetup.value.keyword[0].keywordWeight = 34;
      this.addLaunchSetup.value.keyword[1].keywordWeight = 33;
      this.addLaunchSetup.value.keyword[2].keywordWeight = 33;
    } else if (this.keywordArr.length === 4) {
      this.addLaunchSetup.value.keyword[0].keywordWeight = 25;
      this.addLaunchSetup.value.keyword[1].keywordWeight = 25;
      this.addLaunchSetup.value.keyword[2].keywordWeight = 25;
      this.addLaunchSetup.value.keyword[3].keywordWeight = 25;
    } else if (this.keywordArr.length === 5) {
      this.addLaunchSetup.value.keyword[0].keywordWeight = 20;
      this.addLaunchSetup.value.keyword[1].keywordWeight = 20;
      this.addLaunchSetup.value.keyword[2].keywordWeight = 20;
      this.addLaunchSetup.value.keyword[3].keywordWeight = 20;
      this.addLaunchSetup.value.keyword[4].keywordWeight = 20;
    }
    this.addLaunchSetup.patchValue({
      keyword: this.addLaunchSetup.value.keyword,
    });
    this.evalKeyWeight();
    return this.addLaunchSetup.get('keyword') as FormArray;
  }

  addNewEverGreenKeyWord() {
    let maxKeyWordlength = 3;
    this.isEverGreenKeyMethod = true;
    console.log('This evergreeeen is ==> ', this.isEverGreenKeyMethod);
    if (this.everGreenKeywordArr.length !== maxKeyWordlength) {
      this.everGreenKeywordArr.push(this.initEverGreenKeywordRows());
      if (this.everGreenKeywordArr.length === 2) {
        this.addEvergreenLaunchSetup.value.everGreenKeyword[0].everGreenKeywordWeight = 50;
        this.addEvergreenLaunchSetup.value.everGreenKeyword[1].everGreenKeywordWeight = 50;
      } else if (this.everGreenKeywordArr.length === 3) {
        this.addEvergreenLaunchSetup.value.everGreenKeyword[0].everGreenKeywordWeight = 34;
        this.addEvergreenLaunchSetup.value.everGreenKeyword[1].everGreenKeywordWeight = 33;
        this.addEvergreenLaunchSetup.value.everGreenKeyword[2].everGreenKeywordWeight = 33;
      }
      this.addEvergreenLaunchSetup.patchValue({
        everGreenKeyword: this.addEvergreenLaunchSetup.value.everGreenKeyword,
      });
      this.evalKeyWeight();
      return this.addEvergreenLaunchSetup.get('everGreenKeyword') as FormArray;
    } else {
      this.toastr.info('Max Keyword Limit Reached');
    }
  }

  addEditedNewEverGreenKeyWord(keyword, weightPercent) {
    let maxKeyWordlength = 3;
    this.isEverGreenKeyMethod = true;
    console.log('This evergreeeen is ==> ', this.isEverGreenKeyMethod);
    if (this.everGreenKeywordArr.length !== maxKeyWordlength) {
      this.everGreenKeywordArr.push(
        this.initEditedEverGreenKeywordRows(keyword, weightPercent)
      );
      if (this.everGreenKeywordArr.length === 2) {
        this.addEvergreenLaunchSetup.value.everGreenKeyword[0].everGreenKeywordWeight = 50;
        this.addEvergreenLaunchSetup.value.everGreenKeyword[1].everGreenKeywordWeight = 50;
      } else if (this.everGreenKeywordArr.length === 3) {
        this.addEvergreenLaunchSetup.value.everGreenKeyword[0].everGreenKeywordWeight = 34;
        this.addEvergreenLaunchSetup.value.everGreenKeyword[1].everGreenKeywordWeight = 33;
        this.addEvergreenLaunchSetup.value.everGreenKeyword[2].everGreenKeywordWeight = 33;
      }
      this.addEvergreenLaunchSetup.patchValue({
        everGreenKeyword: this.addEvergreenLaunchSetup.value.everGreenKeyword,
      });
      this.evalKeyWeight();
      return this.addEvergreenLaunchSetup.get('everGreenKeyword') as FormArray;
    } else {
      this.toastr.info('Max Keyword Limit Reached');
    }
  }

  deleteEvergreenKeyword(index: number) {
    this.everGreenKeywordArr.removeAt(index);
    if (this.everGreenKeywordArr.length === 1) {
      this.addEvergreenLaunchSetup.value.everGreenKeyword[0].everGreenKeywordWeight = 100;
    } else if (this.everGreenKeywordArr.length === 2) {
      this.addEvergreenLaunchSetup.value.everGreenKeyword[0].everGreenKeywordWeight = 50;
      this.addEvergreenLaunchSetup.value.everGreenKeyword[1].everGreenKeywordWeight = 50;
    } else if (this.everGreenKeywordArr.length === 3) {
      this.addEvergreenLaunchSetup.value.everGreenKeyword[0].everGreenKeywordWeight = 34;
      this.addEvergreenLaunchSetup.value.everGreenKeyword[1].everGreenKeywordWeight = 33;
      this.addEvergreenLaunchSetup.value.everGreenKeyword[2].everGreenKeywordWeight = 33;
    }

    this.addEvergreenLaunchSetup.patchValue({
      everGreenKeyword: this.addEvergreenLaunchSetup.value.everGreenKeyword,
    });
    this.evalKeyWeight();
    return this.addEvergreenLaunchSetup.get('everGreenKeyword') as FormArray;
  }

  evalKeyWeight() {
    const total = 100;
    let rem = 0;
    let sum = 0;
    if (this.isEvergreenLaunch) {
      for (const key of this.addEvergreenLaunchSetup.value.everGreenKeyword) {
        sum = sum + Number(key.everGreenKeywordWeight);
      }
      rem = total - sum;
      if (rem < 0) {
        this.toastr.warning(`Evergreen Keywords weight addition must be 100`);
      } else if (rem > 0) {
        this.toastr.warning(`Evergreen Keywords weight addition must be 100`);
      } else {
        this.toastr.success(`Evergreen Keywords weight addition is 100`);
      }
    } else {
      for (const key of this.addLaunchSetup.value.keyword) {
        sum = sum + Number(key.keywordWeight);
      }
      rem = total - sum;
      if (rem < 0) {
        this.evalKeyWeighted = true;
        this.toastr.warning(`Keywords weight addition must be 100`);
      } else if (rem > 0) {
        this.evalKeyWeighted = true;
        this.toastr.warning(`Keywords weight addition must be 100`);
      } else {
        this.evalKeyWeighted = false;
        this.toastr.success(`Keywords weight addition is 100`);
      }
    }
  }

  evalLinkWeight() {
    const total = 100;
    let rem = 0;
    let sum = 0;
    for (const link of this.addLaunchSetup.value.link) {
      sum = sum + Number(link.linkWeight);
    }
    rem = total - sum;
    if (rem < 0) {
      this.evalLinkWeighted = true;
      this.toastr.warning(`Special links weight addition must be 100`);
    } else if (rem > 0) {
      this.evalLinkWeighted = true;
      this.toastr.warning(`Special links weight addition must be 100`);
    } else {
      this.evalLinkWeighted = false;
      this.toastr.success(`Special links weight addition is 100`);
    }
  }

  // for add new link
  get linkArr() {
    return this.addLaunchSetup.get('link') as FormArray;
  }

  initLinkRows() {
    return this._formBuilder.group({
      //  list all your form controls here, which belongs to your form array
      link: [
        '',
        [Validators.required, Validators.pattern(this.linkValidationRegex)],
      ],
      linkWeight: [100, Validators.required],
    });
  }

  initEditedLinkRows(link, weightPercent) {
    return this._formBuilder.group({
      //  list all your form controls here, which belongs to your form array
      link: [link, Validators.required],
      linkWeight: [weightPercent, Validators.required],
    });
  }

  addNewLink() {
    if (this.linkArr.length !== 5) {
      this.linkArr.push(this.initLinkRows());
      if (this.linkArr.length === 2) {
        this.addLaunchSetup.value.link[0].linkWeight = 50;
        this.addLaunchSetup.value.link[1].linkWeight = 50;
      } else if (this.linkArr.length === 3) {
        this.addLaunchSetup.value.link[0].linkWeight = 34;
        this.addLaunchSetup.value.link[1].linkWeight = 33;
        this.addLaunchSetup.value.link[2].linkWeight = 33;
      } else if (this.linkArr.length === 4) {
        this.addLaunchSetup.value.link[0].linkWeight = 25;
        this.addLaunchSetup.value.link[1].linkWeight = 25;
        this.addLaunchSetup.value.link[2].linkWeight = 25;
        this.addLaunchSetup.value.link[3].linkWeight = 25;
      } else if (this.linkArr.length === 5) {
        this.addLaunchSetup.value.link[0].linkWeight = 20;
        this.addLaunchSetup.value.link[1].linkWeight = 20;
        this.addLaunchSetup.value.link[2].linkWeight = 20;
        this.addLaunchSetup.value.link[3].linkWeight = 20;
        this.addLaunchSetup.value.link[4].linkWeight = 20;
      }
      this.addLaunchSetup.patchValue({ link: this.addLaunchSetup.value.link });
      this.evalLinkWeight();
      return this.addLaunchSetup.get('link') as FormArray;
    } else {
      this.toastr.info('Max Link Limit Reached');
    }
  }

  addEditedNewLink(link, weightPercent) {
    if (this.linkArr.length !== 5) {
      this.linkArr.push(this.initEditedLinkRows(link, weightPercent));
      if (this.linkArr.length === 2) {
        this.addLaunchSetup.value.link[0].linkWeight = 50;
        this.addLaunchSetup.value.link[1].linkWeight = 50;
      } else if (this.linkArr.length === 3) {
        this.addLaunchSetup.value.link[0].linkWeight = 34;
        this.addLaunchSetup.value.link[1].linkWeight = 33;
        this.addLaunchSetup.value.link[2].linkWeight = 33;
      } else if (this.linkArr.length === 4) {
        this.addLaunchSetup.value.link[0].linkWeight = 25;
        this.addLaunchSetup.value.link[1].linkWeight = 25;
        this.addLaunchSetup.value.link[2].linkWeight = 25;
        this.addLaunchSetup.value.link[3].linkWeight = 25;
      } else if (this.linkArr.length === 5) {
        this.addLaunchSetup.value.link[0].linkWeight = 20;
        this.addLaunchSetup.value.link[1].linkWeight = 20;
        this.addLaunchSetup.value.link[2].linkWeight = 20;
        this.addLaunchSetup.value.link[3].linkWeight = 20;
        this.addLaunchSetup.value.link[4].linkWeight = 20;
      }
      this.addLaunchSetup.patchValue({ link: this.addLaunchSetup.value.link });
      this.evalLinkWeight();
      return this.addLaunchSetup.get('link') as FormArray;
    } else {
      this.toastr.info('Max Link Limit Reached');
    }
  }

  deleteLink(index: number) {
    this.linkArr.removeAt(index);
    if (this.linkArr.length === 1) {
      this.addLaunchSetup.value.link[0].linkWeight = 100;
    } else if (this.linkArr.length === 2) {
      this.addLaunchSetup.value.link[0].linkWeight = 50;
      this.addLaunchSetup.value.link[1].linkWeight = 50;
    } else if (this.linkArr.length === 3) {
      this.addLaunchSetup.value.link[0].linkWeight = 34;
      this.addLaunchSetup.value.link[1].linkWeight = 33;
      this.addLaunchSetup.value.link[2].linkWeight = 33;
    } else if (this.linkArr.length === 4) {
      this.addLaunchSetup.value.link[0].linkWeight = 25;
      this.addLaunchSetup.value.link[1].linkWeight = 25;
      this.addLaunchSetup.value.link[2].linkWeight = 25;
      this.addLaunchSetup.value.link[3].linkWeight = 25;
    } else if (this.linkArr.length === 5) {
      this.addLaunchSetup.value.link[0].linkWeight = 20;
      this.addLaunchSetup.value.link[1].linkWeight = 20;
      this.addLaunchSetup.value.link[2].linkWeight = 20;
      this.addLaunchSetup.value.link[3].linkWeight = 20;
      this.addLaunchSetup.value.link[4].linkWeight = 20;
    }
    this.addLaunchSetup.patchValue({ link: this.addLaunchSetup.value.link });
    this.evalLinkWeight();
    return this.addLaunchSetup.get('link') as FormArray;
  }

  setLaunchDuration(event) {
    this.duration = parseInt(event.target.value);
    if (!this.duration || this.duration > 90 || this.duration < 1) {
      return;
    }
    this.addGiveawayForm.patchValue({
      duration: this.duration,
    });
    this.showLaunchDailySchedule = true;
    if (!this.advanceGiveawayForm) {
      this.advanceGiveawayForm = this._formBuilder.group({
        day: this._formBuilder.array([
          ...this.initDefaultDayRows(this.duration),
        ]),
      });
    } else {
      const daysLength = this.daysArr.length;
      if (this.duration > daysLength) {
        for (let i = 0; i < this.duration - daysLength; i++) {
          this.daysArr.push(this.initDayRows(false, '0'));
        }
        this.advanceDailyGiveaway = false;
        this.canMoveToStepThree = this.advanceDailyGiveaway;
      } else {
        for (let i = daysLength - 1; i >= this.duration; i--) {
          this.remain =
            this.remain +
            parseInt(
              this.advanceGiveawayForm.value.day[i]
                ? this.advanceGiveawayForm.value.day[i].day || 0
                : 0
            );
          this.daysArr.removeAt(i);

          this.minDaysValue = this.advanceGiveawayForm.value.day.filter(
            (x) => x.day !== '' && x.day !== null
          ).length;

          if (
            this.remain > 0 ||
            this.totalUnits <= 0 ||
            this.duration !== this.minDaysValue
          ) {
            this.advanceDailyGiveaway = false;
          } else {
            this.advanceDailyGiveaway = true;
          }

          if (
            this.minDaysValue === this.duration &&
            this.advanceDailyGiveaway
          ) {
            this.canMoveToStepThree = true;
          } else {
            this.canMoveToStepThree = false;
          }
        }
        const res = this.advanceGiveawayForm.value.day
          .map((x) => x.day)
          .reduce((total, currentValue) => {
            console.log(currentValue);
            return total + Number.parseInt(currentValue);
          });
        this.remain = this.totalUnits - res;
      }
    }
  }

  // Advance Daily Giveaway Fields
  get daysArr() {
    return this.advanceGiveawayForm.get('day') as FormArray;
  }

  initDayRows(isDis: Boolean, value: string): FormGroup {
    return this._formBuilder.group({
      day: new FormControl({ value: value, disabled: isDis }, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  initDefaultDayRows(daysCount?: number): FormGroup[] {
    const arr = [];
    const count = daysCount
      ? daysCount
      : this.editedProductDaysData.length
      ? this.editedProductDaysData.length
      : this.defaultDaysData.length;

    if (this.editedProductDaysData.length) {
      for (let i = 0; i < count; i++) {
        arr.push(
          this.initDayRows(false, this.editedProductDaysData[i].quantity)
        );
      }
      return arr;
    } else {
      for (let i = 0; i < count; i++) {
        if (i > 0) {
          arr.push(this.initDayRows(true, ''));
        } else {
          arr.push(this.initDayRows(false, ''));
        }
      }
      return arr;
    }
  }

  initNewDefaultDaysRows(): FormGroup[] {
    const arr = [];
    const count = this.defaultDaysData.length;
    for (let i = 0; i < count; i++) {
      if (i > 0) {
        arr.push(this.initDayRows(true, ''));
      } else {
        arr.push(this.initDayRows(false, ''));
      }
    }
    return arr;
  }

  addNewDay() {
    // !== '' && x.day !== null
    const lastday =
      this.advanceGiveawayForm.value.day[
        this.advanceGiveawayForm.value.day.length - 1
      ];
    console.log(lastday);
    if (this.daysArr.length < this.maxDays) {
      // checking if previous cell has a value
      if (lastday.day !== '' && lastday.day !== null) {
        this.daysArr.push(this.initDayRows(false, ''));
        this.minDaysValue = this.daysArr.length;
      } else {
        this.daysArr.push(this.initDayRows(true, ''));
        this.minDaysValue = this.daysArr.length;
      }
    } else {
      this.toastr.error("You can't add more than 90 days");
    }
  }

  //  Roman Created
  eval(day, j, remain) {
    this.canMoveToStepThree = false;
    this.advanceDailyGiveaway = false;
    this.daysArr.controls[j].patchValue({
      day: parseInt(day.target.value),
    });

    let sum: any = 0;
    let newSum = 0;

    let total: any = 0;
    let val: Number = 0;
    let remBefore: number = this.remain;

    for (let i = 0; i < this.advanceGiveawayForm.value.day.length; i++) {
      sum = eval(
        sum +
          (Number.isNaN(this.advanceGiveawayForm.value.day[i].day)
            ? 0
            : this.advanceGiveawayForm.value.day[i].day)
      );
      this.sum = sum;
      total = this.totalUnits;
      this.remain = total - sum;
      if (this.remain < 0) {
        this.advanceDailyGiveaway = false;
      } else if (this.remain > 0) {
        this.advanceDailyGiveaway = false;
      } else {
        if (this.advanceGiveawayForm.controls['day'].valid) {
          for (let k = 0; k < i; k++) {
            newSum += Number.isNaN(this.advanceGiveawayForm.value.day[k].day)
              ? 0
              : this.advanceGiveawayForm.value.day[k].day;
          }
          remBefore = this.totalUnits - newSum;
          this.submitDailyGiveaways();
        }
      }

      if (!day.target.value || day.target.value <= 0) {
        day.target.value = 0;
      }

      if (
        this.advanceGiveawayForm.value.day[i].day >= 0 &&
        this.totalUnits !== this.sum &&
        this.remain >= 0 &&
        this.advanceGiveawayForm.value.day[i].day !== ''
      ) {
        if (this.remain !== 0 && parseInt(day.target.value) >= 0) {
          this.daysArr.controls[i + 1].enable();
        }
      }
    }
  }

  eval2(day, j, remain) {
    this.canMoveToStepThree = false;
    let sum: any = 0;
    let total: any = 0;
    let val: Number = 0;
    for (let i = 0; i < this.advanceGiveawayForm.value.day.length; i++) {
      sum = eval(sum + this.advanceGiveawayForm.value.day[i].day);
      this.sum = sum;
      total = this.totalUnits;
      this.remain = total - sum;

      if (this.remain > 0) {
        this.advanceDailyGiveaway = false;
      } else {
        this.submitDailyGiveaways();
      }

      if (!day.target.value || day.target.value <= 0) {
        day.target.value = 0;
      }
    }
  }

  getProductData() {
    this.getProductDetails(this.productLaunchId);
    this.value = 0;
  }

  getProductDetails(productLaunchId) {
    this.loader = true;
    this.adminService
      .getProductLaunchDetailsForAdmin(productLaunchId)
      .subscribe((res) => {
        if (res.code == genralConfig.statusCode.ok) {
          if (!this.userSubscriptionGiveaways || !this.remainingFreeGiveaways) {
            this.calculateFreeGiveaways(
              res.data.subscription_details_id.plan_id.allowed_unit_giveaways,
              res.data.subscription_details_id.projected_unit_giveaways || 0,
              this.productDetails
                ? this.productDetails.free_giveaway_quantity
                : 0
            );
          }
          this.productDetails = res.data;
          this.seller_id = res.data.seller_id;
          this.productId = res.data.product_id._id;
          console.log('product details=====>', this.productDetails);
          this.patchProductDetails();
          this.loader = false;
        } else {
          this.loader = false;
          this.productDetails = [];
        }
      });
  }

  initializeForm(): void {
    this.advanceGiveawayForm = this._formBuilder.group({
      day: this._formBuilder.array([...this.initDefaultDayRows()]),
    });

    this.addLaunchSetup = this._formBuilder.group({
      keyword: this._formBuilder.array([this.initKeywordRows()]),
      link: this._formBuilder.array([this.initLinkRows()]),
    });

    this.addLaunchForm = this._formBuilder.group({
      product: ['', Validators.required],
      brand_name: ['', Validators.required],
      product_asin: ['', Validators.required],
      price: ['', Validators.required],
      launchPlatform: ['', Validators.required],
      otherPlatform: [''],
      giveaway_price: [
        '',
        [
          Validators.required,
          Validators.max((this.productDetails.price / 100) * 10),
          Validators.min(0),
        ],
      ],
    });

    this.addGiveawayForm = this._formBuilder.group({
      units: [
        '',
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.PRICING),
          Validators.min(1),
        ],
      ],
      start_date: ['', Validators.required],
      duration: [
        '',
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.INTEGER),
          Validators.min(1),
          Validators.max(90),
        ],
      ],
    });

    this.addEvergreenLaunchSetup = this._formBuilder.group({
      evergreen_giveaways: [
        '',
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.PRICING),
          Validators.max(this.totalUnits),
          Validators.min(1),
        ],
      ],
      evergreen_daily_giveaways: [
        '',
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.PRICING),
          Validators.max(this.maxEvergreenGiveaways),
          Validators.min(this.minEvergreenGiveaways),
        ],
      ],
      everGreenKeyword: this._formBuilder.array([
        this.initEverGreenKeywordRows(),
      ]),
    });
  }

  patchProductDetails() {
    this.isEvergreenLaunch = this.productDetails.isEGLaunch;
    this.productDetails.search_method === 'keywords'
      ? (this.isKeyMethod = true)
      : (this.isKeyMethod = false);

    if (this.productDetails.free_giveaway_quantity) {
      this.calculateFreeGiveaways(
        this.userSubscriptionGiveaways,
        this.remainingFreeGiveaways,
        this.productDetails.free_giveaway_quantity
      );
    }

    this.addLaunchForm.patchValue({
      brand_name: this.productDetails.product_id.brand_name
        ? this.productDetails.product_id.brand_name
        : '',
      product_asin: this.productDetails.product_id
        ? this.productDetails.product_id.asin
        : '',
      price: this.productDetails.product_id
        ? this.productDetails.product_id.price
        : '',
      product: this.productDetails.product_id.product_title,
      product_id: this.productDetails._id,
      launchPlatform: this.productDetails
        ? this.productDetails.launchPlatform
        : '',
      giveaway_price:
        this.productDetails.product_giveaway >=
        this.productDetails.product_id.price
          ? 0
          : this.productDetails.product_giveaway,
    });

    this.product_actual_price = this.productDetails
      ? this.productDetails.product_id.price
      : '';

    this.addLaunchForm.controls['giveaway_price'].setValidators([
      Validators.required,
      Validators.max((this.productDetails.product_id.price / 100) * 10),
      Validators.min(0),
    ]);

    this.addGiveawayForm.patchValue({
      units: this.productDetails.giveaway_quantity
        ? this.productDetails.giveaway_quantity
        : '',
      start_date: this.productDetails.launch_date
        ? this.productDetails.launch_date
        : '',
      duration: this.productDetails.giveaway_quantity_map.length,
    });
    this.duration = this.productDetails.giveaway_quantity_map.length;
    this.editedProductDaysData = this.productDetails.giveaway_quantity_map;
    const setTotalUnitEv = {
      target: { value: this.productDetails.giveaway_quantity },
    };
    const setProdCostEnv = {
      target: {
        value:
          this.productDetails.product_giveaway >=
          this.productDetails.product_id.price
            ? 0
            : this.productDetails.product_giveaway,
      },
    };
    this.setProdCost(setProdCostEnv, this.productDetails.giveaway_quantity);
    this.setEditedTotalUnit(setTotalUnitEv);
    this.product_image_url = this.productDetails.product_id.img_url;
    this.addLaunchForm.controls['brand_name'].disable();
    this.addLaunchForm.controls['product_asin'].disable();
    this.addLaunchForm.controls['price'].disable();
    this.addLaunchForm.controls['product'].disable();
    if (this.productDetails.search_method === 'keywords') {
      this.isKeyMethod = true;
      this.isMethod = false;
      this.isLinkMethod = false;
      this.addLaunchSetup = this._formBuilder.group({
        keyword: this._formBuilder.array([
          this.initEditedKeywordRows(
            this.productDetails.search_keywords[0].keyword,
            this.productDetails.search_keywords[0].weightPercent
          ),
        ]),
      });
      for (let i = 1; i < this.productDetails.search_keywords.length; i++) {
        this.addEditedNewKeyword(
          this.productDetails.search_keywords[i].keyword,
          this.productDetails.search_keywords[i].weightPercent
        );
      }
    } else {
      this.isLinkMethod = true;
      this.isMethod = false;
      this.isKeyMethod = false;

      this.addLaunchSetup = this._formBuilder.group({
        link: this._formBuilder.array([
          this.initEditedLinkRows(
            this.productDetails.special_links[0].link,
            this.productDetails.special_links[0].weightPercent
          ),
        ]),
      });
      for (let i = 1; i < this.productDetails.special_links.length; i++) {
        this.addEditedNewLink(
          this.productDetails.special_links[i].link,
          this.productDetails.special_links[i].weightPercent
        );
      }
    }

    if (this.isEvergreenLaunch) {
      this.addEvergreenLaunchSetup = this._formBuilder.group({
        evergreen_giveaways: [
          this.productDetails.evergreen_giveaway_quantity,
          [
            Validators.required,
            Validators.pattern(genralConfig.pattern.PRICING),
            Validators.max(this.totalUnits),
            Validators.min(1),
          ],
        ],
        evergreen_daily_giveaways: [
          this.productDetails.evergreen_daily_giveaways,
          [
            Validators.required,
            Validators.pattern(genralConfig.pattern.PRICING),
            Validators.max(this.maxEvergreenGiveaways),
            Validators.min(this.minEvergreenGiveaways),
          ],
        ],
        everGreenKeyword: this._formBuilder.array([
          this.initEditedEverGreenKeywordRows(
            this.productDetails.search_evergreen_keywords[0].keyword,
            this.productDetails.search_evergreen_keywords[0].weightPercent
          ),
        ]),
      });

      for (
        let i = 1;
        i < this.productDetails.search_evergreen_keywords.length;
        i++
      ) {
        this.addEditedNewEverGreenKeyWord(
          this.productDetails.search_evergreen_keywords[i].keyword,
          this.productDetails.search_evergreen_keywords[i].weightPercent
        );
      }

      const setEvergreenEditedTotalUnitsEnv = {
        target: { value: this.productDetails.evergreen_giveaway_quantity },
      };
      const setEvergreenEditedDailyGiveaways = {
        target: {
          value: this.productDetails.evergreen_daily_giveaways
            ? this.productDetails.evergreen_daily_giveaways
            : 0,
        },
      };

      this.setTotalEvergreenUnits(setEvergreenEditedTotalUnitsEnv);
      this.setMaxDailyGiveaways(setEvergreenEditedDailyGiveaways);
      this.addEvergreenLaunchSetup.controls[
        'evergreen_daily_giveaways'
      ].patchValue(this.productDetails.evergreen_daily_giveaways);
      this.addEvergreenLaunchSetup.controls['evergreen_giveaways'].patchValue(
        this.productDetails.evergreen_giveaway_quantity
      );
    }

    this.launch_identifier = this.productDetails.brand
      ? this.productDetails.brand.brand_identifier_number
      : '';
  }

  firstStepOver(event) {
    if (this.addLaunchForm.valid) {
      this.value = 25;
      return true;
    } else {
      this.toastr.error('Please fill the missing fields');
      this.value = 0;
      return false;
    }
  }

  secondStepOver() {
    if (!this.addGiveawayForm.value.units) {
      this.toastr.error('Must add number of units  & start date to proceed');
    } else if (!this.addGiveawayForm.value.units) {
      this.toastr.error('Must add number of units to proceed');
    } else if (this.addGiveawayForm.valid) {
      return true;
    } else {
      this.toastr.error('Please fill the missing fields');
    }
    return false;
  }

  openSecondStepOverDialog(stepper: MatStepper) {
    if (this.secondStepOver()) {
      let confirmObj = {
        title: 'Are you sure?',
        text: `You want giveaway ${this.totalUnits} units over ${
          this.minDaysValue
        } days
                starting on ${moment(
                  this.addGiveawayForm.value.start_date
                ).format('LLLL')}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      };
      this.general_service
        .updateConfirmationBox(confirmObj)
        .subscribe((res) => {
          if (res) {
            this.value = 50;
            stepper.next();
          } else {
            console.log('Canceleee');
          }
        });
    }
  }

  thirdStepBack() {
    this.value = 25;
  }

  thirdStepNext() {
    if (
      (this.addLaunchSetup.valid &&
        this.keywordArr &&
        this.keywordArr.length > 0) ||
      (this.addLaunchSetup.valid && this.linkArr && this.linkArr.length > 0)
    ) {
      this.value = 75;
    } else {
      this.toastr.error('Please specify keywords or special links');
    }
  }

  finaStepBack() {
    this.value = 50;
  }

  backToFirstStep() {
    this.value = 0;
  }

  thirdStepOver() {
    if (!this.isKeyMethod && !this.isLinkMethod) {
      this.toastr.error('Must add keyword(s) or a special link to proceed');
      return false;
    } else if (this.isKeyMethod && this.keywordArr.length === 0) {
      this.toastr.error('Must add a keyword/ weight to proceed');
      return false;
    } else if (this.isLinkMethod && this.linkArr.length === 0) {
      this.toastr.error('Must add a special link/ weight to proceed');
      return false;
    } else if (this.evalKeyWeighted) {
      this.toastr.error('All keyword weight addition must be 100');
      return false;
    } else if (this.evalLinkWeighted) {
      this.toastr.error('All special link weight addition must be 100');
      return false;
    } else if (this.addLaunchSetup.valid) {
      return true;
    } else if (this.isKeyMethod && !this.keywordArr[0]) {
      this.toastr.error('Must add a keyword to proceed');
    } else if (this.isLinkMethod && !this.linkArr[0]) {
      this.toastr.error('Must add a special link to proceed');
    } else {
      return true;
    }

    this.value = 66;
  }

  finalStepOverEverGreen() {
    if (this.everGreenKeywordArr.length === 0) {
      this.toastr.error('Must add a Evergreen keyword to proceed');
    } else if (this.evalKeyWeighted) {
      this.toastr.error('All Evergreen keywords weight addition must be 100');
    } else if (this.addEvergreenLaunchSetup.valid) {
      return true;
    } else {
      this.toastr.error('Please fill the missing fields');
    }
  }

  keyWordMethodSelected() {
    this.isKeyMethod = true;
    this.isMethod = false;
    this.isLinkMethod = false;
    this.evalLinkWeighted = false;
    this.addLaunchSetup = this._formBuilder.group({
      keyword: this._formBuilder.array([this.initKeywordRows()]),
    });
  }

  linkMethodSelected() {
    this.isLinkMethod = true;
    this.isMethod = false;
    this.isKeyMethod = false;
    this.evalKeyWeighted = false;
    this.addLaunchSetup = this._formBuilder.group({
      link: this._formBuilder.array([this.initLinkRows()]),
    });
  }

  subsctiptionPopup() {
    this.toastr.success('Subscription upgrading');
  }

  upgradeSubscriptionSelected() {
    this.subsctiptionPopup();
    this.showSubscriptionTab = true;
  }

  showVideo() {
    this.showVideoTab = true;
  }

  evergreenLaunchIsSelected() {
    this.addEvergreenLaunchSetup = this._formBuilder.group({
      evergreen_giveaways: [
        '',
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.PRICING),
          Validators.max(this.totalUnits),
          Validators.min(1),
        ],
      ],
      evergreen_daily_giveaways: [
        '',
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.PRICING),
          Validators.max(this.maxEvergreenGiveaways),
          Validators.min(this.minEvergreenGiveaways),
        ],
      ],
      everGreenKeyword: this._formBuilder.array([
        this.initEverGreenKeywordRows(),
      ]),
    });

    this.evergreenProductDetailsPrice = Number(
      (
        (this.productDetails.product_id.price -
          this.productDetails.product_id.price) *
        this.evergreenTotalUnits
      ).toFixed(2)
    );

    this.giveAwayPrice = this.totalUnits ? Number(4.95 * this.paidUnits) : 0;
    this.evergeenAdditionalFee = this.evergreenProductDetailsPrice
      ? Number((this.evergreenProductDetailsPrice * 5) / 100)
      : 0;
    this.totalLaunchCost =
      this.totalUsualLaunchCost + this.evergreenTotalLaunchCost;
    this.isEvergreenLaunch = true;
  }

  usualLaunchIsSelected() {
    this.evergreenTotalUnits = 0;
    this.evergreenProductDetailsPrice = 0;
    this.evergeenAdditionalFee = 0;
    this.evergreenTotalLaunchCost = 0;
    this.giveAwayPrice = this.totalUnits ? Number(4.95 * this.paidUnits) : 0;
    this.additionalFee = this.productDetailsPrice
      ? Number((this.productDetailsPrice * 5) / 100)
      : 0;
    this.totalUsualLaunchCost = Number(
      (
        this.productDetailsPrice +
        this.giveAwayPrice +
        this.additionalFee
      ).toFixed(2)
    );
    this.totalLaunchCost = this.totalUsualLaunchCost;
    this.isEvergreenLaunch = false;
  }

  async editLaunch(isStartLaunch, paymentMethod?, isSubscriptionRedirect?) {
    const validation = this.thirdStepOver();
    console.log('Usual Validation result is =====>', validation);
    if (validation) {
      this.loader = true;
      this.displayPaymentDialogue = false;
      this.value = 100;
      let daily_gv = [];
      let additional_boost = [];
      let day = 0;
      this.advanceGiveawayForm.value.day.forEach((element, index) => {
        if (element.day > 0) {
          daily_gv.push({
            day: 'Day' + (day + 1),
            quantity: element.day,
          });
        }
        day++;
      });

      let launchObj = {};
      let keywords = [];
      let links = [];
      if (this.isKeyMethod) {
        keywords = this.addLaunchSetup.value.keyword
          ? this.addLaunchSetup.value.keyword
          : [];
      }
      if (this.isLinkMethod) {
        links = this.addLaunchSetup.value.link
          ? this.addLaunchSetup.value.link
          : [];
      }

      launchObj = {
        product_id: this.productId,
        product_giveaway: this.addLaunchForm.value.giveaway_price,
        launch_date: this.addGiveawayForm.value.start_date,
        launch_period: this.minDaysValue,
        giveaway_quantity: this.totalUnits,
        free_giveaway_quantity: this.totalUnits - this.paidUnits,
        prev_giveaway_quantity: this.productDetails.giveaway_quantity,
        giveaway_quantity_map: daily_gv,
        launch_isActive: isStartLaunch,
        search_keywords: keywords,
        special_links: links,
        additional_boosts: additional_boost ? additional_boost : [],
        giveaway_type: daily_gv.length ? 'day' : 'total',
        search_method: this.isKeyMethod ? 'keywords' : 'link',
        price: this.addLaunchForm.getRawValue().price,
        totalLaunchCost: this.totalLaunchCost,
        payType: this.payType,
        paymentMethod: '',
        edit: true,
        isEgLaunch: false,
        seller_id: this.seller_id,
        launch_id: this.productLaunchId,
      };

      console.log('Launch Object====>', launchObj);

      const platform = this.addLaunchForm.value.launchPlatform as LaunchPlatformType;

      if (platform === 'other') {
        launchObj['launchPlatform'] = this.addLaunchForm.value.otherPlatform;
      } else {
        launchObj['launchPlatform'] = this.addLaunchForm.value.launchPlatform;
      }

      let paymentError = '';

      if (paymentError) {
        this.toastr.error(paymentError);
        this.loader = false;
        this.displayPaymentDialogue = true;
        return;
      }

      this.adminService
        .editProductLaunchByAdmin(launchObj, this.productDetails._id)
        .subscribe(
          (res) => {
            if (res.code == genralConfig.statusCode.ok) {
              this.toastr.success(res.message);
              this.loader = false;
              this.router.navigate(['/layout/admin/setuptracker']);
            } else {
              this.toastr.error(res.message);
              this.loader = false;
            }
          },
          (error) => {
            this.toastr.error('Error occured');
            this.loader = false;
          }
        );
    }
  }

  async editEvergreenLaunch(
    isStartLaunch,
    paymentMethod?,
    isSubscriptionRedirect?
  ) {
    const validation = this.finalStepOverEverGreen();
    console.log('Evergreen Validation result is =====>', validation);
    if (validation) {
      this.displayPaymentDialogue = false;
      this.value = 100;
      let daily_gv = [];
      let additional_boost = [];
      let day = 0;
      this.advanceGiveawayForm.value.day.forEach((element, index) => {
        if (element.day >= 0) {
          daily_gv.push({
            day: 'Day' + (day + 1),
            quantity: element.day,
          });
        }
        day++;
      });

      let evergreenLaunchObj = {};

      if (this.isEvergreenLaunch) {
        evergreenLaunchObj = {
          product_id: this.productId,
          product_giveaway: this.addLaunchForm.value.giveaway_price,
          launch_date: this.addGiveawayForm.value.start_date,
          launch_period: this.minDaysValue,
          giveaway_quantity: this.totalUnits,
          free_giveaway_quantity: this.totalUnits - this.paidUnits,
          giveaway_quantity_map: daily_gv,
          evergreen_giveaway_quantity: +this.evergreenTotalUnits,
          evergreen_daily_giveaways: +this.maxEvergreenDailyGiveaways,
          launch_isActive: isStartLaunch,
          search_keywords: this.addLaunchSetup.value.keyword
            ? this.addLaunchSetup.value.keyword
            : [],
          evergreen_search_keywords:
            this.addEvergreenLaunchSetup.value.everGreenKeyword,
          special_links: this.addLaunchSetup.value.link
            ? this.addLaunchSetup.value.link
            : [],
          additional_boosts: additional_boost ? additional_boost : [],
          giveaway_type: daily_gv.length ? 'day' : 'total',
          search_method: this.isKeyMethod ? 'keywords' : 'link',
          price: this.addLaunchForm.getRawValue().price,
          totalLaunchCost: this.totalLaunchCost,
          payType: this.payType,
          paymentMethod: '',
          edit: true,
          isEgLaunch: true,
          seller_id: this.seller_id,
          launch_id: this.productLaunchId,
        };
      }

      console.log('Evergreen Launch Object====>', evergreenLaunchObj);

      const platform = this.addLaunchForm.value.launchPlatform as LaunchPlatformType;

      if (platform === 'other') {
        evergreenLaunchObj['launchPlatform'] =
          this.addLaunchForm.value.otherPlatform;
      } else {
        evergreenLaunchObj['launchPlatform'] =
          this.addLaunchForm.value.launchPlatform;
      }

      if (this.isEvergreenLaunch) {
        this.adminService
          .editProductLaunchByAdmin(evergreenLaunchObj, this.productDetails._id)
          .subscribe((res) => {
            if (res.code == genralConfig.statusCode.ok) {
              this.toastr.success(res.message);
              this.loader = false;
              this.router.navigate(['/layout/admin/setuptracker']);
            } else if (res.code == genralConfig.statusCode.created) {
              this.toastr.success(res.message);
              this.loader = false;
              this.router.navigate(['/layout/admin/setuptracker']);
            } else {
              this.toastr.error(res.message);
              this.loader = false;
            }
          });
      }
    }
  }

  closeVideoDialog() {
    this.showVideoTab = false;
  }

  // open advance giveaway option
  openAdvanceOption() {
    if (this.addGiveawayForm.value.units) {
      this.isAdvanceOption = true;
    } else {
      this.toastr.info('Please Select total units!');
    }
  }

  closedilog() {
    if (this.remain) {
      this.toastr.error(
        `Warning: Please enter an additional ${this.remain} giveaways!`
      );
    } else {
      this.isAdvanceOption = false;
      this.minDaysValue = this.advanceGiveawayForm.value.day.filter(
        (x) => x.day !== '' && x.day !== null
      ).length;

      console.log('This days ar is ====> ', this.advanceGiveawayForm.value.day);
      console.log('min', this.minDaysValue);
    }
  }

  submitDailyGiveaways() {
    if (this.remain === 0 && this.advanceGiveawayForm.valid) {
      this.canMoveToStepThree = true;
      this.isAdvanceOption = false;
      this.advanceDailyGiveaway = true;
      this.minDaysValue = this.advanceGiveawayForm.value.day.filter(
        (x) => x.day !== '' && x.day !== null
      ).length;
    }
  }

  calculateTotalCost() {
    if (this.productDetails.product_id.price) {
      this.additionalFee = this.productDetailsPrice
        ? Number((this.productDetailsPrice * 5) / 100)
        : 0;
      this.totalUsualLaunchCost = Number(
        (
          this.productDetails.product_id.price *
            (this.totalUnits ? this.totalUnits : 1) +
          this.giveAwayPrice +
          this.additionalFee
        ).toFixed(2)
      );
      this.totalLaunchCost =
        this.totalUsualLaunchCost + this.evergreenTotalLaunchCost;
    }
  }
}
