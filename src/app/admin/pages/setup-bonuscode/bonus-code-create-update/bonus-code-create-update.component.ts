import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { map, startWith } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomValidators } from "ng2-validation";
import { AdminServicesService } from "src/app/admin/services/admin-services.service";
import { genralConfig } from "../../../../core/constant/genral-config.constant";

@Component({
  selector: "app-bonus-code-create-update",
  templateUrl: "./bonus-code-create-update.component.html",
  styleUrls: ["./bonus-code-create-update.component.scss"],
})
export class BonusCodeCreateUpdateComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<BonusCodeCreateUpdateComponent>,
    private fb: FormBuilder,
    private adminservice: AdminServicesService,
    private snackbar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.defaults = {} as BonusCodeCreateUpdateComponent;
    this.form = this.fb.group({
      bonusCode: [
        this.defaults.bonusCode || "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],

      discount_off: [
        this.defaults.discount_off || "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
    });
  }

  get f() {
    return this.form.controls;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  save() {
    this.createBonuSode();
  }

  createBonuSode() {
    const bonusCode = this.form.value;
    this.adminservice.addBonusCode(bonusCode).subscribe((res) => {
      if (res["sucess"]) {
        this.toastr.success(res.message);
        this.dialogRef.close(res);
      } else {
        this.toastr.success(res.message);
      }
    });
    this.dialogRef.close(bonusCode);
  }
}
