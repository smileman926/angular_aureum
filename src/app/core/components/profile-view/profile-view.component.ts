import { Component, OnInit, Injector } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { WebStorage } from 'src/app/core/web.storage';
import { GenralService } from '../../services';
import { environment } from 'src/environments/environment';
import { ProfileService } from './service/profile.service';
import { HeaderService } from 'src/app/layout/components/header/service/header.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  providers: [GenralService]
})
export class ProfileViewComponent implements OnInit {
  public editProfileForm: FormGroup;
  public loggedInUserDetails: any;
  public url = <any>'';
  public isEdit = false;
  countryData: any = [];
  stateData: any = [];
  loader: boolean;
  baseimageurl : string = environment.backendBaseUrl;
  tempUrl: string | ArrayBuffer;
  
  constructor(
    // public _genralServices: GenralService,
    private _toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _webStorage: WebStorage,
    private _profileService: ProfileService,
    // public _headerService: HeaderService
  ) { }

  ngOnInit() {
    // this.loggedInUserDetails = this._webStorage.get('all');
    this.editProfileForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      lastname: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      username: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      city: ['', [Validators.required, Validators.pattern(genralConfig.pattern.CITY)]],
      state: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      country: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      zipcode: ['', [Validators.required, Validators.pattern(genralConfig.pattern.POSTAL_CODE)]],
      email: ['', [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]],
      address: ['', [Validators.required, Validators.pattern(genralConfig.pattern.DESCRIPTION)]],
      phone: ['', [Validators.required, Validators.pattern(genralConfig.pattern.PHONE_NO)]],
      imageurl: null,
      id: [this.loggedInUserDetails._id],
    })
    this.countryList();
    this.stateList();
    this.disableOrEnableForm();
    this.getUserDetails();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {// called once readAsDataURL is completed
        this.url = false;
        this.tempUrl = (<FileReader>event.target).result;// read file as data url
      }
      reader.readAsDataURL(event.target.files[0]);
      let file = event.target.files[0];
      this.editProfileForm.get('imageurl').setValue(file)
    }
  }

  getCountryState(country_id) {
    this.stateList(country_id);
  }

  private prepareSave(): any {
    let inputData = new FormData();
    inputData.append('username', this.editProfileForm.get('username').value);
    inputData.append('firstname', this.editProfileForm.get('firstname').value);
    inputData.append('lastname', this.editProfileForm.get('lastname').value);
    inputData.append('city', this.editProfileForm.get('city').value);
    inputData.append('state', this.editProfileForm.get('state').value);
    inputData.append('country', this.editProfileForm.get('country').value);
    inputData.append('zipcode', this.editProfileForm.get('zipcode').value);
    inputData.append('email', this.editProfileForm.get('email').value);
    inputData.append('address', this.editProfileForm.get('address').value);
    inputData.append('phone', this.editProfileForm.get('phone').value);
    inputData.append('image', this.editProfileForm.get('imageurl').value);
    inputData.append('userId', this.loggedInUserDetails._id);
    return inputData;
  }

  profileOperation() {
    this.loader = true;
    const formModel = this.prepareSave();
    this._profileService.editProfile(formModel).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.onEdit(false);
        // this._headerService.setImage(res.data.image);
        this._webStorage.set('profilepic',res.data.image);
        this._webStorage.set('userName',res.data.userName)
        this._toastr.success(res.message);
        //reset all to initials
      } else {
        this._toastr.error(res.message);
      }
    })
  }

  stateList(country_id?) {
    let stateObject = { country_id: country_id }
    // this._genralServices.stateList(stateObject).subscribe((res: any) => {
    //   if (res.code == genralConfig.statusCode.ok) {
    //     if (!res.data.length) {
    //       res.data.push({ message: 'No record found' });
    //     } else {
    //       this.stateData = res.data;
    //     }
    //   }
    // })
  }
  countryList() {
    let countryObject = {}
    // this._genralServices.countryList(countryObject).subscribe((res: any) => {
    //   if (res.code == genralConfig.statusCode.ok) {
    //     if (!res.data.length) {
    //       res.data.push({ message: 'No record found' });
    //     }
    //     this.countryData = res.data;
    //   }
    //   else {
    //   }
    // })
  }
  disableOrEnableForm() {
    if (!this.isEdit) {
      this.editProfileForm.disable();
    } else {
      this.editProfileForm.enable();
    }

  }
  public delete() {
    this.url = null;
  }
  goBack() {
    // this._genralServices.goBack();
  }
  onEdit(value: boolean) {
    this.isEdit = value;
    this.disableOrEnableForm();
  }

  getUserDetails() {
    this.loader = true;
    this._profileService.getUserDetails({ 'userId': this.loggedInUserDetails._id }).subscribe(res => {
      this.loader = false;
      if (res.code == 200) {
        this.editProfileForm.patchValue({
          firstname: res.data.firstName,
          lastname: res.data.lastName,
          username: res.data.userName,
          city: res.data.city,
          state: res.data.state,
          country: res.data.country,
          zipcode: res.data.postal_code,
          email: res.data.email,
          address: res.data.address,
          phone: res.data.mobile_no,
          imagePath: res.data.image,
        })
        this.url = res.data.image;
        // this._headerService.setImage(this.url);
      } else {
        this._toastr.error(res.message);
      }
    });
  }

}
