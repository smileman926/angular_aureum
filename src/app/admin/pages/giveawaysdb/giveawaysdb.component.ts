import { Component, OnInit, ViewChild } from "@angular/core";
import { genralConfig } from "src/app/core/constant/genral-config.constant";
import { AdminServicesService } from "../../services/admin-services.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { RouterLinkComponent } from "./routerlinkorder.component";
import * as moment from "moment-timezone";
import { GridOptions } from "@ag-grid-community/all-modules";

@Component({
  selector: "app-giveawaysdb",
  templateUrl: "./giveawaysdb.component.html",
  styleUrls: ["./giveawaysdb.component.scss"],
})
export class GiveawaysdbComponent implements OnInit {
  public gridOptions: GridOptions;

  public columnDefs: any[];
  customizedColumns: boolean = false;
  data = [
    { label: "GW", checked: true },
    { label: "Launch No", checked: true },
    { label: "Product Name", checked: true },
    { label: "Brand", checked: true },
    { label: "ASIN", checked: true },
    { label: "AMZ Link", checked: true },
    { label: "F Name", checked: true },
    { label: "L Name", checked: true },
    { label: "Member No", checked: true },
    { label: "Tier", checked: true },
    { label: "Order no", checked: true },
    { label: "Order Status", checked: true },
    { label: "Amount", checked: true },
    { label: "RMB?", checked: true },
    { label: "PP Email", checked: true },
    { label: "GW Date", checked: true },
    { label: "ORD Date", checked: true },
    { label: "Target kw/link", checked: true },
  ];
  displayedColumns = [
    "giveaway",
    "launch_no",
    "product",
    "brand",
    "asin",
    "amz_link",
    "first_name",
    "last_name",
    "memner_no",
    "tier",
    "action",
    "orderno",
    "order_status",
    "amount",
    "rmb_status",
    "pp_email",
    "gw_date",
    "ord_date",
    "match",
    "target_kw_link",
    "fb",
    "pr",
    "max",
  ];
  count: any = genralConfig.paginator.COUNT;
  totalCount: any;
  // pageCountLink: any;
  page = genralConfig.paginator.PAGE;
  displayDialogue: boolean = false;
  searchKeyword: string = "";
  searchText: "";
  giveawaysData = [];
  loader: boolean = false;
  orderNo: any;
  noRecordFound: boolean = false;
  sort;
  frameworkComponents: any;
  sortBy: any = {
    isLastAsc: "lastnameAsc",
    isLastDsc: "lastnameDsc",
    isNewLaunch: "newLaunch",
    isDefault: "all",
  };
  ActionKey: any = {
    sfb: "SFB",
    sfcb: "SFCB",
    linkClick: "Link Click",
    wishlist: "Wishlist",
    helpfulVotes: "Helpful Votes",
    addToCart: "Add To Cart",
    questions: "Questions",
  };
  constructor(
    public _adminServices: AdminServicesService,
    private toastr: ToastrService,
    private readonly router: ActivatedRoute
  ) {
    // this.frameworkComponents = {
    //   linkRenderer: RouterLinkComponent,
    // }
    this.columnDefs = [
      {
        headerName: "GW",
        field: 'giveaway?giveaway:"NA"',
        width: 120,
        cellRenderer: params => {
          var celdata;
          console.log("params ga", params.node.childIndex);
          return (celdata = params ? params.node.childIndex + 1 : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Launch No",
        field: "product_id.launch_number",
        width: 150,
        cellRenderer: params => {
          var launchData;
          return (launchData = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Product Name",
        field: "product_id.product_title",
        cellRenderer: params => {
          var title;
          return (title = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Brand",
        field: "brand.brand_name",
        width: 150,
        cellRenderer: params => {
          console.log("params", params);
          var celldata;
          return (celldata = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "ASIN",
        field: "product_id.asin",
        sortable: true,
        filter: true,
      },
      {
        headerName: "AMZ Link",
        field: "product_id.amazon_link",
        width: 150,
        cellRenderer: params =>
          `<a href="${params.value}" target="_blank"><i class="fa fa-external-link"
      aria-hidden="true"></i></a>`,
        sortable: true,
        filter: true,
      },
      {
        headerName: "F Name",
        field: "user_id.firstname",
        width: 150,
        cellRenderer: params => {
          var fName;
          return (fName = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "L Name",
        field: "user_id.lastname",
        width: 150,
        cellRenderer: params => {
          var lname;
          return (lname = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Member No",
        field: "user_id._id",
        width: 140,
        cellRenderer: params => {
          var memberNO;
          return (memberNO = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Tier",
        field: "tier_id.name",
        width: 150,
        cellRenderer: params => {
          var tier;
          return (tier = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      // { headerName: 'Action', field: 'action', width: 100, cellRenderer:  (params)  =>{
      //   var action
      //  return action = params.value?params.value:'N/A'
      // }, sortable: true, filter: true },
      {
        headerName: "Order no",
        field: "amazon_orderId",
        width: 150,
        cellRendererFramework: RouterLinkComponent,
        //  cellRenderer: 'linkRenderer',
        cellRendererParams: params => {
          return {
            inRouterLink: "/layout/admin/reimbursement",
            customValue: params.value,
          };
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Order Status",
        field: "order_status",
        width: 200,
        cellRenderer: params => {
          var ord;
          return (ord = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "Amount",
        field: "product_id.price",
        width: 150,
        cellRenderer: params => {
          var amt;
          return (amt = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "RMB?",
        field: "is_reimburshed",
        width: 150,
        cellRenderer: params => {
          var fName;

          // `<i *ngIf="!element.is_reimburshed" class="fa fa-close"
          //     aria-hidden="true"></i>`
          return (fName = params.value
            ? `<i  class="fa fa-check"
       aria-hidden="true"></i>`
            : `<i  class="fa fa-close"
          aria-hidden="true"></i>`);
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "PP Email",
        field: "paypal_email",
        width: 130,
        cellRenderer: params => {
          var ppemail;
          return (ppemail = params.value ? params.value : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "GW Date",
        field: "gw_date",
        width: 200,
        cellRenderer: params => {
          var gw;
          //  return gw = params.value?params.value:'N/A'
          return (gw = params.value
            ? moment(params.value).format("LL")
            : "N/A");
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: "ORD Date",
        field: "createdAt",
        width: 200,
        cellRenderer: params => {
          var ord;
          return (ord = params.value
            ? moment(params.value).format("LL")
            : "N/A");
        },
        sortable: true,
        filter: true,
      },
      // { headerName: 'Match', field: 'match', width: 100, cellRenderer:  (params)  =>{
      //   var match
      //  return match = params.value?params.value:'N/A'
      // }, sortable: true, filter: true },
      {
        headerName: "Target kw/link",
        field: "productsLaunched",
        width: 150,
        cellRenderer: params => {
          console.log("target link params", params);

          if (params.value !== null)
          {
            if (params.value.search_method !== null)
            {
              const method = params.value.search_method;

              if (method === "keywords")
              {
                const search_keywords = params.value.search_keywords[0].keyword;

                return search_keywords;

              } else if (method === "link")
              {
                const special_links = params.value.special_links[0].link;

                return `<a href="${special_links}" target="_blank"> ${special_links}</a>`;
              } else
              {
                return "N/A";
              }
            }
          } else
          {
            return "N/A"
          }
        },
        sortable: true,
        filter: true,
      },
      // { headerName: 'FB', field: 'fb', width: 100, cellRenderer:  (params)  =>{
      //   var fb
      //  return fb = params.value?params.value:'N/A'
      // }, sortable: true, filter: true },
      // { headerName: 'PR', field: 'pr', width: 100, cellRenderer:  (params)  =>{
      //   var pr
      //  return pr = params.value?params.value:'N/A'
      // }, sortable: true, filter: true },
      // { headerName: 'Max', field: 'max', width: 100, cellRenderer:  (params)  =>{
      //   var max
      //  return max = params.value?params.value:'N/A'
      // }, sortable: true, filter: true },
    ];
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      unSortIcon: true,
      // suppressCellSelection: true,
      enableColResize: true,
      // domLayout: 'autoHeight',
      rowSelection: "single",
      context: {},
    };
  }

  ngOnInit() {
    this.orderNo = this.router.snapshot.paramMap.get("orderNo");

    this.listAllGiveawayData();
  }

  rowData = [
    {
      make: "Toyota",
      model: "Celica",
      price: 35000,
      sortable: true,
      filter: true,
    },
    {
      make: "Ford",
      model: "Mondeo",
      price: 32000,
      sortable: true,
      filter: true,
    },
    {
      make: "Porsche",
      model: "Boxter",
      price: 72000,
      sortable: true,
      filter: true,
    },
  ];

  listAllGiveawayData() {
    // console.log("OrderNo@@@@@@@@@@@@@@@@@@@  ", this.orderNo)
    this.loader = true;
    let obj = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : "",
      order_no: this.orderNo,
      sort: this.sort,
    };
    console.log("Object : ", obj);
    this._adminServices.listAllGiveawayData(obj).subscribe((res: any) => {
      // console.log("listAllGiveawayData  ", res.data[0].amazon_orderId)
      console.log(res.data);
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok)
      {
        this.noRecordFound = false;
        this.giveawaysData = res.data;
        this.totalCount = res.total;
        console.log("total ccccc...", this.totalCount);
        if (this.giveawaysData.length == 0)
        {
          this.giveawaysData = [];
          this.noRecordFound = true;
        }
      } else if (res && res.code == genralConfig.statusCode.data_not_found)
      {
        this.noRecordFound = true;
        this.giveawaysData = [];
        // this.toastr.success(res.message);
      } else
      {
        this.toastr.error(res.message);
      }
    });
  }

  DisplayDialogue(data, keyword) {
    this.searchKeyword = keyword;
    this.displayDialogue = true;
  }

  closedilog() {
    this.displayDialogue = false;
  }

  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    console.log("Padination : page , count : ", this.page, this.count);
    this.listAllGiveawayData();
  }

  searchOrder(event) {
    console.log(" searchOrder  :  ", event.target.value);
    // this.orderNo = event.target.value;
    this.searchText = event.target.value;
    this.listAllGiveawayData();
  }

  getsortByStatus(event) {
    console.log("sort status is=====>", event.value);
    this.sort = event.value;
    this.listAllGiveawayData();
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
    if (item.label === "GW")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "GW"
      )[0];
    }
    if (item.label === "Launch No")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "Launch No"
      )[0];
    }
    if (item.label === "Product Name")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "Product Name"
      )[0];
    }
    if (item.label === "Brand")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "Brand"
      )[0];
    }
    if (item.label === "ASIN")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "ASIN"
      )[0];
    }
    if (item.label === "AMZ Link")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "AMZ Link"
      )[0];
    }
    if (item.label === "F Name")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "F Name"
      )[0];
    }
    if (item.label === "L Name")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "L Name"
      )[0];
    }
    if (item.label === "Member No")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "Member No"
      )[0];
    }
    if (item.label === "Tier")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "Tier"
      )[0];
    }
    if (item.label === "Order no")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "Order no"
      )[0];
    }
    if (item.label === "ORD?")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "ORD?"
      )[0];
    }
    if (item.label === "Amount")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "Amount"
      )[0];
    }
    if (item.label === "RMB?")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "RMB?"
      )[0];
    }
    if (item.label === "PP Email")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "PP Email"
      )[0];
    }
    if (item.label === "GW Date")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "GW Date"
      )[0];
    }
    if (item.label === "ORD Date")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "ORD Date"
      )[0];
    }
    if (item.label === "Target kw/link")
    {
      valueColumn = columns.filter(
        column => column.getColDef().headerName === "Target kw/link"
      )[0];
    }
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
    // this.gridOptions.api.sizeColumnsToFit();
    // this.customizedColumns = false
  }
}
