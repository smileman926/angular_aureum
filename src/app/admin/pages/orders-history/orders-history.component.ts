import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GridOptions } from '@ag-grid-community/all-modules';

import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { AdminServicesService } from '../../services/admin-services.service';
import { RequestObjectInterface } from '../../shared/models/RequestObject.model';
import { IRowData } from '../../shared/models/IRowData.model';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss'],
})
export class OrdersHistoryComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public columnDefs: any[];

  columnsData = [
    { label: 'Date', checked: true },
    { label: 'Order Action', checked: true },
    { label: 'Order Status', checked: true },
    { label: 'Rebate Balance Change', checked: true },
    { label: 'Payable Balance Change', checked: true },
  ];

  count: number = genralConfig.paginator.COUNT;
  totalCount: number = 20;
  loader: boolean = false;
  page: number = genralConfig.paginator.PAGE;
  ordersData = [];
  orderId: string = '';
  sort: string;
  sortOrder: number;
  searchText: string;
  customizedColumns: boolean = false;

  constructor(
    private adminService: AdminServicesService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('order_id');
    this.initializeForm();
  }

  initializeForm(): void {
    this.columnDefs = [
      {
        headerName: 'Date',
        field: 'date',
        cellRenderer: (params) => {
          var launchData;
          return (launchData = params.value
            ? moment(params.value).format('LL')
            : 'N/A');
        },
      },
      {
        headerName: 'Order Action',
        field: 'action',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Order Status',
        field: 'orderStatus',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Rebate Balance Change',
        field: 'rebateBalanceChange',

        cellRenderer: (params) => {
          return params.value ? params.value : 0;
        },
      },
      {
        headerName: 'Payable Balance Change',
        field: 'payableBalanceChange',
        cellRenderer: (params) => {
          return params.value ? params.value : 0;
        },
      },
    ];

    this.listAllOrderHistory();
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      unSortIcon: true,
      enableColResize: true,
      rowSelection: 'single',
      context: {},
    };
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    let valueColumn;
    if (item.label === 'Date') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Date'
      )[0];
    }
    if (item.label === 'Order Action') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Order Action'
      )[0];
    }
    if (item.label === 'Order Status') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Order Status'
      )[0];
    }

    if (item.label === 'Rebate Balance Change') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Rebate Balance Change'
      )[0];
    }
    if (item.label === 'Payable Balance Change') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Payable Balance Change'
      )[0];
    }
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
  }

  listAllOrderHistory(): void {
    this.loader = true;
    const reuestOrderObj: RequestObjectInterface = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : '',
      sort: this.sort ? this.sort : null,
      sortBy: this.sortOrder ? this.sortOrder : null,
    };
    this.adminService
      .getAllOrderHistory(reuestOrderObj, this.orderId)
      .subscribe((res) => {
        if (res.status === genralConfig.statusCode.ok) {
          this.ordersData = res.data;
          this.totalCount = res.total;
          this.loader = false;
          this.toastr.success(res.message);
        } else {
          this.ordersData = [];
          this.loader = false;
          this.toastr.error(res.message);
        }
      });
    this.loader = false;
  }

  exportArray(): void {
    const reuestOrderObj: RequestObjectInterface = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : '',
      sort: this.sort ? this.sort : null,
      sortBy: this.sortOrder ? this.sortOrder : null,
    };
    this.adminService
      .getXLSXOrderHistory(reuestOrderObj, this.orderId)
      .subscribe((result) => {
        const blob = new Blob([result], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        FileSaver.saveAs(blob, 'orders.xls');
      });
  }

  displayDialog(): void {
    this.customizedColumns = true;
  }

  closeViewdilog(): void {
    this.customizedColumns = false;
  }

  paginate(event): void {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listAllOrderHistory();
  }
}
