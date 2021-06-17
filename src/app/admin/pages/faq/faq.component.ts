import { Component, OnInit, ViewChildren } from '@angular/core';
import { FaqService } from './services/faq.service';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes;
  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  FAQId: any;
  statusdelete: boolean = false
  pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  sortValue: any = '';
  sortOrder: any = -1;
  loader: boolean = false;
  faqListData: any = [];;
  noRecordFound: boolean = false;
  faqFilterForm: FormGroup;
  ansFAQForm: FormGroup;
  displayColumns = ['checkbox', 'Questions', 'Approved', 'action'];
  displayDialogue: boolean = false;
  viewFAQ: boolean = false;
  sort;
  header_value: any;
  sortList = ['Approved', 'Not-Approved']
  checkedArr = []

  constructor(
    public _faqService: FaqService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,


  ) { }

  ngOnInit() {
    this.faqFilterForm = this._formBuilder.group({
      searchText: [''],
    });
    this.ansFAQForm = this._formBuilder.group({

      question: ['', [Validators.required,]],
      answer: new FormControl('', [Validators.required,])
    })
    this.listFaqs()
  }
  // columnDefs = [
  //   {
  //     headerName: "Questions",
  //     field: 'question',
  //     cellRenderer: function (params) {
  //       var contact_name
  //       return contact_name = params.value ? params.value : 'N/A'
  //     },
  //     sortable: true,
  //     filter: true,
  //   },
  //   {
  //     headerName: "Approved",
  //     field: 'isApproved',
  //     cellRenderer: function (params) {
  //       var approved
  //       return approved = params.value ? `<i  class="fa fa-check" aria-hidden="true"></i>`
  //        : `<i  class="fa fa-close" aria-hidden="true"></i>`
  //     },
  //     sortable: true,
  //     filter: true,
  //   },
  //   // {
  //   //   headerName: "Approve Launch Product",

  //   //   // field: 'launch_isApproved',
  //   //   cellRenderer: 'buttonRenderer',
  //   //   cellRendererParams: {
  //   //     onClick: this.approveProductLaunch.bind(this),
  //   //     label: 'Click 1'
  //   //   },
  //   //   // cellRenderer: function (params) {
  //   //   //   var approve
  //   //   //   // return approve = params.value ? `<i (click)="approveProductLaunch($event)" class="fa fa-check" aria-hidden="true"></i>`
  //   //   //   //  : `<i class="fa fa-close" (click)="approveProductLaunch($event)" aria-hidden="true"></i>`
  //   //   // },
  //   //   sortable: true, filter: true
  //   // },

  // ];
  listFaqs() {
    let speclObject = {
      sort: this.sort ? this.sort : '',
      searchText: this.faqFilterForm.value.searchText ? this.faqFilterForm.value.searchText : '',
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
      sortValue: this.sortValue ? this.sortValue : '',
      sortOrder: this.sortOrder ? this.sortOrder : 1
    };
    this.loader = true;
    this._faqService.listAllFaqs(speclObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.faqListData = res.data;
        console.log("this.faqlistgdggdgd", this.faqListData)
        this.totalCount = res.total;
        this.noRecordFound = false;
        if (this.faqListData.length == 0) {
          this.noRecordFound = true;
        }
        // console.log("count", res.total)
        // if (this.totalCount == 0 || this.faqListData.length == 0) {
        //   this.noRecordFound = true;

        // }
      }
      else if (res && res.code == genralConfig.statusCode.data_not_found) {
        console.log("hereeeeeeee in else")
        this.faqListData = [];
        if (this.faqListData.length == 0) {
          this.noRecordFound = true;
        }
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
  openDialog(id) {
    console.log('openDialog', id)

    if (id.length) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: "Do you confirm the deletion of this data?"
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loader = true;
          this._faqService.deleteFaq({ id: id }).subscribe((res: any) => {
            this.loader = false;
            if (res && res.code == genralConfig.statusCode.ok) {
              this.toastr.success(res.message);

              this.listFaqs();

            }
            else {
              this.toastr.error(res.message);
            }
          })
        }
      });
    }

  }
  displayDialog(value, data) {
    if (value == 'Add') {
      this.ansFAQForm.reset()
      this.header_value = 'Add'
      this.displayDialogue = true

    } else {
      console.log("data", data)
      this.header_value = 'Update'
      this.FAQId = data._id
      this.displayDialogue = true
      this.ansFAQForm.patchValue({
        question: data.question ? data.question : '',
        answer: data.answer ? data.answer : '',


      })
    }


  }
  closedilog() {
    this.displayDialogue = false
    this.ansFAQForm.reset()
  }
  viewFaq(item) {
    this.viewFAQ = true
    this.ansFAQForm.patchValue({
      question: item.question ? item.question : '',
      answer: item.answer ? item.answer : '',

    })
  }
  closeViewdilog() {
    this.viewFAQ = false
    this.ansFAQForm.reset()
  }
  SubmitAns() {
    this.loader = true;

    let data = {
      _id: this.FAQId,
      Data: this.ansFAQForm.value
    }
    this._faqService.answerFaq(data).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        // this.listFaqs();
        this.displayDialogue = false;
        this.toastr.success(res.message);
        this.listFaqs();

      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
  updateStatus(id) {
    this.loader = true;
    this._faqService.updateFaqStatus({ _id: id }).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.listFaqs();
        this.toastr.success(res.message);

      }
      else {
        this.toastr.error(res.message);
      }
    })
  }

  searchQuestions(event) {
    console.log(" searchQuestions  :  ", event.target.value)
    this.faqFilterForm.get('searchText').setValue(event.target.value);
    // this.searchText = event.target.value;
    // this.page = 0;
    this.listFaqs();
  }

  getsortByStatus(event) {
    console.log("getsortByStatus", event)
    console.log("Sort ", this.sort)
    // console.log(" getsortByStatus  :  ",event.target.value)
    // this.searchText = event.target.value;
    // this.page = 0;
    this.listFaqs();
  }

  resetFormFilter() {
    this.faqFilterForm.reset();
    this.listFaqs();
  }
  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listFaqs();
  }
  sortBy(value, order) {
    this.sortValue = value;
    this.sortOrder = order;
    this.listFaqs();
  }
  AddFAQ() {
    this.loader = true;
    this._faqService.addFAQ(this.ansFAQForm.value).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.listFaqs();
        this.toastr.success(res.message);
        this.displayDialogue = false
      }
      else {
        this.listFaqs();
        this.toastr.error(res.message);
      }
    })
  }

  checkUncheck(val) {
    // console.log('(click)=checkUncheck(bid)', checkUncheckData)
    const index = this.checkedArr.indexOf(val);
    console.log('index index', index);
    if (index === -1) {
      // val not found, pushing onto array
      this.checkedArr.push(val);
    } else {
      // val is found, removing from array
      this.checkedArr.splice(index, 1);
    }
    if (this.checkedArr.length) {
      this.statusdelete = true;
    } else {
      this.statusdelete = false;
    }
    console.log('%%%%%%%%%%%%%%%%%%%', this.checkedArr);
  }
}
