import { Component, OnInit } from '@angular/core';
import { GenralService } from '../..';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LocalStorageService } from 'ngx-webstorage';
import { genralConfig } from '../../constant/genral-config.constant';
import { ChangepasswordService } from './service/changepassword.service';
import { LoginService } from '../../../login/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WebStorage } from 'src/app/core/web.storage';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  loggedInUserDetails: any;
  loader: boolean;
  changePasswordForm: any;

  constructor(
    public _genralServices: GenralService,
    private _changePasswordService: ChangepasswordService,
    private _LoginService: LoginService,
    private _toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _webStorage: WebStorage
  ) {

  }

  ngOnInit() {
    this.loggedInUserDetails = this._webStorage.get('all');
    let newPassword = new FormControl('', [Validators.required, Validators.maxLength(genralConfig.pattern.PASSWORDMAXLENGTH), Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH)]);
    let newRepassword = new FormControl('', [Validators.required, CustomValidators.equalTo(newPassword)])
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: newPassword,
      newRepassword: newRepassword,
      userId: [this.loggedInUserDetails._id]
    })
  }
  goBack() {
    this._genralServices.goBack();
  }

  changePassword() {
    this.loader = true;
    if (!this.changePasswordForm.value.userId) {
      this.changePasswordForm.value.userId = this.loggedInUserDetails._id
    }
    this._changePasswordService
      .changePassword(this.changePasswordForm.value)
      .subscribe(res => {
        this.loader = false;
        if (res && res.code == genralConfig.statusCode.ok) {
          // this._toastr.success(res.message)
          this._LoginService.logout();
          this.router.navigate(['/login'])
        } else {
          this._toastr.error(res.message);
          this.changePasswordForm.reset();
        }
      });
  }

}
