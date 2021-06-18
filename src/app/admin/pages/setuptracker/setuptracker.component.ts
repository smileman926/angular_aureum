import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GridOptions } from "@ag-grid-community/all-modules";
import * as moment from "moment-timezone";
import { ToastrService } from "ngx-toastr";

import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { AdminServicesService } from "../../services/admin-services.service";
import { ButtonRendererComponent } from "./renderers/button-renderer.component";
import { PendindLaunchButtonComponent } from "./renderers/pendinglaunchbutton.component";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { GenralService } from "src/app/core/services/sharedservices/genralservice/genral.service";
import { QuestionButtonRendererComponent } from "./renderers/question-button-renderer.component";
import { IRowData } from "../../shared/models/IRowData.model";
import { EditDeleteLaunchButtonsRendererComponent } from "./renderers/edit-delete-launch-button-renderer.component";
import { GoToWalletButtonComponent } from "./renderers/go-to-wallet.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/shared/confirmation-dialog/confirmation-dialog.component";
import { ProductLaunchStatus } from "../../shared/models/ProductLaunchStatus.model";

@Component({
  selector: "app-setuptracker",
  templateUrl: "./setuptracker.component.html",
  styleUrls: ["./setuptracker.component.scss"],
})
export class SetuptrackerComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public columnDefs: any[];

  instForm: FormGroup;
  data = [
    { label: "Company", checked: true },
    { label: "Contact Name", checked: true },
    { label: "Contact Email", checked: true },
    { label: "Launch no", checked: true },
    { label: "Item Name", checked: true },
    { label: "ASIN", checked: true },
    { label: "AMZ Link", checked: true },
    { label: "Start date", checked: true },
    { label: "End date", checked: true },
    { label: "Type of Payment", checked: true },
    { label: "Seller Wallet", checked: true },
    { label: "Status", checked: true },
    { label: "Pending Launch", checked: true },
    { label: "Approve Launch Product", checked: true },
  ];

  customizedColumns: any;
  displayedColumns = [
    "contact_name",
    "contact_email",
    "gw_no",
    "item_name",
    "start_date",
    "end_date",
    "typeOfPayment",
    "asin",
    "link",
    "status",
    "Approve Launch Product",
    "Approve Launch Product",
  ];
  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  // pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  searchText: "";
  setupData = [];
  loader = false;
  displayLiveStatus = false;
  noRecordFound = false;
  frameworkComponents: any;
  isOpenQuestionModal = false;
  selectProductModal = {
    title: "",
    id: "",
    questions: [],
  };
  launchNo: string;

  // public modules = [AllModules, SetFilterModule];
  sortBy: any = {
    isPending: "pending",
    isLive: "live",
    isCompleted: "completed",
    isDefault: "all",
    isAll: "all",
  };
  launchSort: any = this.sortBy.isDefault;
  viewInst: boolean;
  keywordPresent: boolean;
  productData: any;

  constructor(
    private adminService: AdminServicesService,
    private general_service: GenralService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();

    this.instForm = this.formBuilder.group({
      keyword: this.formBuilder.array([]),
      link: this.formBuilder.array([]),
      special_link_INS4: ["", Validators.required],
      rotaryLink: ["", Validators.required],
    });
  }

  initializeForm(): void {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      questionButtonRenderer: QuestionButtonRendererComponent,
      pendinglaunchbuttonRenderer: PendindLaunchButtonComponent,
      editDeleteLaunchButtonsRenderer: EditDeleteLaunchButtonsRendererComponent,
      goToWalletRenderer: GoToWalletButtonComponent,
    };
    this.columnDefs = [
      {
        headerName: "Company",
        field: "seller_id.user_id.companyname",

        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Contact Name",
        field: "seller_id.user_id.firstname",

        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Contact Email",
        field: "seller_id.user_id.email",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Launch no",
        field: "launch_number",

        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Item Name",
        field: "product_id.product_title",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "ASIN",
        field: "product_id.asin",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Giveaways",
        field: "giveaway_quantity",
        cellRenderer: (params) => {
          return params.value
            ? params.value + params.data.evergreen_giveaway_quantity
            : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "AMZ Link",
        field: "product_id.amazon_link",

        cellRenderer: (params) =>
          `<a href="${params.value}" target="_blank"><i class="fa fa-external-link"
          aria-hidden="true"></i></a>`,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Start date",
        field: "launch_date",
        cellRenderer: (params) => {
          return params.value ? moment(params.value).format("LL") : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "End date",
        field: "end_date",
        cellRenderer: (params) => {
          return params.data.evergreen_end_date
            ? moment(params.value)
                .add(
                  moment(params.data.evergreen_end_date).diff(
                    params.value,
                    "days"
                  ),
                  "days"
                )
                .format("LL")
            : params.value
            ? moment(params.value).format("LL")
            : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Type of payment",
        field: "paymentMethod",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Seller Wallet",
        cellRenderer: "goToWalletRenderer",
        cellRendererParams: {
          onClick: this.goToWallet.bind(this),
          label: "Seller Wallet",
        },
        sortable: false,
        filter: false,
      },
      {
        headerName: "Status",
        field: "launch_isActive",
        cellRenderer: (params) => {
          let status = "";
          if (!params.data.launch_number) {
            return "";
          }
          if (!this.displayLiveStatus) {
            if (params.data.isSubmitedBySeller === false) {
              status = '<i aria-hidden="true">Not Submitted</i>';
            } else {
              status = params.value
                ? `<i aria-hidden="true">Completed</i>`
                : `<i  aria-hidden="true">Pending</i>`;
            }
          } else {
            status = `<i aria-hidden="true">Live</i>`;
          }
          return status;
        },
        sortable: true,
        filter: true,
      },
      // {
      //     headerName: 'Pending Launch',
      //     cellRenderer: 'pendinglaunchbuttonRenderer',
      //     cellRendererParams: {
      //         onClick: this.show.bind(this),
      //         label: 'instruction'
      //     },
      // },
      {
        headerName: "Approve Launch Product",
        cellRenderer: "buttonRenderer",
        cellRendererParams: {
          onClick: this.approveProductLaunch.bind(this),
          label: "Click 1",
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Questionnaire",
        cellRenderer: "questionButtonRenderer",
        cellRendererParams: {
          onClick: this.openModalQuestions.bind(this),
          label: "Questions",
        },
        sortable: false,
        filter: false,
      },

      {
        headerName: "Actions",
        cellRenderer: "editDeleteLaunchButtonsRenderer",
        cellRendererParams: {
          onClick: this.buttonHandler.bind(this),
          label: "Click 1",
        },
        sortable: false,
        filter: false,
      },
    ];
    this.rowData = [];
    this.getSetupTrackerData();
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      unSortIcon: true,
      enableColResize: true,
      rowSelection: "single",
      context: {},
    };
  }

  openConfirmationDialog(obj, rowData) {
    const confirmObj = {
      title: "Are you sure?",
      html: `
              <span>You want to confirm (and start) Launch No. ${rowData.launch_number}</span>
            `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    };
    this.general_service.updateConfirmationBox(confirmObj).subscribe((res) => {
      if (res) {
        this.adminService.approveProductLaunch(obj).subscribe((res) => {
          if (res.code === genralConfig.statusCode.ok) {
            this.loader = false;
            this.getSetupTrackerData();

            this.toastr.success(res.message);
          } else {
            this.loader = false;
            this.toastr.error(res.message);
          }
        });
      } else {
        this.loader = false;
      }
    });
  }

  getSetupTrackerData() {
    this.loader = true;
    const obj = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : "",
      launchSort: this.launchSort === "all" ? undefined : this.launchSort,
    };
    this.adminService.listAllOrdersForAdmin(obj).subscribe((res) => {
      if (res.code === genralConfig.statusCode.ok) {
        this.setupData = res.data;
        this.totalCount = res.total;
        this.loader = false;
        this.noRecordFound = false;
        this.displayLiveStatus = this.launchSort === "live";
      } else {
        this.loader = false;
        this.setupData = [];
        this.noRecordFound = true;
      }
    });
  }

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.getSetupTrackerData();
  }

  searchData(event) {
    this.searchText = event.target.value;
    this.getSetupTrackerData();
  }

  getsortByStatus(status) {
    this.sortBy.isDefault = status.value;
    this.launchSort = this.sortBy.isDefault;
    this.getSetupTrackerData();

    // this.getNotification();
  }

  buttonHandler(data): void {
    const rowData = data.rowData;
    if (data.event.target.textContent === "edit") {
      console.log("editiiiing");
      this.router.navigate(["/layout/admin/edit-launch/" + rowData._id]);
    } else if (data.event.target.textContent === "refresh") {
      this.openReturnDialog(rowData._id);
    } else {
      this.openCancelDialog(rowData._id);
    }
  }

  goToWallet(data): void {
    const seller = data && data.rowData && data.rowData.seller_id && data.rowData.seller_id.user_id;
    this.router.navigate([`/layout/admin/wallet`], {
      queryParams: {
        seller_id: seller && (seller._id || seller[0]._id),
      },
    });
  }

  approveProductLaunch(data) {
    console.log("data", data.rowData.launch_isApproved);
    const rowData = data.rowData;
    if (
      rowData.questionary &&
      rowData.questionary.questions &&
      rowData.questionary.questions.length === 0
    ) {
      alert("Fill in the questions to continue");
      return;
    }

    if (data.rowData.launch_isApproved === false) {
      this.loader = true;
      const obj = {
        id: data.rowData._id,
      };
      this.openConfirmationDialog(obj, data.rowData);
    }
  }

  openCancelDialog(id: string): void {
    if (id.length) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: "350px",
        data: "Do you confirm the cancel of this product launch?",
      });
      const productLaunchStatus: ProductLaunchStatus = {
        launch_isApproved: false,
        isSubmitedBySeller: true,
      };
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loader = true;
          this.adminService
            .cancelProductLaunchByAdmin(id, productLaunchStatus)
            .subscribe((res: any) => {
              this.loader = false;
              if (res && res.code == genralConfig.statusCode.ok) {
                this.toastr.success(res.message);
                this.getSetupTrackerData();
              } else {
                this.toastr.error(res.message);
              }
            });
        }
      });
    }
  }

  openReturnDialog(id: string): void {
    if (id.length) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: "350px",
        data: "Do you want ot return this product launch to seller?",
      });
      const productLaunchStatus: ProductLaunchStatus = {
        launch_isApproved: false,
        isSubmitedBySeller: false,
      };
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loader = true;
          this.adminService
            .cancelProductLaunchByAdmin(id, productLaunchStatus)
            .subscribe(
              (res: any) => {
                this.loader = false;
                if (res && res.code == genralConfig.statusCode.ok) {
                  this.toastr.success(res.message);
                  this.getSetupTrackerData();
                } else {
                  this.toastr.error(res.message);
                }
              },
              (error) => {
                this.toastr.error(error.message);
              }
            );
        }
      });
    }
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    let valueColumn;
    if (item.label === "Company") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Company"
      )[0];
    }
    if (item.label === "Contact Name") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Contact Name"
      )[0];
    }
    if (item.label === "Contact Email") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Contact Email"
      )[0];
    }
    if (item.label === "Launch no") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Launch no"
      )[0];
    }
    if (item.label === "Item Name") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Item Name"
      )[0];
    }
    if (item.label === "ASIN") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "ASIN"
      )[0];
    }
    if (item.label === "AMZ Link") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "AMZ Link"
      )[0];
    }
    if (item.label === "Start date") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Start date"
      )[0];
    }
    if (item.label === "End date") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "End date"
      )[0];
    }
    if (item.label === "Status") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Status"
      )[0];
    }
    if (item.label === "Pending Launch") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Approve Launch"
      )[0];
    }
    if (item.label === "Approve Launch Product") {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === "Approve Launch Product"
      )[0];
    }
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
  }

  displayDialog() {
    this.customizedColumns = true;
  }

  closeViewdilog() {
    this.customizedColumns = false;
  }

  closeInstdilog() {
    this.viewInst = false;
    this.instForm.setControl("keyword", this.formBuilder.array([]));
    this.instForm.setControl("link", this.formBuilder.array([]));
  }

  openModalQuestions(data) {
    const questions = data.rowData.questionary
      ? data.rowData.questionary.questions
      : [];
    this.selectProductModal = {
      title: data.rowData.product_id.product_title,
      id: data.rowData._id,
      questions,
    };

    this.isOpenQuestionModal = true;
  }

  updateDataProduct(productData: any) {
    this.setupData = this.setupData.map((el) => {
      if (el._id === productData.id) {
        return {
          ...el,
          questionary: productData.product.questionary,
        };
      }
      return el;
    });
  }

  show(data) {
    if (data.rowData.search_keywords.length > 0) {
      this.keywordPresent = true;
      const control = this.instForm.controls.keyword as FormArray;
      data.rowData.search_keywords.forEach((x) => {
        control.push(this.formBuilder.group(x));
      });
    } else {
      this.keywordPresent = false;
      const control = this.instForm.controls.link as FormArray;
      data.rowData.special_links.forEach((x) => {
        control.push(this.formBuilder.group(x));
      });
    }
    this.instForm.patchValue({
      special_link_INS4: data.rowData.special_link_INS4,
    });
    this.viewInst = true;
    this.productData = data.rowData;
  }

  get keywordArr() {
    return this.instForm.get("keyword") as FormArray;
  }

  get linkArr() {
    return this.instForm.get("link") as FormArray;
  }

  updateINS() {
    this.loader = true;
    const obj = {
      id: this.productData._id,
      giveaway_quantity_map: this.productData.giveaway_quantity_map,
      launch_period: this.productData.launch_period,
      data: this.instForm.value,
    };
    this.adminService.updateINSData(obj).subscribe((res) => {
      if (res.code === genralConfig.statusCode.ok) {
        this.getSetupTrackerData();
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    });
    this.loader = false;
    this.closeInstdilog();
  }
}
