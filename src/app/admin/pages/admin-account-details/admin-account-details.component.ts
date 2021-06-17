import { Component, OnInit } from '@angular/core';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-admin-account-details',
  templateUrl: './admin-account-details.component.html',
  styleUrls: ['./admin-account-details.component.scss']
})
export class AdminAccountDetailsComponent implements OnInit {
  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  FAQId: any;
  statusdelete: boolean = false
  pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  sortValue: any = '';
  sortOrder: any = -1;
  loader: boolean = false;
  bankListData: any = [];;
  noRecordFound: boolean = false;
  bankDetailsForm: FormGroup;
  displayDialogue: boolean= false;
  id: any;
 
  displayColumns = ['Bank Name', 'Bank Account Holder', 'Bank Account Number', 'Routing', 'Swift/BIC', 'Action'];
  constructor(
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.bankDetailsForm = this._formBuilder.group({
      
      bankName: ['', [Validators.required,]],
    bank_acc_holder: ['', [Validators.required,]],
    bank_acc_no: ['', [Validators.required,]],
    routing: ['', [Validators.required,]],
    swift: ['', [Validators.required,]],
    });
    this.getBankInfoList()
    
  }

  getBankInfoList() {
    let speclObject = {
     
     
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
     
    };
    this.loader = true;
    this.apiService.getBankInfoList(speclObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.bankListData = res.data;
        console.log("this.faqlistgdggdgd", this.bankListData)
        this.totalCount = res.total;
        this.noRecordFound = false;
        if (this.bankListData.length == 0) {
          this.noRecordFound = true;
        }

      }
      else if (res && res.code == genralConfig.statusCode.data_not_found) {
        console.log("hereeeeeeee in else")
        this.bankListData = [];
        if (this.bankListData.length == 0) {
          this.noRecordFound = true;
        }
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
 
  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    console.log("Padination : page , count : ", this.page, this.count)
    this.getBankInfoList();
  }
  
  updateBankDetails(){
    let data = {
      bankName: this.bankDetailsForm.value.bankName,
      bank_acc_holder: this.bankDetailsForm.value.bank_acc_holder,
      bank_acc_no: this.bankDetailsForm.value.bank_acc_no,
      routing: this.bankDetailsForm.value.routing,
      swift: this.bankDetailsForm.value.swift,
     _id: this.id

    };
    this.loader = true;
    this.apiService.updateBankInfo(data).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.toastr.success(res.message);

        this.displayDialogue = false
     this.getBankInfoList()
   

      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
  displayDialog(data){
    this.id= data._id
    this.bankDetailsForm.patchValue({
      bankName: data.bankName,
      bank_acc_holder: data.bank_acc_holder,
      bank_acc_no: data.bank_acc_no,
      routing: data.routing,
      swift: data.swift,
    })
    this.displayDialogue= true
  }
  closedilog(){
    this.displayDialogue= false

  }
}
