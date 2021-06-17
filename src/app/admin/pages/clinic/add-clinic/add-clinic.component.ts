import { Component, OnInit } from '@angular/core';
import { GenralService } from '../../../../core';
import { WebStorage } from '../../../../core/web.storage';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { genralConfig } from '../../../../core/constant/genral-config.constant';
import { ClinicServiceService } from '../services/clinic-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss'],
  providers: [GenralService]

})
export class AddClinicComponent implements OnInit {
  isLinear = false;
  public loggedInUserDetails: any;
  firstFormGroup: FormGroup;
  loader: boolean = false;

  constructor(
    public _genralServices: GenralService,
    private _webStorage: WebStorage,
    private _formBuilder: FormBuilder,
    public _clinicService: ClinicServiceService,
    private toastr: ToastrService,
    private router: Router

  ) { }

  ngOnInit() {
    this.loggedInUserDetails = this._webStorage.get('all');

    this.firstFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME),Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      registration_no: ['', [Validators.required,Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern(genralConfig.pattern.MOB_NO),Validators.maxLength(genralConfig.pattern.MOBILEMAX),Validators.minLength(genralConfig.pattern.MOBILEMIN)]],
    });

  }
  goBack() {
    this._genralServices.goBack();
  }
  addClinics() {
    if(this.firstFormGroup.valid){
      this.loader = true;
      let dataObj = {
  
        name: this.firstFormGroup.value.name ? this.firstFormGroup.value.name : '',
        registration_no: this.firstFormGroup.value.registration_no ? this.firstFormGroup.value.registration_no : '',
        address: this.firstFormGroup.value.address ? this.firstFormGroup.value.address : '',
        contact: this.firstFormGroup.value.contact ? this.firstFormGroup.value.contact : '',
      }
      this._clinicService.addClinic(dataObj).subscribe((res: any) => {
        this.loader = false;
        if (res && res.code == genralConfig.statusCode.ok) {
          this.toastr.success(res.message);
          this.navigateToList();
        }
        else {
          this.toastr.error(res.message);
        }
      })

    }else{
      this._genralServices.markFormGroupTouched(this.firstFormGroup);
    }
  }
  navigateToList() {
    this.router.navigate(['/layout/admin/clinic/clinic-list']);
  }
}
