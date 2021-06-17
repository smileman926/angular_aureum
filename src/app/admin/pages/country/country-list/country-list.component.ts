import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { WebStorage } from '../../../../core/web.storage';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { genralConfig } from '../../../../core/constant/genral-config.constant';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countryFilterForm: FormGroup;
  countryListData:any=[];
  added_by: any;
  loggedInUserDetails: any;
  loader: boolean = false;
  displayColumns = ['Country Name', 'Country Code', 'status','action'];
  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  noRecordFound: boolean = false;
  sortValue : any ='';
  sortOrder : any =1;

  constructor(private _formBuilder: FormBuilder,
    public _countryService: CountryService,
    private _webStorage: WebStorage,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.countryFilterForm = this._formBuilder.group({
      searchText: [''],
    });
    this.loggedInUserDetails = this._webStorage.get('all');
    this.listAllCountries();
  }
  activeDeactive(event,userObj){
    this.loader = true;
    let obj = {
      user_id : userObj._id,
      status : event.checked
    }
    this._countryService.activeDeactive(obj).subscribe((res:any)=>{
      this.loader = false;
      if(res && res.code==genralConfig.statusCode.ok){
        this.toastr.success(res.message);
        this.listAllCountries();
      }
      else{
        this.toastr.error(res.message);
      }
    })
  }
  listAllCountries(){
    this.added_by = this.loggedInUserDetails._id;
    let speclObject = {
      user_id: this.added_by,
      searchText: this.countryFilterForm.value.searchText ? this.countryFilterForm.value.searchText : '',
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
      sortValue :  this.sortValue ? this.sortValue : '',
      sortOrder : this.sortOrder ? this.sortOrder :1
    };
    this.loader = true;
    this._countryService.listAllCountries(speclObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.countryListData = res.data;
        this.totalCount = res.totalCount;
        if(this.totalCount==0 || this.countryListData.length==0){
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
    this.listAllCountries();
  }

  sortBy(value,order){
    this.sortValue = value;
    this.sortOrder = order;
    this.listAllCountries();
  }

  resetFormFilter(){
    this.countryFilterForm.reset();
    this.listAllCountries();
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loader = true;
        this._countryService.deleteCountry({ id: id }).subscribe((res: any) => {
          this.loader = false;
          if (res && res.code == genralConfig.statusCode.ok) {
            this.listAllCountries();
          }
          else {
            this.toastr.error(res.message);
          }
        })
      }
    });
  }
}
