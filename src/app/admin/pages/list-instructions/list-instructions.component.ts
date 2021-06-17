import { Component, OnInit } from "@angular/core";
import { GridOptions } from "@ag-grid-community/all-modules";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { AdminServicesService } from "../../services/admin-services.service";
import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { IRowData } from "../../shared/models/IRowData.model";
import { element } from "protractor";
import { InstructionActionsButtonsRendrerComponent } from "./instructions-actions-buttons-renderer.component";

@Component({
  selector: "app-list-instructions",
  templateUrl: "./list-instructions.component.html",
  styleUrls: ["./list-instructions.component.scss"],
})
export class ListInstructionsComponent implements OnInit {
  public gridOptions: GridOptions;
  public gridApi: any;
  public rowData: IRowData[];
  public defaultColDef;

  frameworkComponents: any;

  columnsData = [
    { label: "Instructions", checked: true },
    { label: "Description", checked: true },
    { label: "Actions", checked: true },
  ];

  public columnDefs = [];

  count: any = genralConfig.paginator.COUNT;
  totalCount = 20;
  loader = false;
  page = genralConfig.paginator.PAGE;
  searchText: any;
  sort: any;
  sortOrder: any;
  instructionsData: any;
  instForm: FormGroup;
  displayDialogue: boolean;
  headerValue: string;
  InstId: any;
  viewInst: boolean;
  customizedColumns: boolean;

  constructor(
    private adminService: AdminServicesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.frameworkComponents = {
      instructionsActionsButtonsRenderer: InstructionActionsButtonsRendrerComponent,
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
    this.listAllInstructions();
    this.rowData = [];
  }

  ngOnInit() {
    this.instForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
    });

    console.log("grid api in init is =====>", this.gridApi);
  }

  onGridReady(event: any) {
    console.log("event api is ===>", event);
    this.gridApi = event.api;
    console.log("this.gridApi in ong grid ====>", this.gridApi);
    this.gridApi.sizeColumnsToFit();
  }

  initializeForm(): void {
    this.columnDefs = [
      {
        headerName: "Instructions",
        field: "name",
        cellStyle: { "text-align": "center" },
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Description",
        field: "description",
        cellStyle: { "text-align": "center" },
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
      },
      {
        headerName: "Actions",
        cellRenderer: "instructionsActionsButtonsRenderer",
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
    if (item.label === "Instructions") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Instructions"
      )[0];
    }
    if (item.label === "Description") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Description"
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
    if (event.target.textContent === "edit") {
      this.displayDialog("Update", rowData);
    } else if (event.target.textContent === "delete") {
      this.openDialog(rowData._id);
    } else {
      this.viewInstruction(rowData);
    }
  }

  listAllInstructions(): void {
    this.loader = true;
    const listObj = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : "",
      sort: this.sort,
      sortBy: this.sortOrder,
    };
    this.adminService.listAllInstructions(listObj).subscribe((res) => {
      if (res.code === genralConfig.statusCode.ok) {
        this.instructionsData = res.data.data;
        this.totalCount = res.data.count;
        this.loader = false;
        this.toastr.success(res.message);
      } else {
        this.instructionsData = [];
        this.loader = false;
        this.toastr.error(res.message);
      }
    });
  }

  paginate(event): void {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listAllInstructions();
  }

  // sortByFun(value, order) {
  //   this.sort = value;
  //   this.sortOrder = order;
  //   this.listAllInstructions();
  // }

  displayDialog(value, data): void {
    if (value === "Add") {
      this.instForm.reset();
      this.headerValue = "Add";
      this.displayDialogue = true;
    } else {
      this.headerValue = "Update";
      this.InstId = data._id;
      this.displayDialogue = true;
      this.instForm.patchValue({
        name: data.name ? data.name : "",
        description: data.description ? data.description : "",
      });
    }
  }

  openDialog(id): void {
    if (id.length) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: "350px",
        data: "Do you confirm the deletion of this data?",
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loader = true;
          this.adminService.deleteInstruction({ id }).subscribe((res: any) => {
            this.loader = false;
            if (res && res.code === genralConfig.statusCode.ok) {
              this.toastr.success(res.message);
              this.listAllInstructions();
            } else {
              this.toastr.error(res.message);
            }
          });
        }
      });
    }
  }
  closedilog(): void {
    this.displayDialogue = false;
    this.instForm.reset();
  }

  viewInstruction(item): void {
    this.viewInst = true;
    this.instForm.patchValue({
      name: item.name ? item.name : "",
      description: item.description ? item.description : "",
    });
  }
  closeViewdilog(): void {
    this.viewInst = false;
    this.instForm.reset();
  }

  addInst(): void {
    this.loader = true;
    const data = this.instForm.value;
    this.adminService.addInstruction(data).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code === genralConfig.statusCode.ok) {
        this.displayDialogue = false;
        this.toastr.success(res.message);
        this.instForm.reset();
        this.listAllInstructions();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  updateInst(): void {
    this.loader = true;
    let data = this.instForm.value;
    data.id = this.InstId;
    this.adminService.editInstruction(data).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code === genralConfig.statusCode.ok) {
        this.displayDialogue = false;
        this.toastr.success(res.message);
        this.listAllInstructions();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  displayCustomizeColumnsDialog(): void {
    this.customizedColumns = true;
  }

  closeCustomizeColumnsDialog(): void {
    this.customizedColumns = false;
  }
}
