import { Component, OnInit } from "@angular/core";
import { GridOptions } from "@ag-grid-community/all-modules";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";

import { AdminServicesService } from "../../services/admin-services.service";
import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { IRowData } from "../../shared/models/IRowData.model";
import { TestimonialActionsButtonsRendrerComponent } from "./testimonial-actions-buttons-renderer.component";

@Component({
  selector: "app-list-testimonial",
  templateUrl: "./list-testimonial.component.html",
  styleUrls: ["./list-testimonial.component.scss"],
})
export class ListTestimonialComponent implements OnInit {
  public gridOptions: GridOptions;
  public gridApi: any;
  public rowData: IRowData[];
  public defaultColDef;

  frameworkComponents: any;

  columnsData = [
    { label: "First Name", checked: true },
    { label: "Last Name", checked: true },
    { label: "Testimonial", checked: true },
    { label: "Actions", checked: true },
  ];
  public columnDefs = [];

  count: any = genralConfig.paginator.COUNT;
  totalCount: number;
  loader: Boolean = false;
  page = genralConfig.paginator.PAGE;
  testimonialData = [];
  sortBy: any = {
    isApproved: "true",
    unApproved: "false",
    isDefault: "none",
  };
  sort: any;
  sortOrder: any;
  customizedColumns: boolean;

  constructor(
    private admin_service: AdminServicesService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.frameworkComponents = {
      testimonialActionsButtonsRenderer: TestimonialActionsButtonsRendrerComponent,
    };
    this.defaultColDef = {
      filter: true,
      sortable: true,
      resizable: true,
      suppressSizeToFit: true,
    };
    this.gridOptions = {
      unSortIcon: true,
      rowSelection: "single",
      context: { parentComponent: this },
      onGridReady: this.onGridReady.bind(this),
    };
    this.initializeForm();
    this.listAllTestimonials();
    this.rowData = [];
  }

  ngOnInit() {}

  onGridReady(event: any) {
    console.log("event api is ===>", event);
    this.gridApi = event.api;
    console.log("this.gridApi in ong grid ====>", this.gridApi);
    this.gridApi.sizeColumnsToFit();
  }

  initializeForm(): void {
    this.columnDefs = [
      {
        headerName: "First Name",
        field: "firstname",
        cellStyle: { "text-align": "center" },
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Last Name",
        field: "lastname",
        cellStyle: { "text-align": "center" },
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Testimonial",
        field: "text",
        cellStyle: { "text-align": "center" },
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Actions",
        cellRenderer: "testimonialActionsButtonsRenderer",
        cellRendererParams: {
          onClick: this.buttonHandler.bind(this),
          label: "Click 1",
        },
        sortable: false,
        filter: false,
        suppressSizeToFit: false,
      },
    ];
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    let valueColumn;
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
    if (item.label === "Testimonial") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Testimonial"
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

  buttonHandler(data): void {
    const event = data.event;
    const element = data.rowData;
    const rowData = data.rowData;
    if (event.target.textContent === "delete") {
      this.deleteTestm(rowData._id);
    } else {
      this.approveTestm(rowData._id);
    }
  }

  listAllTestimonials() {
    this.loader = true;
    let listObj = {
      page: this.page,
      count: this.count,
      isApproved: this.sortBy.isDefault,
      sort: this.sort,
      sortBy: this.sortOrder,
    };
    this.admin_service.listAllTestimonials(listObj).subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        this.testimonialData = res.data;
        this.loader = false;
       // this.toastr.success(res.message);
        this.totalCount = res.total;
      } else {
        this.testimonialData = [];
        this.loader = false;
        this.toastr.success(res.message);
      }
    });
  }

  approveTestm(id) {
    this.loader = true;
    this.admin_service.approveTestm({ _id: id }).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.listAllTestimonials();
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  deleteTestm(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Do you confirm the deletion of this data?",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loader = true;
        this.admin_service.deleteTestm({ id: id }).subscribe((res: any) => {
          this.loader = false;
          if (res && res.code == genralConfig.statusCode.ok) {
            this.toastr.success(res.message);

            this.listAllTestimonials();
          } else {
            this.toastr.error(res.message);
          }
        });
      }
    });
  }

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listAllTestimonials();
  }

  getsortByStatus(status) {
    this.sortBy.isDefault = status.value;
    this.listAllTestimonials();
  }

  displayCustomizeColumnsDialog(): void {
    this.customizedColumns = true;
  }

  closeCustomizeColumnsDialog(): void {
    this.customizedColumns = false;
  }
}
