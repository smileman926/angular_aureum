import { Component, OnInit } from '@angular/core';
import { GridOptions } from '@ag-grid-community/all-modules';
import { GridApi } from 'ag-grid/main';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { ExportType, ExcelOptions } from 'mat-table-exporter';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { ApiService } from 'src/app/shared/services/api.service';
import { AdminServicesService } from '../../services/admin-services.service';
import { IRowData } from '../../shared/models/IRowData.model';
import { EditSellerButtonRendererComponent } from './edit-seller-button-renderer.component';
import { RequestObjectInterface } from '../../shared/models/RequestObject.model';
@Component({
  selector: 'app-listsellers',
  templateUrl: './listsellers.component.html',
  styleUrls: ['./listsellers.component.scss'],
})
export class ListsellersComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public columnDefs: any[];
  public defaultColDef;
  public gridApi: GridApi;
  frameworkComponents: any;
  customizedColumns: boolean;

  displayedColumns = [
    'firstname',
    'lastname',
    'email',
    'publicName',
    'subscriptionlevel',
    'monthlysubscriptionpayment',
    'actions',
  ];

  columnsData = [
    { label: 'First Name', checked: true },
    { label: 'Last Name', checked: true },
    { label: 'Email', checked: true },
    { label: 'Public Name', checked: true },
    { label: 'Subscription Level', checked: true },
    { label: 'Monthly Subscription Payment', checked: true },
    { label: 'Actions', checked: true },
  ];

  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  sortOrder: any;
  page = genralConfig.paginator.PAGE;
  searchText: '';
  sellersData = [];
  noRecordFound: Boolean = false;
  sort;
  loader: boolean = false;

  /*name of the excel-file which will be downloaded. */
  fileName = 'ExcelSheet.xlsx';

  ExcelOptions = {
    fileName: 'sellerlist',
    sheet: 'sheet_name',
    Props: { Author: 'BrandExpand' },
    columnWidths: [12, 12, 25, 12, 45, 12],
  };

  exportType = ExportType.XLSX;

  sortBy: any = {
    isLastAsc: 'lastnameAsc',
    isLastDsc: 'lastnameDsc',
    isAll: 'all',
    isDefault: 'all',
  };

  openImportDail: boolean;
  fileArr = [];
  fileObj = [];
  arrToAppend = [];
  public showUpdateSellerDialogue: boolean;
  public updateSellerItem: any;

  constructor(
    public _adminServices: AdminServicesService,
    private toastr: ToastrService
  ) {
    this.frameworkComponents = {
      buttonRenderer: EditSellerButtonRendererComponent,
    };
    this.initializeForm();
    this.rowData = [];
    this.listAllSellers();

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
        headerName: 'Public Name',
        field: 'publicName',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Subscription Level',
        field: 'subscription_details_id.plan_id.subscription_name',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Monthly Subscription Payment',
        field: 'subscription_details_id.plan_id.subscription_price.per_month',
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
          onClick: this.showUpdateSellerDialog.bind(this),
          label: 'Click 1',
        },
        suppressSizeToFit: false,
      },
    ];
  }

  listAllSellers(): void {
    this.loader = true;
    let sellerRequestObject: RequestObjectInterface = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : '',
      sort: this.sort ? this.sort : null,
      sortBy: this.sortOrder ? this.sortOrder : null,
    };

    this._adminServices
      .listAllSellers(sellerRequestObject)
      .subscribe((res: any) => {
        this.loader = false;
        if (res && res.status == genralConfig.statusCode.ok) {
          this.sellersData = res.data;
          this.totalCount = res.total;
          if (this.sellersData.length == 0) {
            this.sellersData = [];
            this.noRecordFound = true;
          }
        } else if (res && res.status == genralConfig.statusCode.data_not_found) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      });
  }

  showUpdateSellerDialog(data) {
    console.log('shooooowing dialoooooooooog!');
    console.log(data);
    this.updateSellerItem = data.rowData;
    this.showUpdateSellerDialogue = true;
  }

  hideUpdateSellerDilog() {
    this.showUpdateSellerDialogue = false;
    this.listAllSellers();
  }

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    console.log('Pagination : page , count : ', this.page, this.count);
    this.listAllSellers();
  }

  searchUser(event) {
    console.log(' searchUser  :  ', event.target.value);
    this.searchText = event.target.value;
    this.page = 1;
    this.listAllSellers();
  }

  getsortByStatus(event) {
    console.log('sort status is=====>', event.value);
    this.sort = event.value;
    this.listAllSellers();
  }

  sortByFun(value, order) {
    this.sort = value;
    this.sortOrder = order;
    this.listAllSellers();
  }

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
    this._adminServices.getXSLXSellers().subscribe((result) => {
      const blob = new Blob([result], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'sellers.xls');
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
      console.log(fileExt, fileType, size, 'dssssssssssssssssssssssssssssss');
      // if (fileType === 'text' || fileType === 'csv' || fileType === 'application') {
      //   if ('|csv|text|vnd.openxmlformats-officedocument.spreadsheetml.sheet|'.indexOf(fileExt) === -1) {
      if (fileType === 'text' || fileType === 'csv') {
        if ('|csv|text|'.indexOf(fileExt) === -1) {
          this.toastr.error(genralConfig.CSV.CSV_FORMAT_NOT_SUPPORTED);
          return false;
        } else if (size >= 20185920) {
          //20mb
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

      this._adminServices
        .importUsersIntoSellerCollection(formData)
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

  displayDialog(): void {
    this.customizedColumns = true;
  }

  closeViewdilog(): void {
    this.customizedColumns = false;
  }
}
