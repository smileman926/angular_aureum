import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GridOptions } from '@ag-grid-community/all-modules';
import { GridApi } from 'ag-grid/main';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import * as FileSaver from 'file-saver';

import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { StaffCreateUpdateComponent } from './staff-create-update/staff-create-update.component';
import { IRowData } from '../../shared/models/IRowData.model';
import { StaffActionButtonsRendererComponent } from './staff-action-buttons-renderer.component';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { AdminServicesService } from '../../services/admin-services.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public columnDefs: any[];
  public defaultColDef;
  public gridApi: GridApi;
  frameworkComponents: any;

  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  FAQId: any;
  statusdelete: boolean = false;
  pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  sortValue: any = '';
  sortOrder: any = -1;
  loader: boolean = false;
  staffListData: any = [];
  noRecordFound: boolean = false;
  StaffFilterForm: FormGroup;

  columnsData = [
    { label: 'First Name', checked: true },
    { label: 'Last Name', checked: true },
    { label: 'Email', checked: true },
    { label: 'Actions', checked: true },
  ];
  customizedColumns: boolean;

  displayDialogue: boolean = false;
  sort;
  header_value: any;
  checkedArr = [];

  constructor(
    public adminService: AdminServicesService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.StaffFilterForm = this._formBuilder.group({
      searchText: [''],
    });
    this.frameworkComponents = {
      buttonRenderer: StaffActionButtonsRendererComponent,
    };
    this.initializeForm();
    this.listStaff();
  }

  initializeForm(): void {
    this.defaultColDef = {
      filter: true,
      sortable: true,
      resizable: true,
    };
    this.gridOptions = {
      unSortIcon: true,
      rowSelection: 'single',
      context: {},
    };

    this.columnDefs = [
      {
        headerName: 'First Name',
        field: 'firstname',

        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Last Name',
        field: 'lastname',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Email',
        field: 'email',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Actions',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.actionButtonHandler.bind(this),
          label: 'Click 1',
        },
        suppressSizeToFit: false,
        sortable: false,
        filter: false,
      },
    ];
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    let valueColumn;
    if (item.label === 'First Name') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'First Name'
      )[0];
    }
    if (item.label === 'Last Name') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Last Name'
      )[0];
    }
    if (item.label === 'Email') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Email'
      )[0];
    }
    if (item.label === 'Actions') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Actions'
      )[0];
    }
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
  }

  actionButtonHandler(data): void {
    const rowData = data.rowData;
    if (data.event.target.textContent === 'edit') {
      this.updateMember(rowData);
    } else if (data.event.target.textContent === 'delete') {
      this.openDialog(rowData._id);
    } else {
      this.updateMember(rowData);
    }
  }

  listStaff(): void {
    let speclObject = {
      sort: this.sort ? this.sort : '',
      searchText: this.StaffFilterForm.value.searchText
        ? this.StaffFilterForm.value.searchText
        : '',
      count: this.count ? this.count : '',
      page: this.page ? this.page : '',
      sortValue: this.sortValue ? this.sortValue : '',
      sortOrder: this.sortOrder ? this.sortOrder : 1,
    };
    this.loader = true;
    this.adminService.listAllStaff(speclObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.staffListData = res.data;
        this.totalCount = res.total;
        this.noRecordFound = false;
        if (this.staffListData.length == 0) {
          this.noRecordFound = true;
        }
      } else if (res && res.code == genralConfig.statusCode.data_not_found) {
        this.staffListData = [];
        if (this.staffListData.length == 0) {
          this.noRecordFound = true;
        }
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  checkUncheck(val): void {
    const index = this.checkedArr.indexOf(val);
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
  }

  paginate(event): void {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listStaff();
  }

  sortBy(value, order): void {
    this.sortValue = value;
    this.sortOrder = order;
    this.listStaff();
  }

  openDialog(id): void {
    if (id.length) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: 'Do you confirm the deletion of this data?',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loader = true;
          this.adminService
            .deleteStaff({ user_id: id })
            .subscribe((res: any) => {
              this.loader = false;
              if (res && res.code == genralConfig.statusCode.ok) {
                this.toastr.success(res.message);

                this.listStaff();
              } else {
                this.toastr.error(res.message);
              }
            });
        }
      });
    }
  }

  addMember(): void {
    this.dialog
      .open(StaffCreateUpdateComponent, {})
      .afterClosed()
      .subscribe((updatedUserData) => {
        if (updatedUserData) {
          this.listStaff();
        }
      });
  }

  updateMember(updatedData: any): void {
    this.dialog
      .open(StaffCreateUpdateComponent, {
        data: updatedData,
      })
      .afterClosed()
      .subscribe((updatedUserData) => {
        if (updatedUserData) {
          this.listStaff();
        }
      });
  }

  displayDialog(): void {
    this.customizedColumns = true;
  }

  closeViewdilog(): void {
    this.customizedColumns = false;
  }

  exportArray(): void {
    this.adminService.getXSLXStaff().subscribe((result) => {
      const blob = new Blob([result], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'staff.xls');
    });
  }
}
