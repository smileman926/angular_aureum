import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from 'ng2-validation';
import { genralConfig } from '../../../../core/constant/genral-config.constant';

import { AdminServicesService } from '../../../services/admin-services.service';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-staff-create-update',
  templateUrl: './staff-create-update.component.html',
  styleUrls: ['./staff-create-update.component.scss']
})
export class StaffCreateUpdateComponent implements OnInit {
  form: FormGroup;
  maxDate = new Date();
  stateJson = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
    'AS',
    'GU',
    'MP',
    'PR',
    'UM',
    'VI',
  ];
  mode: 'create' | 'update' = 'create';
  


  giveways_permission = [];
  buyers_permission = [];
  sellers_permission = [];
  selectedGiveways = [];
  selectedBuyers = [];
  selectedSellers = [];
  dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
              private dialogRef: MatDialogRef<StaffCreateUpdateComponent>,
              private fb: FormBuilder,
              private adminservice:AdminServicesService,
              private snackbar: MatSnackBar,
              private toastr: ToastrService
              ) {
  	
  }

  ngOnInit() {
  this.giveways_permission = [
      { item_id: 1, item_text: 'giveways_database'},
      { item_id: 2, item_text: 'setup_tracker' },
      { item_id: 3, item_text: 'rembrusement' }
    ];
  	 this.buyers_permission = [
      { item_id: 1, item_text: 'buyers_database'},
      { item_id: 2, item_text: 'faq_management' },
      { item_id: 3, item_text: 'testimonial_management' },
      { item_id: 4, item_text: 'deals' },
      { item_id: 5, item_text: 'instructions' }
    ];
  	 this.sellers_permission = [
      { item_id: 1, item_text: 'sellers_database'},
      { item_id: 2, item_text: 'subscription_management' },
      { item_id: 3, item_text: 'bank_details_management' }
    ];
  if (this.defaults) {
      console.log(this.defaults);
      this.mode = 'update';
      console.log(this.defaults);
       this.selectedGiveways = this.defaults.Permission.giveaways;
       this.selectedBuyers = this.defaults.Permission.buyers;
       this.selectedSellers = this.defaults.Permission.sellers;

    } else {
    	console.log(this.defaults);
        this.defaults = {} as StaffCreateUpdateComponent;

    }
    let password = new FormControl('123456', [Validators.required, Validators.maxLength(genralConfig.pattern.PASSWORDMAXLENGTH), Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH)]);
    let confirmPassword = new FormControl('123456', [Validators.required, CustomValidators.equalTo(password)])
    this.form = this.fb.group({
      email: [this.defaults.email || '', [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)]],
      password: password,
      phone_no:[this.defaults.phone_no || '', [Validators.required, Validators.pattern(genralConfig.pattern.PHONE_NO)]],
      confirmPassword: confirmPassword,
      firstname: [this.defaults.firstname || '', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      lastname: [this.defaults.lastname || '', [Validators.required, Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      address: [this.defaults.address || '', [Validators.required, Validators.maxLength(genralConfig.pattern.MAXLENGTH), Validators.minLength(genralConfig.pattern.MINLENGTH)]],
      city: [this.defaults.city || '', [Validators.required, Validators.pattern(genralConfig.pattern.CITY), Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      state: [this.defaults.state || ''],
      postalCode: [this.defaults.postalCode || '', [Validators.required, Validators.pattern(genralConfig.pattern.POSTAL_CODE)]],
      countryCode: [this.defaults.countryCode || '', [Validators.required]],
      buyers: new FormControl('', Validators.required),
      giveaways: new FormControl('', Validators.required),
      sellers: new FormControl('', Validators.required),
    });

    if(this.mode == 'update')
    {
      this.form.controls['password'].disable();
      this.form.controls['confirmPassword'].disable();
      this.form.controls['email'].disable();
      this.form.controls['phone_no'].disable();
    }
  }
  

  get f() { return this.form.controls; }

 onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }




  save() {
    if (this.mode === 'create') {
      this.createMember();
    } else if (this.mode === 'update') {
      this.updateMember();
    }
  }




  createMember() {
    const member = this.form.value;
    member.role = "subAdmin"
    console.log(member);
    this.adminservice.addStaff(member).subscribe(member => {
      if(member['sucess']){
         this.toastr.success(member.message);
        this.dialogRef.close(member);
      }
      else
      {
         this.toastr.success(member.message);
      }
    });
    this.dialogRef.close(member);
  }


  updateMember() {
    const member = this.form.value;
    member.user_id = this.defaults._id
    this.adminservice.updateStaff(member).subscribe(userUp => {
      console.log(userUp);
      if(userUp){
        this.toastr.success(userUp.message);
        this.dialogRef.close(userUp);
      }
      else
      {
         this.toastr.success(userUp.message);
      }
    });
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

}
