import { Component, OnInit } from '@angular/core';
import { GenralService } from '../../../../core';
import { WebStorage } from '../../../../core/web.storage';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { genralConfig } from '../../../../core/constant/genral-config.constant';
import { ClinicServiceService } from '../services/clinic-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-clinic-edit',
  templateUrl: './clinic-edit.component.html',
  styleUrls: ['./clinic-edit.component.scss']
})
export class ClinicEditComponent implements OnInit {
  isLinear = false;
  public loggedInUserDetails: any;
  firstFormGroup: FormGroup;
  loader: boolean = false;
  userId: any;
  clinicDetails: any;

  constructor(
    public _genralServices: GenralService,
    private _webStorage: WebStorage,
    private _formBuilder: FormBuilder,
    public _clinicService: ClinicServiceService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.loggedInUserDetails = this._webStorage.get('all');
    this.userId = this.activatedRoute.snapshot.paramMap.get("id");

    this.firstFormGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      registration_no: ['', [Validators.required]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern(genralConfig.pattern.MOB_NO),Validators.maxLength(genralConfig.pattern.MOBILEMAX),Validators.minLength(genralConfig.pattern.MOBILEMIN)]],
    });
    this.getClinic();
  }
  goBack() {
    this._genralServices.goBack();
  }
  navigateToList() {
    this.router.navigate(['/layout/admin/clinic/clinic-list']);
  }
  editClinic() {
    if(this.firstFormGroup.valid){
      this.loader = true;
      let dataObj = {
        user_id: this.userId ? this.userId : '',
        name: this.firstFormGroup.value.name ? this.firstFormGroup.value.name : '',
        registration_no: this.firstFormGroup.value.registration_no ? this.firstFormGroup.value.registration_no : '',
        address: this.firstFormGroup.value.address ? this.firstFormGroup.value.address : '',
        contact: this.firstFormGroup.value.contact ? this.firstFormGroup.value.contact : '',
      }
  
      this._clinicService.editClinic(dataObj).subscribe((res: any) => {
        this.loader = false;
        if (res && res.code == genralConfig.statusCode.ok) {
          this.toastr.success(res.message);
          this.router.navigate(['/layout/admin/clinic/clinic-list'])
        }
        else {
          this.toastr.error(res.message);
        }
      })

    }else{
      this._genralServices.markFormGroupTouched(this.firstFormGroup);
    }
  }
  getClinic() {
    this.loader = true;
    let objToFind = {
      user_id: this.userId ? this.userId : "",
    }
    this._clinicService.getClinicDetails(objToFind).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.clinicDetails = res.data;
        this.firstFormGroup.patchValue({
          name: this.clinicDetails.name ? this.clinicDetails.name : '',
          registration_no: this.clinicDetails.registration_no ? this.clinicDetails.registration_no : '',

          address: this.clinicDetails.address ? this.clinicDetails.address : '',
          contact: this.clinicDetails.contact ? this.clinicDetails.contact : '',

        })
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }

}
