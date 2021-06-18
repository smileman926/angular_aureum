import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from 'ng2-validation';
import { genralConfig } from '../../../../core/constant/genral-config.constant';

import { AdminServicesService } from '../../../services/admin-services.service';
@Component({
  selector: 'app-staff-create-update',
  templateUrl: './staff-create-update.component.html',
  styleUrls: ['./staff-create-update.component.scss'],
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
  staff_member_permission = [];
  setup_bonus_codes_permission = [];

  selectedGiveways = [];
  selectedBuyers = [];
  selectedSellers = [];
  selectedStaffMember = [];
  selectedBonusCodes = [];

  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<StaffCreateUpdateComponent>,
    private fb: FormBuilder,
    private adminservice: AdminServicesService,
    private snackbar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializePermissions();
    this.initializeForm();
  }

  get f() {
    return this.form.controls;
  }

  initializePermissions(): void {
    this.giveways_permission = [
      { item_id: 1, item_text: 'giveways_database' },
      { item_id: 2, item_text: 'setup_tracker' },
      { item_id: 3, item_text: 'rembrusement' },
    ];
    this.buyers_permission = [
      { item_id: 1, item_text: 'buyers_database' },
      { item_id: 2, item_text: 'faq_management' },
      { item_id: 3, item_text: 'testimonial_management' },
      { item_id: 4, item_text: 'deals' },
      { item_id: 5, item_text: 'instructions' },
    ];
    this.sellers_permission = [
      { item_id: 1, item_text: 'sellers_database' },
      { item_id: 2, item_text: 'subscription_management' },
      { item_id: 3, item_text: 'bank_details_management' },
    ];
    this.setup_bonus_codes_permission = [
      {
        item_id: 1,
        item_text: 'setup_bonus_codes',
      },
    ];
    this.staff_member_permission = [
      {
        item_id: 1,
        item_text: 'staff_member',
      },
    ];

    if (this.defaults) {
      this.mode = 'update';
      this.selectedGiveways = this.defaults.Permission.giveaways;
      this.selectedBuyers = this.defaults.Permission.buyers;
      this.selectedSellers = this.defaults.Permission.sellers;
      this.selectedStaffMember = this.defaults.Permission.staffMembers;
      this.selectedBonusCodes = this.defaults.Permission.bonusCodes;
    } else {
      this.defaults = {} as StaffCreateUpdateComponent;
    }
  }

  initializeForm(): void {
    let password = new FormControl('123456', [
      Validators.required,
      Validators.maxLength(genralConfig.pattern.PASSWORDMAXLENGTH),
      Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH),
    ]);
    let confirmPassword = new FormControl('123456', [
      Validators.required,
      CustomValidators.equalTo(password),
    ]);
    this.form = this.fb.group({
      email: [
        this.defaults.email || '',
        [Validators.required, Validators.email],
      ],
      password: password,
      phone_no: [this.defaults.phone_no || '', [Validators.required]],
      confirmPassword: confirmPassword,
      firstname: [
        this.defaults.firstname || '',
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      lastname: [
        this.defaults.lastname || '',
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      address: [
        this.defaults.address || '',
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.MAXLENGTH),
          Validators.minLength(genralConfig.pattern.MINLENGTH),
        ],
      ],
      city: [
        this.defaults.city || '',
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.CITY),
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      state: [this.defaults.state || ''],
      postalCode: [
        this.defaults.postalCode || '',
        [
          Validators.required,
          Validators.pattern(genralConfig.pattern.POSTAL_CODE),
        ],
      ],
      countryCode: [this.defaults.countryCode || '', [Validators.required]],
      buyers: new FormControl(''),
      giveaways: new FormControl(''),
      sellers: new FormControl(''),
      staffMembers: new FormControl(''),
      bonusCodes: new FormControl(''),
    });

    if (this.mode == 'update') {
      this.form.controls['password'].disable();
      this.form.controls['confirmPassword'].disable();
      this.form.controls['email'].disable();
      this.form.controls['phone_no'].disable();
    }
  }

  save(): void {
    if (this.mode === 'create') {
      this.createMember();
    } else if (this.mode === 'update') {
      this.updateMember();
    }
  }

  createMember(): void {
    const member = this.form.value;
    member.role = 'subAdmin';
    this.adminservice.addStaff(member).subscribe((member) => {
      if (member.code === 200) {
        this.toastr.success(member.message);
        this.dialogRef.close(member);
      } else {
        this.dialogRef.close(member);
      }
    });
  }

  updateMember(): void {
    const updateData = this.form.value;
    updateData.user_id = this.defaults._id;
    this.adminservice.updateStaff(updateData).subscribe((userUp) => {
      if (userUp.code === 200) {
        this.toastr.success(userUp.message);
        this.dialogRef.close(userUp);
      } else {
        this.toastr.error(userUp.message);
      }
    });
  }

  isCreateMode(): boolean {
    return this.mode === 'create';
  }
}
