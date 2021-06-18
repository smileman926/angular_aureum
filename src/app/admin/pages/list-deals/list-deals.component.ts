import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material";
import * as moment from "moment-timezone";
import * as FileSaver from "file-saver";
import { GridOptions } from "@ag-grid-community/all-modules";

import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { AdminServicesService } from "../../services/admin-services.service";
import { DeleteButtonRendererComponent } from "./delete-button-renderer.component";
import { IRowData } from "../../shared/models/IRowData.model";
import { RequestObjectInterface } from "../../shared/models/RequestObject.model";
import { ApiService } from "src/app/shared/services/api.service";
import { ProductCategory } from "../../shared/models/ProductCategory.model";
import { ChangeDealCategoryRendererComponent } from "./change-deal-category-renderer.component";
import { Subscription, timer } from "rxjs";

export interface PeriodicElement {
  Date: string;
  URL: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Eligible: string;
}

@Component({
  selector: "app-list-deals",
  templateUrl: "./list-deals.component.html",
  styleUrls: ["./list-deals.component.scss"],
})
export class ListDealsComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public columnDefs: any[];
  public categories: ProductCategory[];

  columnsData = [
    { label: "Date", checked: true },
    { label: "URL", checked: true },
    { label: "Category", checked: true },
    { label: "Change Category", checked: true },
    { label: "Member No", checked: true },
    { label: "First Name", checked: true },
    { label: "Last Name", checked: true },
    { label: "Email", checked: true },
    { label: "Eligible", checked: true },
    { label: "Remove deal", checked: true },
    { label: "Member Tier", checked: true },
    { label: "Member Commission", checked: true },
    { label: "Actions", checked: true },
  ];

  displayedColumns = [
    "createdAt",
    "url",
    "category",
    "memberNo",
    "firstName",
    "lastName",
    "email",
    "eligible",
    "removeDeal",
    "memberTier",
    "memberCommission",
    "actions",
  ];
  frameworkComponents: any;
  count: any = genralConfig.paginator.COUNT;
  totalCount = 20;
  loader = false;
  page = genralConfig.paginator.PAGE;
  dealsData = [];
  sort: any;
  sortOrder: any;
  searchText: any;
  openImportDail: boolean;
  fileArr = [];
  fileObj = [];
  arrToAppend = [];
  customizedColumns: boolean = false;
  private searchTimer: Subscription;

  constructor(
    private adminService: AdminServicesService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.frameworkComponents = {
      buttonRenderer: DeleteButtonRendererComponent,
      changeDealCategoryRenderer: ChangeDealCategoryRendererComponent,
    };
    this.getCategories();

    this.rowData = [];
    this.listAllDeals();

    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      unSortIcon: true,
      enableColResize: true,
      rowSelection: "single",
      context: {},
    };
  }

  ngOnInit() {}

  initializeForm(): void {
    this.columnDefs = [
      {
        headerName: "Date",
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
        headerName: "URL",
        field: "simpleUrl",

        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Category",
        field: "category",

        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Change Category",
        cellRenderer: "changeDealCategoryRenderer",
        cellRendererParams: {
          onChange: this.changeDealCategory.bind(this),
          label: "Click 1",
          categories: this.categories || [{ category_name: "test" }],
        },
        sortable: false,
        filter: false,
      },
      {
        headerName: "Member No",
        field: "user_id",

        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "First Name",
        field: "firstName",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Last Name",
        field: "lastName",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Email",
        field: "email",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Eligible",
        field: "eligible",
        cellRenderer: (params) => {
          return params.value ? "Yes" : "No";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Remove deal",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.deleteRestoreDeal.bind(this),
          label: "Click 1",
        },
        sortable: false,
        filter: false,
      },
      {
        headerName: "Member Tier",
        field: "tier_name",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Member Commission",
        field: "comission",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
    ];
  }

  getCategories(): void {
    this.adminService.listAllCategories().subscribe((res) => {
      this.categories = [
        ...res[1].sort((a: ProductCategory, b: ProductCategory) => {
          const aName = a.category_name.toUpperCase();
          const bName = b.category_name.toUpperCase();
          if (aName < bName) {
            return -1;
          }
          if (aName > bName) {
            return 1;
          }
          return 0;
        }),
      ];
      let pos = this.categories
        .map(function (e) {
          return e.category_name;
        })
        .indexOf("OTHER");
      const otherCategory = this.categories.splice(pos, 1);
      console.log(otherCategory);
      this.categories.push(otherCategory[0]);
      // this.categories = res[1];
      this.initializeForm();
    });
  }

  listAllDeals() {
    this.loader = true;
    const listObj: RequestObjectInterface = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : "",
      sort: this.sort,
      sortBy: this.sortOrder,
    };

    this.adminService.listAllDeals(listObj).subscribe((res) => {
      if (res.code === genralConfig.statusCode.ok) {
        this.dealsData = res.data.data;
        this.totalCount = res.data.count;
        this.loader = false;
        //this.toastr.success(res.message);
      } else {
        this.dealsData = [];
        this.loader = false;
        this.toastr.error(res.message);
      }
    });
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    let valueColumn;
    if (item.label === "Date") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Date"
      )[0];
    }
    if (item.label === "URL") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "URL"
      )[0];
    }
    if (item.label === "Category") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Category"
      )[0];
    }
    if (item.label === "Member No") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Member No"
      )[0];
    }
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
    if (item.label === "Email") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Email"
      )[0];
    }
    if (item.label === "Eligible") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Eligible"
      )[0];
    }
    if (item.label === "Remove deal") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Remove deal"
      )[0];
    }
    if (item.label === "Member Tier") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Member Tier"
      )[0];
    }
    if (item.label === "Member Commission") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Member Commission"
      )[0];
    }
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
  }

  sortByFun(value, order) {
    this.sort = value;
    this.sortOrder = order;
    this.listAllDeals();
  }

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listAllDeals();
  }

  searchDeal(event) {
    this.searchText = event.target.value;
    if (this.searchTimer) {
      this.searchTimer.unsubscribe();
    }

    this.searchTimer = timer(1000).subscribe(() => {
      this.listAllDeals();
    });
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

  upload(e) {
    this.fileArr = [];
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item: File, i) => {
      const fileImage = item.type.split("/");
      const fileExt = fileImage[1];
      const fileType = fileImage[0];
      const size = item.size;
      if (fileType === "text" || fileType === "csv") {
        if ("|csv|text|".indexOf(fileExt) === -1) {
          this.toastr.error(genralConfig.CSV.CSV_FORMAT_NOT_SUPPORTED);
          return false;
        } else if (size >= 20185920) {
          // 20mb
          this.toastr.error(genralConfig.CSV.CSV_SIZE_EXCEED);
          return false;
        } else {
          this.fileArr.push({ item });
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
      await this.arrToAppend[0].forEach((item, i) => {
        formData.append("csv", item);
      });

      this.adminService
        .importUsersIntoBuyerCollection(formData)
        .subscribe((response) => {
          if (response.code === genralConfig.statusCode.ok) {
            this.toastr.success(response.message);
            this.loader = false;
            this.openImportDail = false;
            this.fileArr = [];
            this.arrToAppend = [];
            this.listAllDeals();
          } else {
            this.toastr.error(response.message);
            this.loader = false;
          }
        });
    } else {
      this.toastr.error(genralConfig.CSV.FILE_FORMAT_NOT_SUPPORTED);
    }
  }

  exportArray() {
    // const body = {
    //   searchText: this.searchText,
    // };
    this.adminService.getXSLXDeals().subscribe((result) => {
      const blob = new Blob([result], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(blob, "deals.xls");
    });
  }

  deleteRestoreDeal(data) {
    const rowData = data.rowData;
    let obj = {};

    if (rowData.isDeleted === false) {
      this.loader = true;
      obj = {
        dealId: data.rowData._id,
        isDeleted: true,
      };
    } else {
      this.loader = true;
      obj = {
        dealId: data.rowData._id,
        isDeleted: false,
      };
    }

    this.adminService.deleteDeal(obj).subscribe((result) => {
      if (result.code === 200) {
        this.listAllDeals();
        // this.initializeForm();
      }
    });
  }

  changeDealCategory(data) {
    const element = data.rowData;
    const value = data.event;
    this.adminService
      .updateDealCategory(element.product_id, value)
      .subscribe((res) => {
        this.dealsData = this.dealsData.map((el) => {
          if (el.product_id === res.data._id) {
            return { ...el, category: res.data.category };
          }
          return el;
        });
        this.toastr.success("Changed status buyer");
      });
  }

  // deleteRestoreDeal(dealId: string, isDeleted) {
  //   console.log("deleting deaaals");
  //   this.adminService.deleteDeal({ dealId, isDeleted }).subscribe((result) => {
  //     if (result.code === 200) {
  //       this.listAllDeals();
  //     }
  //   });
  // }

  displayDialog() {
    this.customizedColumns = true;
  }

  closeViewdilog() {
    this.customizedColumns = false;
  }

  showUpdateDealDialog() {}
}
