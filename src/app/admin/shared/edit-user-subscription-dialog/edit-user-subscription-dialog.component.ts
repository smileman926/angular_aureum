import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GenralService } from 'src/app/core';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { AdminServicesService } from '../../services/admin-services.service';

@Component({
  selector: 'app-edit-user-subscription-dialog',
  templateUrl: './edit-user-subscription-dialog.component.html',
  styleUrls: ['./edit-user-subscription-dialog.component.scss']
})
export class EditUserSubscriptionDialogComponent implements OnInit {
  planData: any = []
  public loader: boolean = false;
  public countriesPhoneCodes = [];

  private _item: any;
  @Input('item')
  public set item(value: any) {
    if (!value) { return; }

    this._item = value;
    this.updateUserHader = this._item.firstname + ' ' + this._item.lastname;
    this.updateUserId = this._item._id;
    // this.updateUserForm.patchValue({
    //   country: this._item.countryCode ? this.findCountryByCode(this._item.countryCode) : '',
    // });
  }

  @Output('hide')
  private _hide = new EventEmitter<void>();

  @Input('opened')
  public set opened(value: boolean) {
    this.displayUpdateSellerDialogue = value;
    this.updateUserForm = this.formBuilder.group({
      firstname: ['', [Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      lastname: ['', [Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      email: ['', [Validators.pattern(genralConfig.pattern.EMAIL)]],
      publicName: ['', [Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      subscription: ['']
    });
  }

  displayUpdateSellerDialogue: boolean;
  updateUserHader: string;
  updateUserForm: FormGroup;
  updateUserId: any;

  constructor(
    private formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private general_service: GenralService,
    private _adminservice: AdminServicesService,
  ) { }

  ngOnInit() {
    this.getPlans();

    // this.updateUserForm = this.formBuilder.group({
    //   firstname: ['', [Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
    //   lastname: ['', [Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
    //   email: ['', [Validators.pattern(genralConfig.pattern.EMAIL)]],
    //   publicName: ['', [Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
    //   subscription: ['']
    // });
  }

  getPlans() {
    this.loader = true
    this.general_service.getSubscriptionPlans().subscribe(res => {

      if (res.code == genralConfig.statusCode.ok) {
        this.loader = false;
        this.planData = res.data;
        console.log("plan data on pricing is===>", this.planData)
      } else {
        this.loader = false;
        this._toastr.error(res.message)
      }
    })
  }

  public subscriptionNameChange(subscription) {
    console.log('Changed')
    console.log(subscription)
    console.log(this.planData)
    // const country = this.countriesPhoneCodes.filter(i => countryName.includes(i.name));
    // this.updateUserForm.patchValue({
    //   countryCode: country[0].code,
    // });
  }



  public onHide() {
    this.displayUpdateSellerDialogue = false;
    this._hide.emit();
  }

  updateUserData() {
    const data = {
      user_id: this.updateUserId,
      firstName: this.updateUserForm.value.firstname,
      lastName: this.updateUserForm.value.lastname,
      publicName: this.updateUserForm.value.publicName,
      email: this.updateUserForm.value.email,
      subscription: this.updateUserForm.value.subscription,
    };

    this.loader = true;
    console.log('This data is ====>', data)
    this._adminservice.changeSellerDataByAdmin(data).subscribe(userUpResp => {
      this.loader = false;
      if (userUpResp) {
        if (typeof userUpResp.message === 'string') {
          this._toastr.success(userUpResp.message);
          this.displayUpdateSellerDialogue = false;
        } else {
          if (userUpResp.message.errmsg) {
            this._toastr.error(userUpResp.message.errmsg);
          } else {
            this._toastr.error('Error occured');
          }
        }
      } else {
        this._toastr.error('Error occured');
      }
    });
  }

}
