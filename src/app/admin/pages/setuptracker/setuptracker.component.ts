import { Component, OnInit } from "@angular/core";
import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { AdminServicesService } from "../../services/admin-services.service";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment-timezone";
import { ButtonRendererComponent } from "./button-renderer.component";
import { GridOptions } from "@ag-grid-community/all-modules";
import { PendindLaunchButtonComponent } from "./pendinglaunchbutton.component";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { GenralService } from "src/app/core/services/sharedservices/genralservice/genral.service";
import { QuestionButtonRendererComponent } from "./question-button-renderer.component";
import { IRowData } from "../../shared/models/IRowData.model";

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
    private toastr: ToastrService // private http: HttpClient
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      questionButtonRenderer: QuestionButtonRendererComponent,
      pendinglaunchbuttonRenderer: PendindLaunchButtonComponent,
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
        field: "product_title",
        cellRenderer: (params) => {
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "ASIN",
        field: "asin",
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
          return params.value ? params.value : "N/A";
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "AMZ Link",
        field: "amazon_link",

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
          return params.value ? moment(params.value).format("LL") : "N/A";
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
        headerName: "Status",
        field: "launch_isActive",
        cellRenderer: (params) => {
          let status = "";
          if (!params.data.launch_number) {
            return "";
          }
          if (!this.displayLiveStatus) {
            if (params.data.isPaymentDone === false) {
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

  ngOnInit() {
    this.getSetupTrackerData();

    this.instForm = this.formBuilder.group({
      keyword: this.formBuilder.array([]),
      link: this.formBuilder.array([]),
      special_link_INS4: ["", Validators.required],
      rotaryLink: ["", Validators.required],
    });
  }

  openConfirmationDialog(obj, rowData) {
    console.log("This row object is ====>", rowData);

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
        console.log("Canceleee");
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
        console.log("Setup data is ========>", this.setupData);
        this.loader = false;
        this.noRecordFound = false;
        this.displayLiveStatus = this.launchSort === "live";
        // this.toastr.success(res.message);
      } else {
        this.loader = false;
        this.setupData = [];
        this.noRecordFound = true;
        // this.toastr.error(res.message);
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
    // this.page = 0;
    this.getSetupTrackerData();
  }

  getsortByStatus(status) {
    this.sortBy.isDefault = status.value;
    this.launchSort = this.sortBy.isDefault;
    this.getSetupTrackerData();

    // this.getNotification();
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
      // this.adminService.approveProductLaunch(obj).subscribe(res => {
      //     if (res.code === genralConfig.statusCode.ok) {
      //         this.loader = false;
      //         this.getSetupTrackerData();

      //         this.toastr.success(res.message);
      //     } else {
      //         this.loader = false;
      //         this.toastr.error(res.message);
      //     }
      // });
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
    // this.gridOptions.api.sizeColumnsToFit();
    // this.customizedColumns = false
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
      title: data.rowData.product_title,
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
    console.log(data, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  }

  get keywordArr() {
    return this.instForm.get("keyword") as FormArray;
  }

  get linkArr() {
    return this.instForm.get("link") as FormArray;
  }

  updateINS() {
    console.log(this.instForm.value, "++++++++++++++++++++++++++++++++");
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
