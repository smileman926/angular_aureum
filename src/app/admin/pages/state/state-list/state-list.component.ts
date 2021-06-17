import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { genralConfig } from '../../../../core/constant/genral-config.constant';
import { StateService } from '../services/state.service';
import { WebStorage } from '../../../../core/web.storage';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  stateFilterForm: FormGroup;
  stateListData:any=[];
  added_by: any;
  loggedInUserDetails: any;
  loader: boolean = false;
  displayColumns = ['State Name', 'State Code','status', 'action'];
  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  noRecordFound: boolean = false;
  sortValue : any ='';
  sortOrder : any =1;
  constructor(private _formBuilder: FormBuilder,
    public _stateService: StateService,
    private _webStorage: WebStorage,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.stateFilterForm = this._formBuilder.group({
      searchText: [''],
    });
    this.loggedInUserDetails = this._webStorage.get('all');
    this.listAllStates();
  }
  activeDeactive(event,userObj){
    this.loader = true;
    let obj = {
      user_id : userObj._id,
      status : event.checked
    }
    this._stateService.activeDeactive(obj).subscribe((res:any)=>{
      this.loader = false;
      if(res && res.code==genralConfig.statusCode.ok){
        this.toastr.success(res.message);
        this.listAllStates();
      }
      else{
        this.toastr.error(res.message);
      }
    })
  }
  listAllStates(){
    this.added_by = this.loggedInUserDetails._id;
    let speclObject = {
      user_id: this.added_by,
      searchText: this.stateFilterForm.value.searchText ? this.stateFilterForm.value.searchText : '',
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
      sortValue :  this.sortValue ? this.sortValue : '',
      sortOrder : this.sortOrder ? this.sortOrder :1
    };
    this.loader = true;
    this._stateService.listAllStates(speclObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.stateListData = res.data;
        this.totalCount = res.totalCount;
        if(this.totalCount==0 || this.stateListData.length==0){
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
    this.listAllStates();
  }

  sortBy(value,order){
    this.sortValue = value;
    this.sortOrder = order;
    this.listAllStates();
  }

  resetFormFilter(){
    this.stateFilterForm.reset();
    this.listAllStates();
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loader = true;
        this._stateService.deleteState({ id: id }).subscribe((res: any) => {
          this.loader = false;
          if (res && res.code == genralConfig.statusCode.ok) {
            this.listAllStates();
          }
          else {
            this.toastr.error(res.message);
            this.listAllStates();
          }
        })
      }
    });
  }

}
