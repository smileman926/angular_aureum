import { Component, OnInit, ViewChildren } from '@angular/core';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { AdminServicesService } from '../../services/admin-services.service';
import { ToastrService } from 'ngx-toastr';
import { ExportType, ExcelOptions } from 'mat-table-exporter';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import {StaffCreateUpdateComponent} from './staff-create-update/staff-create-update.component';



@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent implements OnInit {

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
	  staffListData: any = [];;
	  noRecordFound: boolean = false;
	  StaffFilterForm: FormGroup;
	  displayColumns = ['checkbox', 'firstname', 'lastname', 'email', 'phone_no', 'action'];
	  displayDialogue: boolean = false;
	  sort;
	  header_value: any;
	  sortList = ['firstname', 'lastname','email', 'phone_no']
	  checkedArr = []

  constructor(
  	public adminService: AdminServicesService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
  	this.StaffFilterForm = this._formBuilder.group({
      searchText: [''],
    });
    this.listStaff();
  }

  listStaff() {
    let speclObject = {
      sort: this.sort ? this.sort : '',
      searchText: this.StaffFilterForm.value.searchText ? this.StaffFilterForm.value.searchText : '',
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
      sortValue: this.sortValue ? this.sortValue : '',
      sortOrder: this.sortOrder ? this.sortOrder : 1
    };
    this.loader = true;
    this.adminService.listAllStaff(speclObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.staffListData = res.data;
        console.log("this.faqlistgdggdgd", this.staffListData)
        this.totalCount = res.total;
        this.noRecordFound = false;
        if (this.staffListData.length == 0) {
          this.noRecordFound = true;
        }
      }
      else if (res && res.code == genralConfig.statusCode.data_not_found) {
        console.log("hereeeeeeee in else")
        this.staffListData = [];
        if (this.staffListData.length == 0) {
          this.noRecordFound = true;
        }
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }


  searchMember(event) {
    console.log(" searchMember  :  ", event.target.value)
    this.StaffFilterForm.get('searchText').setValue(event.target.value);
    this.listStaff();
  }

  getsortBy(event) {
    console.log("Sort ", this.sort)
    this.listStaff();
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


  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listStaff();
  }
  sortBy(value, order) {
    this.sortValue = value;
    this.sortOrder = order;
    this.listStaff();
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
          this.adminService.deleteStaff({ user_id: id }).subscribe((res: any) => {
            this.loader = false;
            if (res && res.code == genralConfig.statusCode.ok) {
              this.toastr.success(res.message);

              this.listStaff();

            }
            else {
              this.toastr.error(res.message);
            }
          })
        }
      });
    }

  }

  addMember() {
    console.log('Add member clicked!')
    this.dialog.open(StaffCreateUpdateComponent, {
    }).afterClosed().subscribe(updatedUserData => {
      if (updatedUserData) {
        this.listStaff();
      }
    });
   }

   updateMember(updateDtata:any) {
    this.dialog.open(StaffCreateUpdateComponent, {
      data: updateDtata
    }).afterClosed().subscribe(updatedUserData => {
      if (updatedUserData) {
        this.listStaff();
      }
    });
  }


}
