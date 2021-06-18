import { Component, OnInit } from '@angular/core';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ToastrService } from 'ngx-toastr';
import { ExportType } from 'mat-table-exporter';
import { Subscription, timer } from 'rxjs';
import { MatCheckboxChange, MatDialog } from '@angular/material';
import * as FileSaver from 'file-saver';

import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { AdminServicesService } from '../../services/admin-services.service';
import { GenralService } from '../../../core';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { BuyersStatus } from '../../shared/models/BuyersStatus.model';
import { IRowData } from '../../shared/models/IRowData.model';
import { EditDeleteBuyerButtonRendererComponent } from './edit-delete-buyer-button-renderer.component';
import { ChangeBuyerStatusRendererComponent } from './change-buyer-status-renderer.component';
import { ChangeTierRendererComponent } from './change-tier-renderer.component';
import { TierModel } from '../../shared/models/Tier.model';

@Component({
  selector: 'app-listbuyers',
  templateUrl: './listbuyers.component.html',
  styleUrls: ['./listbuyers.component.scss'],
})
export class ListbuyersComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public defaultColDef;

  frameworkComponents: any;

  columnsData = [
    { label: 'Member No', checked: true },
    { label: 'First Name', checked: true },
    { label: 'Last Name', checked: true },
    { label: 'Actions', checked: true },
    { label: 'Email', checked: true },
    { label: 'OTP Phone', checked: true },
    { label: 'Address', checked: true },
    { label: 'apt.ste/bid', checked: true },
    { label: 'City', checked: true },
    { label: 'State', checked: true },
    { label: 'ZipCode', checked: true },
    { label: 'Country', checked: true },
    { label: 'Verify Status', checked: true },
    { label: 'Member Tier', checked: true },
    { label: 'Statuses', checked: true },
    { label: 'Rebate Orders', checked: true },
    { label: 'Order Accuracy Rate', checked: true },
    { label: 'Referrals', checked: true },
    { label: 'Update Tier', checked: true },
  ];

  public columnDefs = [];

  buyersData = [];
  buyersStatuses: BuyersStatus[] = [];
  totalCount = 0;
  count: any = genralConfig.paginator.COUNT;
  page = genralConfig.paginator.PAGE;
  noRecordFound = false;
  loader = false;

  private searchText: '';
  private searchTimer: Subscription;

  public showUpdateUserDialogue: boolean;
  public updateUserItem: any;

  sort: any;
  public isSorting = false;
  public sortColumn: string;
  public firstcol = 0;
  public secondcol = 0;
  public sortingOrder: string;

  openImportDail: boolean;
  fileArr = [];
  fileObj = [];
  arrToAppend = [];

  ExcelOptions = {
    fileName: 'buyerlist',
    sheet: 'sheet_name',
    Props: { Author: 'BrandExpand' },
    columnWidths: [25, 12, 12, 25, 12, 12, 12, 12, 12],
  };

  public canDeleteBuyer = false;
  public canChangeStatus = false;
  loggedInUserDetails: any;
  userRole: string;
  customizedColumns = false;
  exportType = ExportType.XLSX;
  sortValue: any;
  sortOrder: any;
  sortBy: any = {
    isLastAsc: 'lastnameAsc',
    isLastDsc: 'lastnameDsc',
    isMemberAsc: 'memberAsc',
    isMemberDsc: 'memberDsc',
    isTierAsc: 'tierAsc',
    isTierDsc: 'tierDsc',
    isAll: 'all',
    isDefault: 'all',
  };
  listTiers: TierModel[] = [];
  public userStatus: string;

  constructor(
    private adminServices: AdminServicesService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _general_service: GenralService
  ) {
    this.getListTiers();
    this.setBuyersStatuses();
    this.getUserDetails();
    this.frameworkComponents = {
      editDeleteBuyerButtonsRenderer: EditDeleteBuyerButtonRendererComponent,
      changeBuyerStatusRenderer: ChangeBuyerStatusRendererComponent,
      updateTierRenderer: ChangeTierRendererComponent,
    };
    this.rowData = [];
    this.listAllBuyers();
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
  }

  ngOnInit() {}

  initializeForm(): void {
    this.columnDefs = [
      {
        headerName: 'Member No',
        field: '_id',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'First Name',
        field: 'firstname',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Last Name',
        field: 'lastname',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Actions',
        cellRenderer: 'editDeleteBuyerButtonsRenderer',
        cellRendererParams: {
          onClick: this.buttonHandler.bind(this),
          label: 'Click 1',
          canDelete: this.canDeleteBuyer,
        },
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Email',
        field: 'email',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'OTP Phone',
        field: 'phone_no',
        cellRenderer: (params) => {
          let phoneNumber = '';
          if (params.value) {
            phoneNumber = `<div>
            ${params.data.countryCode}
            ${params.value}
            </div>`;
          }
          return phoneNumber;
        },
      },
      {
        headerName: 'Address',
        field: 'address_id.address',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'apt.ste/bid',
        field: 'address_id.care_of',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },

      {
        headerName: 'City',
        field: 'address_id.city',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'State',
        field: 'address_id.state',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'ZipCode',
        field: 'address_id.zipcode',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Country',
        field: 'address_id.country',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Verify Status',
        field: 'isActive',
        cellRenderer: (params) => {
          let vereficationStatus = '';
          if (params.value) {
            vereficationStatus =
              '<i class="fa fa-check" aria-hidden="true"></i>';
          } else {
            vereficationStatus =
              '<i class="fa fa-close" aria-hidden="true"></i>';
          }

          return vereficationStatus;
        },
      },
      {
        headerName: 'Member Tier',
        field: 'tier_id.name',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Rebate Orders',
        field: 'rebate_orders',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Order Accuracy Rate',
        field: 'accuracy_rate',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Referrals',
        field: 'referal',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Update Tier',
        cellRenderer: 'updateTierRenderer',
        field: 'tier_id.name',
        cellRendererParams: {
          onChange: this.updateMemberTier.bind(this),
          listTiers: this.listTiers,
          label: 'Click 2',
          canChangeStatus: this.canChangeStatus,
        },
        sortable: false,
        filter: false,
      },
      {
        headerName: 'Statuses',
        cellRenderer: 'changeBuyerStatusRenderer',
        cellRendererParams: {
          onChange: this.changeBuyerStatus.bind(this),
          label: 'Click 1',
          buyersStatuses: this.buyersStatuses,
          canChangeStatus: this.canChangeStatus,
        },
        sortable: false,
        filter: false,
      },
    ];
  }

  updateMemberTier(data: any) {
    this.adminServices
      .updateTierInUser(data.id_tier, data.rowData._id)
      .subscribe((res) => {
        if (res.status === genralConfig.statusCode.ok) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      });
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    let valueColumn;
    if (item.label === 'Member No') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Member No'
      )[0];
    }
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
    if (item.label === 'Actions') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Actions'
      )[0];
    }
    if (item.label === 'Email') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Email'
      )[0];
    }
    if (item.label === 'OTP Phone') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'OTP Phone'
      )[0];
    }
    if (item.label === 'Address') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Address'
      )[0];
    }
    if (item.label === 'apt.ste/bid') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'apt.ste/bid'
      )[0];
    }
    if (item.label === 'City') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'City'
      )[0];
    }
    if (item.label === 'State') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'State'
      )[0];
    }
    if (item.label === 'ZipCode') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'ZipCode'
      )[0];
    }
    if (item.label === 'Country') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Country'
      )[0];
    }
    if (item.label === 'Verify Status') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Verify Status'
      )[0];
    }
    if (item.label === 'Rebate Orders') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Rebate Orders'
      )[0];
    }
    if (item.label === 'Order Accuracy Rate') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Order Accuracy Rate'
      )[0];
    }
    if (item.label === 'Referrals') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Referrals'
      )[0];
    }
    if (item.label === 'Member Tier') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Member Tier'
      )[0];
    }
    if (item.label === 'Statuses') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Statuses'
      )[0];
    }

    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
  }

  getUserDetails(): void {
    console.log('can delete in list buers ====>', this.canDeleteBuyer);
    this._general_service.getUserDetails().subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loggedInUserDetails = res.data;
        console.log('login user inf ssso', this.loggedInUserDetails);

        this.userRole =
          this.loggedInUserDetails && this.loggedInUserDetails.role_id
            ? this.loggedInUserDetails.role_id.role || ''
            : '';

        if (this.userRole === 'superAdmin') {
          this.canDeleteBuyer = true;
          this.canChangeStatus = true;
        } else if (this.userRole === 'subAdmin') {
          this.canDeleteBuyer = false;
          this.canChangeStatus = false;
        } else {
          this.canDeleteBuyer = false;
          this.canChangeStatus = false;
        }
        this.initializeForm();
      }
    });
  }

  listAllBuyers() {
    this.loader = true;
    const obj = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : '',
      sort: this.sort,
      sortBy: this.sortOrder,
      status: this.userStatus
    };

    this.adminServices.listAllBuyers(obj).subscribe((res: any) => {
      this.loader = false;

      let errorMessage: string = null;
      if (res) {
        if (res.code === genralConfig.statusCode.ok) {
          //this.toastr.success(res.message);
          this.buyersData = res.data || [];
          this.totalCount = res.total || 0;
        }

        this.noRecordFound =
          res.code === genralConfig.statusCode.data_not_found ||
          this.totalCount <= 0;

        if (
          res.code !== genralConfig.statusCode.ok &&
          res.code !== genralConfig.statusCode.data_not_found
        ) {
          errorMessage = res.message || res.code + ' Error occured';
        }
      } else {
        errorMessage = 'Something went wrong!';
        this.noRecordFound = true;
      }

      if (errorMessage) {
        this.toastr.error(errorMessage);
      }

      if (this.noRecordFound) {
        this.buyersData = [];
        this.totalCount = 0;
      }
    });
  }

  setBuyersStatuses() {
    this.adminServices.getListStatusesBuyers().subscribe((res) => {
      this.buyersStatuses = res;
    });
  }

  changeBuyerStatus(data) {
    const element = data.rowData;
    const value = data.event;
    this.adminServices
      .updateStatusInBuyers(element._id, value)
      .subscribe((res) => {
        this.buyersData = this.buyersData.map((el) => {
          if (el._id === res._id) {
            return { ...el, status: res.status };
          }
          return el;
        });
        this.toastr.success('Changed status buyer');
      });
  }

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listAllBuyers();
  }

  searchUser(event) {
    this.searchText = event.target.value;

    if (this.searchTimer) {
      this.searchTimer.unsubscribe();
    }

    this.searchTimer = timer(1000).subscribe(() => {
      console.log(' searchUser  :  ', this.searchText);
      this.listAllBuyers();
    });
  }

  getsortByStatus(event) {
    this.sort = event.value;
    this.listAllBuyers();
  }

  // sortByFun(value, order) {
  //   this.sort = value;
  //   this.sortOrder = order;
  //   this.listAllBuyers();
  // }

  openImportDailog() {
    this.openImportDail = true;
  }

  closedilog() {
    this.openImportDail = false;
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    this.upload(event.dataTransfer.files);
  }

  exportArray() {
    this.adminServices.getXSLXBuyers().subscribe((result) => {
      const blob = new Blob([result], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'deals.xls');
    });
  }

  upload(e) {
    this.fileArr = [];
    console.log(e);
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item: File, i) => {
      const fileImage = item.type.split('/');
      const fileExt = fileImage[1];
      const fileType = fileImage[0];
      const size = item.size;
      // if (fileType === 'text' || fileType === 'csv' || fileType === 'application') {
      //   if ('|csv|text|vnd.openxmlformats-officedocument.spreadsheetml.sheet|'.indexOf(fileExt) === -1) {
      if (fileType === 'text' || fileType === 'csv') {
        if ('|csv|text|'.indexOf(fileExt) === -1) {
          this.toastr.error(genralConfig.CSV.CSV_FORMAT_NOT_SUPPORTED);
          return false;
        } else if (size >= 20185920) {
          // 20mb
          this.toastr.error(genralConfig.CSV.CSV_SIZE_EXCEED);
          return false;
        } else {
          this.fileArr.push({ item });
          console.log(this.fileArr, ' this.fileArr');
          return true;
        }
      } else {
        this.toastr.error(genralConfig.CSV.FILE_FORMAT_NOT_SUPPORTED);
      }
    });
  }

  async importSellers() {
    this.loader = true;
    const formData = new FormData();
    this.fileObj = [];

    if (this.fileArr) {
      await this.fileArr.forEach((item) => {
        this.fileObj.push(item.item);
      });
      this.arrToAppend.push(this.fileObj);
      console.log(this.arrToAppend, 'arrToAppend');
      await this.arrToAppend[0].forEach((item, i) => {
        formData.append('csv', item);
      });

      this.adminServices
        .importUsersIntoBuyerCollection(formData)
        .subscribe((response) => {
          if (response.code === genralConfig.statusCode.ok) {
            console.log('add product response========>', response);

            this.toastr.success(response.message);
            this.loader = false;
            this.openImportDail = false;
            this.fileArr = [];
            this.arrToAppend = [];
          } else {
            this.toastr.error(response.message);
            this.loader = false;
          }
        });
    } else {
      this.toastr.error(genralConfig.CSV.FILE_FORMAT_NOT_SUPPORTED);
    }
  }

  buttonHandler(data): void {
    const rowData = data.rowData;
    if (data.event.target.textContent === 'edit') {
      this.showUpdateUserDialog(rowData);
    } else {
      this.openDeleteDialog(rowData._id);
    }
  }

  showUpdateUserDialog(data) {
    this.updateUserItem = data;
    this.showUpdateUserDialogue = true;
  }

  hideUpdateUserDilog() {
    this.showUpdateUserDialogue = false;
    this.listAllBuyers();
  }

  openDeleteDialog(id) {
    if (id.length) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: 'Do you confirm the deletion of this buyer?',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loader = true;
          this.adminServices
            .deleteBuyerById({ _id: id })
            .subscribe((res: any) => {
              this.loader = false;
              if (res && res.code == genralConfig.statusCode.ok) {
                this.toastr.success(res.message);

                this.listAllBuyers();
              } else {
                this.toastr.error(res.message);
              }
            });
        }
      });
    }
  }

  displayDialog(): void {
    this.customizedColumns = true;
  }

  closeViewdilog(): void {
    this.customizedColumns = false;
  }

  getListTiers() {
    this.adminServices.getListTiers().subscribe((res) => {
      if (res.status === genralConfig.statusCode.ok) {
        this.listTiers = res.data;
      } else {
        this.toastr.error(res.message);
      }
    });
  }
//sort table by blacklisted user status 
  public sortByBlacklisted(e: MatCheckboxChange) {
    console.log(e)
    e.checked ? this.userStatus = 'blacklisting' : this.userStatus = '';
    this.listAllBuyers();
  }
}
