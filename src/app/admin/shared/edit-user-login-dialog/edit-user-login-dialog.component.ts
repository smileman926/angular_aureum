import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForgetpasswordService } from 'src/app/forgetpassword/service/forgetpassword.service';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { AdminServicesService } from '../../services/admin-services.service';
import { countriesPhoneCodes } from '../countries-phone-codes';

@Component({
  selector: 'app-edit-user-login-dialog',
  templateUrl: './edit-user-login-dialog.component.html',
  styleUrls: ['./edit-user-login-dialog.component.scss']
})
export class EditUserLoginDialogComponent implements OnInit {
  public loader = false;
  public countriesPhoneCodes = [];

  private _item: any;
  @Input('item')
  public set item(value: any) {
    if (!value) { return; }

    this._item = value;
    this.updateUserHader = this._item.firstname + ' ' + this._item.lastname;
    this.updateUserId = this._item._id;
    this.updateUserForm.patchValue({
      email: this._item.email ? this._item.email : '',
      phone_no: this._item.phone_no ? this._item.phone_no : '',
      countryCode: this._item.countryCode ? this._item.countryCode : '',
      country: this._item.countryCode ? this.findCountryByCode(this._item.countryCode) : '',
      accuracyRate: this._item.accuracy_rate ? this._item.accuracy_rate : '',
    });
  }

  @Output('hide')
  private _hide = new EventEmitter<void>();

  @Input('opened')
  public set opened(value: boolean) {
    this.displayUpdateUserDialogue = value;
  }

  displayUpdateUserDialogue: boolean;
  updateUserHader: string;
  updateUserForm: FormGroup;
  updateUserId: any;

  constructor(
    private formBuilder: FormBuilder,
    private _forgetpasswordService: ForgetpasswordService,
    private _toastr: ToastrService,
    private _adminservice: AdminServicesService,
  ) { }

  ngOnInit() {
    this.countriesPhoneCodes = countriesPhoneCodes;

    this.updateUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]],
      phone_no: ['', [Validators.required, Validators.pattern(genralConfig.pattern.PHONE_NO)]],
      countryCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      accuracyRate: ['', [
        Validators.required,
        Validators.maxLength(3),
        Validators.max(100),
      ]],
    });
  }

  public countryNameChange(countryName) {
    const country = this.countriesPhoneCodes.filter(i => countryName.includes(i.name));
    this.updateUserForm.patchValue({
      countryCode: country[0].code,
    });
  }

  public countryCodeChange(code) {
    this.updateUserForm.patchValue({
      country: this.findCountryByCode(code),
    });
  }

  private findCountryByCode(code: string): string {
    let name = '';
    const countries = countriesPhoneCodes.filter(x => x.code === code);
    if (countries.length > 0) { name = countries[countries.length - 1].name; }
    return name;
  }

  public onHide() {
    this.displayUpdateUserDialogue = false;
    this._hide.emit();
  }

  updateUserData() {
    const data = {
      user_id: this.updateUserId,
      email: this.updateUserForm.value.email,
      countryCode: this.updateUserForm.value.countryCode,
      phone_no: this.updateUserForm.value.phone_no,
      accuracy_rate: this.updateUserForm.value.accuracyRate,
    };

    this.loader = true;
    this._adminservice.updateUser(data).subscribe(userUpResp => {
      this.loader = false;
      if (userUpResp) {
        if (typeof userUpResp.message === 'string') {
          this._toastr.success(userUpResp.message);
          this.displayUpdateUserDialogue = false;
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

  sendForgetPasswordEmail() {
    this.loader = true;
    this._forgetpasswordService.sendEmail(this.updateUserForm.value).subscribe(res => {
      this.loader = false;
      if (res.code === genralConfig.statusCode.ok) {
        this._toastr.success(res.message);
      } else {
        this._toastr.error(res.message);
      }
    });
  }
}
