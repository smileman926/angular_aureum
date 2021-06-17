import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenralService } from 'src/app/core';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { HeaderService } from '../header/service/header.service';
import { environment } from 'src/environments/environment';
import { WebStorage } from 'src/app/core/web.storage';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';
import { AutoLogoutService } from 'src/app/shared/services/auto-logout.service';
const URL = environment.apiUrl + '/uploadUserProfilePic';
const path = environment.apiUrl + '/uploads/profile/'
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.scss'],
  providers: [AutoLogoutService]
})
export class AdminheaderComponent implements OnInit {
  loader: Boolean = false
  username: string = '';
  image: string = '';
  subscriptionname: Subscription;
  subscriptionimage: Subscription;
  loggedInUserDetails: any
  editProfileForm: FormGroup;
  changePasswordForm: FormGroup
  isEditProfile: Boolean = false;
  cPassword: Boolean = false;
  resettoken: any
  uploader: FileUploader;
  token: any;
  url: any;
  showHideSidebar: any;
  notificationList: any;
  readNotification: any;
  notificationCount: any = 0;
  constructor(
    private _genralServices: GenralService,
    private _headerService: HeaderService,
    private _webStorage: WebStorage,
    private formBuilder: FormBuilder,
    public router: Router,
    private toastr: ToastrService,
    private autoLogoutService: AutoLogoutService
  ) {
    this.editProfileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]],
      firstname: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      lastname: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],


    });
    let password = new FormControl('', [Validators.required, Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH)]);
    let prev_password = new FormControl('', [Validators.required, Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH)]);

    let confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)])
    this.changePasswordForm = this.formBuilder.group({
      prev_password: prev_password,
      password: password,
      confirmPassword: confirmPassword,
    });
    this.token = this._webStorage.get('token')
    let token = this._webStorage.get('token')
    this.resettoken = token.split("Bearer ").pop();
    this.uploader = new FileUploader({
      url: URL,
      queueLimit: 100,
      authToken: this.token,
      disableMultipart: false,
      removeAfterUpload: true,
      filters: [{
        name: 'propertiesExtension',
        fn: (item: any): boolean => {
          const file = item.type.split('/');
          const fileExt = file[1];
          const fileType = file[0];
          const size = item.size;
          if (fileType == 'image') {
            if ('|jpg|png|jpeg|'.indexOf(fileExt) === -1) {
              this.toastr.error(genralConfig.Image.IMAGE_FORMAT_NOT_SUPPORTED);

              return false
            } else if (size >= 20185920) { //20mb
              this.toastr.error(genralConfig.Image.IMAGE_SIZE_EXCEED);


              return false;
            } else {
              return true;
            }
          } else {
            this.toastr.error(genralConfig.Image.FILE_FORMAT_NOT_SUPPORTED);


          }

        }
      }],
    });
    this.uploader.onBeforeUploadItem = (item) => {
    };
    this.uploader.onAfterAddingFile = function (item) {
    };
    this.uploader.onErrorItem = function (item, res, sta, he) {
    };
    this.uploader.onCompleteItem = function (item, res, sta, he) {
    };
    this.uploader.onCompleteAll = function () {
    };
    this.uploader.uploadAll();
    this.uploader.onBuildItemForm = (item, form) => {
    };
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => { if (this.uploader.queue.length > 1) { this.uploader.queue.splice(0, 1); } };


    this.ngOnInit();
  }

  ngOnInit() {
    this.syncUserData();
  }

  HideShowSidebar() {
    document.getElementsByTagName('body')[0].classList.toggle('sidebar-collaps');
  }

  syncUserData() {
    this._genralServices.getUserDetails().subscribe(res => {
      console.log("resssssssssssssssss=>", res)
      if (res.code == genralConfig.statusCode.ok) {
        this.loggedInUserDetails = res.data;
        this.getUserImage(this.loggedInUserDetails.profile_image)

        console.log("login user data is===========>", this.loggedInUserDetails);
        this._headerService.setTitle(this.loggedInUserDetails.firstname + " " + this.loggedInUserDetails.lastname);
        this._headerService.setImage(this.loggedInUserDetails.profile_image);
        this.subscriptionname = this._headerService.username.subscribe(username => {
          this.username = username ? username : this.loggedInUserDetails.firstname + " " + this.loggedInUserDetails.lastname;
          console.log("username in admin header", this.username)

        });
        // this.subscriptionimage = this._headerService.image.subscribe(url => {
        //   console.log("header image in url is========>", url);
        //   this.image = path + url;

        // });
      } else {
        this.loggedInUserDetails = {};

      }
    })
    console.log('****************************', this.username, this.image)
  }

  logOut() {
    console.log("Logout calling here....");
    this._webStorage.clearAll();
    this.router.navigate(['/']);
    // this._loginService.logout().subscribe((res) => {
    //   if (res.code == genralConfig.statusCode.ok) {
    //     this.loggedInUserDetails = {};
    //     this.router.navigate(['/login']);
    //   } else {
    //     this.toastr.error(res.message)
    //   }
    // })
  }

  getUserImage(url: string) {
    console.log('Startin getUserImage in header component')
    this._genralServices.getImageLink(url).subscribe(res => {
      if (res.code == genralConfig.statusCode.ok) {
        console.log('This link from api is =====>', JSON.stringify(res))
        this.image = res;

      }
      else {
        this.image = res
      }
    })
  }

  updateProfilePic() {
    console.log("Upload new profile picture calling here.......");
    // this.loader = true;

    if (this.uploader.queue.length > 0) {
      this.loader = true;

      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (fileItem, response, status, headers) => {
        console.log(' on complete item response ==', JSON.parse(response))
        let res = JSON.parse(response);
        if (res.code == genralConfig.statusCode.ok) {
          this.loader = false;
          console.log("Succes msg------>", res.message);
          this.syncUserData();
          this.toastr.success(res.message);
        } else {
          this.loader = false;
          console.log("Error msg------>", res.message);
          this.toastr.error(res.message);
        }
      };
    }
  }

  submitProfile() {
    this.loader = true;

    console.log("submit edit profile details=======>", this.editProfileForm.value);

    this._genralServices.updateUserProfile(this.editProfileForm.value).subscribe(res => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loader = false;
        this.toastr.success(res.message);
        this.syncUserData();
        this.closeEditDilog();
      }
      else if (res.code == genralConfig.statusCode.created) {
        this.loader = false;
        this.logOut();
        this.toastr.success(res.message);
      }
      else {
        this.loader = false;
        this.toastr.error(res.message);
        // this.closeEditDilog();

      }
    })

  }

  editProfile() {
    this.isEditProfile = true;
    this.patchValuesInEditProfile();
  }

  patchValuesInEditProfile() {
    this.editProfileForm.patchValue({
      firstname: this.loggedInUserDetails.firstname,
      lastname: this.loggedInUserDetails.lastname,
      email: this.loggedInUserDetails.email
    })
  }

  closeEditDilog() {
    console.log("Closedialog calling here...");
    this.isEditProfile = false;
  }

  closedilog() {
    console.log("Closedialog calling here...");
    this.cPassword = false;
  }
  openChangePassword() {
    this.cPassword = true;
    this.changePasswordForm.reset();
    console.log("change password dailog can be called here");
  }
  changePassword() {
    console.log("change password=========>", this.changePasswordForm.value);
    let objToAdd = {
      password: this.changePasswordForm.value.password,
      prev_password: this.changePasswordForm.value.prev_password,
      token: this.resettoken
    }

    console.log("obj to change password is=======>", objToAdd);
    this._genralServices.createPassword(objToAdd).subscribe(res => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loader = false;
        this.toastr.success(res.message);
        this.closedilog();
      } else {
        this.loader = false;
        this.toastr.error(res.message);
        // this.closedilog();
      }
    })

  }

}
