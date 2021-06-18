import { Component, OnInit } from "@angular/core";
import { GridOptions } from "@ag-grid-community/all-modules";
import { ToastrService } from "ngx-toastr";
import { AdminServicesService } from "../../services/admin-services.service";
import { IRowData } from "../../shared/models/IRowData.model";

import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { ApiService } from "src/app/shared/services/api.service";
import * as XLSX from "xlsx";
import { ExportType, ExcelOptions } from "mat-table-exporter";
import * as moment from "moment";
import { InstructionActionsButtonsRendrerComponent } from "../list-instructions/instructions-actions-buttons-renderer.component";

@Component({
  selector: "app-referals",
  templateUrl: "./referals.component.html",
  styleUrls: ["./referals.component.scss"],
})
export class ReferalsComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public columnDefs: any[];
  public defaultColDef;

  columnsData = [
    { label: "Referer No", checked: true },
    { label: "Referer First Name", checked: true },
    { label: "Referer Last Name", checked: true },
    { label: "Referer Email", checked: true },
    { label: "Referal No", checked: true },
    { label: "Referal First Name", checked: true },
    { label: "Referal Last Name", checked: true },
    { label: "Referal Email", checked: true },
    { label: "Joined", checked: true },
  ];

  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  sortOrder: any;
  page = genralConfig.paginator.PAGE;
  searchText: "";
  referalsData = [];
  noRecordFound: Boolean = false;
  sort;
  loader: boolean = false;
  /*name of the excel-file which will be downloaded. */
  // fileName = 'ExcelSheet.xlsx';

  // ExcelOptions = { fileName: 'sellerlist', sheet: 'sheet_name', Props: { Author: 'BrandExpand' }, columnWidths: [12, 12, 25, 12] };

  // exportType = ExportType.XLSX;

  sortBy: any = {
    isLastAsc: "lastnameAsc",
    isLastDsc: "lastnameDsc",
    isAll: "all",
    isDefault: "all",
  };
  openImportDail: boolean;
  fileArr = [];
  fileObj = [];
  arrToAppend = [];
  customizedColumns: boolean = false;
  public frameworkComponents: any;

  constructor(
    public _adminServices: AdminServicesService,
    private toastr: ToastrService
  ) {
    this.initializeForm();
    this.rowData = [];
    this.listAllReferals();

    this.defaultColDef = {
      filter: true,
      sortable: true,
      resizable: true,
    };
    this.gridOptions = {
      unSortIcon: true,
      rowSelection: "single",
      context: {},
    };
    this.frameworkComponents = {
      instructionsActionsButtonsRenderer: InstructionActionsButtonsRendrerComponent,
    };
  }

  ngOnInit() {}

  initializeForm(): void {
    this.columnDefs = [
      {
        headerName: "Referer No",
        field: "refererUserId._id",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Referer First Name",
        field: "refererUserId.firstname",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Referer Last Name",
        field: "refererUserId.lastname",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Referer Email",
        field: "refererUserId.email",

        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Referal No",
        field: "referalUserId._id",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Referal First Name",
        field: "referalUserId.firstname",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Referal Last Name",
        field: "referalUserId.lastname",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Referal Email",
        field: "referalUserId.email",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Joined",
        field: "referalUserId.createdAt",
        cellRenderer: (params) => {
          var launchData;
          return (launchData = params.value
            ? moment(params.value).format("LL")
            : "N/A");
        },
      },
    ];
  }

  listAllReferals() {
    this.loader = true;
    let obj = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : "",
      sort: this.sort,
      sortBy: this.sortOrder,
    };

    console.log("Object : ", obj);
    this._adminServices.listAllReferals(obj).subscribe((res: any) => {
      this.loader = false;
      if (res && res.status == genralConfig.statusCode.ok) {
        this.referalsData = res.data;
        this.totalCount = res.total;
        if (this.referalsData.length == 0) {
          this.referalsData = [];
          this.noRecordFound = true;
        }
      } else if (res && res.status == genralConfig.statusCode.data_not_found) {
        this.toastr.success(res.message);
        this.loader = false;
      } else {
        this.toastr.error(res.message);
        this.loader = false;
      }
    });
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    let valueColumn;
    if (item.label === "Referer No") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Referer No"
      )[0];
    }
    if (item.label === "Referer First Name") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Referer First Name"
      )[0];
    }
    if (item.label === "Referer Last Name") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Referer Last Name"
      )[0];
    }
    if (item.label === "Referer Email") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Referer Email"
      )[0];
    }
    if (item.label === "Referal No") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Referal No"
      )[0];
    }
    if (item.label === "Referal First Name") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Referal First Name"
      )[0];
    }
    if (item.label === "Referal Last Name") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Referal Last Name"
      )[0];
    }
    if (item.label === "Referal Email") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Referal Email"
      )[0];
    }
    if (item.label === "Joined") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Joined"
      )[0];
    }
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
  }

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    console.log("Padination : page , count : ", this.page, this.count);
    this.listAllReferals();
  }

   searchUser(event) {
     console.log(" searchUser  :  ", event.target.value);
     this.searchText = event.target.value;
     this.page = 0;
     this.listAllReferals();
   }

  getsortByStatus(event) {
    console.log("sort status is=====>", event.value);
    this.sort = event.value;
    this.listAllReferals();
  }

  openImportDailog() {
    this.openImportDail = true;
  }
  closedilog() {
    this.openImportDail = false;
  }

  displayDialog(): void {
    this.customizedColumns = true;
  }

  closeViewdilog(): void {
    this.customizedColumns = false;
  }
}
