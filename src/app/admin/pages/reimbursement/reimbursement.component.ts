import { Component, OnInit } from "@angular/core";
import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AdminServicesService } from "../../services/admin-services.service";
import { ActivatedRoute } from "@angular/router";
import { RouterLinkComponent } from "../giveawaysdb/routerlinkorder.component";
import * as moment from "moment-timezone";
import { GridOptions } from "@ag-grid-community/all-modules";
import { RequestObjectInterface } from "../../shared/models/RequestObject.model";

@Component({
  selector: "app-reimbursement",
  templateUrl: "./reimbursement.component.html",
  styleUrls: ["./reimbursement.component.scss"],
})
export class ReimbursementComponent implements OnInit {
  searchText: "";
  setupData = [];
  rembursementListdata = [];
  loader: boolean = false;
  customizedColumns: boolean = false;
  sortValue: any = "";
  sortOrder: any = 1;
  noRecordFound: boolean = false;
  page = genralConfig.paginator.PAGE;
  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  OrderId: any;
  sort;
  public gridOptions: GridOptions;
  public columnDefs: any[];
  public defaultColDef;

  columnData = [
    { label: "First Name", checked: true },
    { label: "Last Name", checked: true },
    { label: "Member No.", checked: true },
    { label: "Email", checked: true },
    { label: "Rebate Balance", checked: true },
    { label: "Rebate Payable", checked: true },
    { label: "Rebate Pending", checked: true },
    { label: "Rebate Recieved", checked: true },
    { label: "Comm Balance", checked: true },
    { label: "Comm Payable", checked: true },
    { label: "Comm Pending", checked: true },
    { label: "Comm Recieved", checked: true },
  ];

  constructor(
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _adminService: AdminServicesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.OrderId = this.activatedRoute.snapshot.paramMap.get("Orderid");

    this.listRembursement();
  }

  private initializeForm(): void {
    this.columnDefs = [
      {
        headerName: "First Name",
        field: "firstname",
        cellRenderer: (params) => {
          var celdata;
          return (celdata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Last Name",
        field: "lastname",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Member No.",
        field: "memberNumber",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Email",
        field: "email",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Rebate Balance",
        field: "rebate_balance",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },

      {
        headerName: "Rebate Payable",
        field: "rebate_payable",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Rebate Pending",
        field: "rebate_pending",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Rebate Recieved",
        field: "rebate_recieved",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Comm Balance",
        field: "comm_balance",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Comm Payable",
        field: "comm_payable",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Comm Pending",
        field: "comm_pending",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Comm Recieved",
        field: "comm_recieved",
        cellRenderer: (params) => {
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
    ];
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
  }

  listRembursement() {
    let speclObject: RequestObjectInterface;

    speclObject = {
      searchText: this.searchText ? this.searchText : null,
      count: this.count ? this.count : null,
      page: this.page ? this.page : 1,
      sortBy: this.sortOrder ? this.sortOrder : 1,
      sort: this.sort ? this.sort : "",
    };

    this.loader = true;
    this._adminService.getRembursement(speclObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.rembursementListdata = [];
        this.rembursementListdata = res.data;
        this.totalCount = res.total;
        this.noRecordFound = false;
      } else if (res && res.code == genralConfig.statusCode.data_not_found) {
        this.rembursementListdata = [];
        if (this.totalCount == 0 || this.rembursementListdata.length == 0) {
          this.noRecordFound = true;
        }
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  searchByOrderNo(event) {
    this.searchText = event.target.value;

    this.listRembursement();
  }
  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listRembursement();
  }

  getsortByStatus(event) {
    this.sort = event.value;
    this.listRembursement();
  }
  displayDialog() {
    this.customizedColumns = true;
  }
  closeViewdilog() {
    this.customizedColumns = false;
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    var valueColumn;
    if (item.label === "First Name") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "First Name"
      )[0];
    }
    if (item.label === "Last Name") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Last Name"
      )[0];
    }
    if (item.label === "Member No.") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Member No."
      )[0];
    }
    if (item.label === "Email") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Email"
      )[0];
    }
    if (item.label === "Rebate Balance") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Rebate Balance"
      )[0];
    }
    if (item.label === "Rebate Payable") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Rebate Payable"
      )[0];
    }
    if (item.label === "Rebate Pending") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Rebate Pending"
      )[0];
    }
    if (item.label === "Rebate Recieved") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Rebate Recieved"
      )[0];
    }
    if (item.label === "Comm Balance") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Comm Balance"
      )[0];
    }
    if (item.label === "Comm Payable") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Comm Payable"
      )[0];
    }
    if (item.label === "Comm Pending") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Comm Pending"
      )[0];
    }
    if (item.label === "Comm Recieved") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Comm Recieved"
      )[0];
    }

    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
  }
}
