import { Component, OnInit, ViewChildren } from "@angular/core";
import { GridOptions } from "@ag-grid-community/all-modules";
import { GridApi } from "ag-grid/main";
import { ToastrService } from "ngx-toastr";
import { ExportType, ExcelOptions } from "mat-table-exporter";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material";

import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { AdminServicesService } from "../../services/admin-services.service";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { BonusCodeCreateUpdateComponent } from "./bonus-code-create-update/bonus-code-create-update.component";
import { IRowData } from "../../shared/models/IRowData.model";
import { RequestObjectInterface } from "../../shared/models/RequestObject.model";
import * as moment from "moment";
import { DeleteBonusButtonRendererComponent } from "./delete-bonus-button-renderer.component";
@Component({
  selector: "app-setup-bonuscode",
  templateUrl: "./setup-bonuscode.component.html",
  styleUrls: ["./setup-bonuscode.component.scss"],
})
export class SetupBonuscodeComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public columnDefs: any[];
  public defaultColDef;
  public gridApi: GridApi;
  frameworkComponents: any;

  columnsData = [
    { label: "Bonus Code", checked: true },
    { label: "Discount Off", checked: true },
    { label: "Activated", checked: true },
    { label: "Creation Data", checked: true },
    { label: "Actions", checked: true },
  ];

  customizedColumns: boolean;

  @ViewChildren("checkboxes") checkboxes;
  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  FAQId: any;
  statusdelete: boolean = false;
  pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  sortValue: any = "";
  sortOrder: any = -1;
  loader: boolean = false;
  bonusCodeListData: any = [];
  noRecordFound: boolean = false;
  BonusCodeForm: FormGroup;
  displayDialogue: boolean = false;
  sort;
  header_value: any;
  sortList = ["discount_off", "activated", "createdAt"];
  checkedArr = [];

  constructor(
    public adminService: AdminServicesService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.frameworkComponents = {
      buttonRenderer: DeleteBonusButtonRendererComponent,
    };
    this.initializeForm();
    this.rowData = [];

    this.listBonusCodes();
  }

  ngOnInit() {}

  initializeForm(): void {
    this.columnDefs = [
      {
        headerName: "Bonus Code",
        field: "name",

        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Discount Off",
        field: "discount_off",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Activated",
        field: "activated",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Creation Data",
        field: "createdAt",
        cellRenderer: (params) => {
          var launchData;
          return (launchData = params.value
            ? moment(params.value).format("LL")
            : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Actions",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.openDialog.bind(this),
          label: "Click 1",
        },
        suppressSizeToFit: false,
        sortable: false,
        filter: false,
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

  listBonusCodes() {
    let requesBonusCodeObject: RequestObjectInterface = {
      page: this.page ? this.page : null,
      count: this.count ? this.count : "",
      sort: this.sort ? this.sort : "",
      searchText: "",
      sortBy: this.sortOrder ? this.sortOrder : 1,
    };

    this.adminService
      .listAllBonusCodes(requesBonusCodeObject)
      .subscribe((res: any) => {
        this.loader = false;
        if (res && res.code == genralConfig.statusCode.ok) {
          this.bonusCodeListData = res.data;
          this.totalCount = res.total;
          this.noRecordFound = false;
          if (this.bonusCodeListData.length == 0) {
            this.noRecordFound = true;
          }
        } else if (res && res.code == genralConfig.statusCode.data_not_found) {
          this.bonusCodeListData = [];
          if (this.bonusCodeListData.length == 0) {
            this.noRecordFound = true;
          }
        } else {
          this.toastr.error(res.message);
        }
      });
  }

  displayDialog(): void {
    this.customizedColumns = true;
  }

  closeViewdilog(): void {
    this.customizedColumns = false;
  }

  checkUncheck(val) {
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

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listBonusCodes();
  }

  sortBy(value, order) {
    this.sortValue = value;
    this.sortOrder = order;
    this.listBonusCodes();
  }

  // for deliting bonus codes
  openDialog(data) {
    console.log("openDialog", data);
    const rowData = data.rowData;

    if (rowData._id.length) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: "350px",
        data: "Do you confirm the deletion of this data?",
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loader = true;
          this.adminService
            .deleteBonuCode({ _id: rowData._id })
            .subscribe((res: any) => {
              this.loader = false;
              if (res && res.code == genralConfig.statusCode.ok) {
                this.toastr.success(res.message);

                this.listBonusCodes();
              } else {
                this.toastr.error(res.message);
              }
            });
        }
      });
    }
  }

  addBonusCode() {
    this.dialog
      .open(BonusCodeCreateUpdateComponent, {})
      .afterClosed()
      .subscribe((updatedBonusCodeData) => {
        if (updatedBonusCodeData) {
          this.listBonusCodes();
        }
      });
  }

  updateBonusCode(updateDtata: any) {
    this.dialog
      .open(BonusCodeCreateUpdateComponent, {
        data: updateDtata,
      })
      .afterClosed()
      .subscribe((updatedBonusCodedata) => {
        if (updatedBonusCodedata) {
          this.listBonusCodes();
        }
      });
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    let valueColumn;
    if (item.label === "Bonus Code") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Bonus Code"
      )[0];
    }
    if (item.label === "Discount Off") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Discount Off"
      )[0];
    }
    if (item.label === "Last Name") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Activated"
      )[0];
    }

    if (item.label === "Creation Data") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Creation Data"
      )[0];
    }
    if (item.label === "Actions") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Actions"
      )[0];
    }
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
  }
}
