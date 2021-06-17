import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WebStorage } from '../../../../core/web.storage';
import { PageEvent, MatDatepickerInputEvent, MatDialog } from '@angular/material';
import { ClinicServiceService } from '../services/clinic-service.service';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { genralConfig } from '../../../../core/constant/genral-config.constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.scss']
})
export class ClinicListComponent implements OnInit {
  clinicFilterForm: FormGroup;
  loggedInUserDetails: any;
  added_by: any;
  loader: boolean = false;
  clinicListData: any = [];
  displayColumns = ['Clinic Name', 'Registration No.', 'Phone No.', 'Address','status', 'action'];
  clinicDateFilterForm: FormGroup;
  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  pageEvent: PageEvent;
  dateFilterSelectedValue: any;
  noRecordFound: boolean = false;
  sortValue : any ='';
  sortOrder : any =1;

  constructor(
    private _formBuilder: FormBuilder,
    public _clinicService: ClinicServiceService,
    private _webStorage: WebStorage,
    public dialog: MatDialog,
    private toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.clinicFilterForm = this._formBuilder.group({
      searchText: [''],
      dateSort: ['']
    });
    // this.clinicDateFilterForm = this._formBuilder.group({
    //   dateSort: ['']
    // });
    this.loggedInUserDetails = this._webStorage.get('all');
    this.clinicList();
  }
  activeDeactive(event,userObj){
    this.loader = true;
    let obj = {
      user_id : userObj._id,
      status : event.checked
    }
    this._clinicService.activeDeactive(obj).subscribe((res:any)=>{
      this.loader = false;
      if(res && res.code==genralConfig.statusCode.ok){
        this.toastr.success(res.message);
        this.clinicList();
      }
      else{
        this.toastr.error(res.message);
      }
    })
  }
  resetFormFilter(){
    this.clinicFilterForm.reset();
    this.clinicList();
  }

  clinicList() {
    this.added_by = this.loggedInUserDetails._id;
    let speclObject = {
      user_id: this.added_by,
      searchText: this.clinicFilterForm.value.searchText ? this.clinicFilterForm.value.searchText : '',
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
      dateFilterValue: this.clinicFilterForm.value.dateSort ? this.clinicFilterForm.value.dateSort : '',
      sortValue :  this.sortValue ? this.sortValue : '',
      sortOrder : this.sortOrder ? this.sortOrder :1
    };
    this.loader = true;
    this._clinicService.clinicList(speclObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.clinicListData = res.data;

        this.totalCount = res.totalCount;
        if(this.totalCount==0 || this.clinicListData.length==0){
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
    this.clinicList();
  }
  dateFilter(event: MatDatepickerInputEvent<Date>) {
    this.dateFilterSelectedValue = event.value;
    // this.clinicList(this.dateFilterSelectedValue);
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loader = true;
        this._clinicService.deleteClinic({ id: id }).subscribe((res: any) => {
          this.loader = false;
          if (res && res.code == genralConfig.statusCode.ok) {
            this.clinicList();
          }
          else {
            this.toastr.error(res.message);
          }
        })
      }
    });
  }

  sortBy(value,order){
    this.sortValue = value;
    this.sortOrder = order;
    this.clinicList();
  }

}
