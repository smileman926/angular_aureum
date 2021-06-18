import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { GridOptions } from '@ag-grid-community/all-modules';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';

import { genralConfig } from 'src/app/core/constant/genral-config.constant';
import { AdminServicesService } from '../../services/admin-services.service';
import { RequestObjectInterface } from '../../shared/models/RequestObject.model';
import { IRowData } from '../../shared/models/IRowData.model';
import { ViewOrderHistoryButtonRenderer } from './renderers/view-order-history-button-renderer.component';

@Component({
  selector: 'app-orders-database',
  templateUrl: './orders-database.component.html',
  styleUrls: ['./orders-database.component.scss'],
})
export class OrdersDatabaseComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public columnDefs: any[];

  columnsData = [
    { label: 'Date', checked: true },
    { label: 'First Name', checked: true },
    { label: 'Last Name', checked: true },
    { label: 'Member No.', checked: true },
    { label: 'Email', checked: true },
    { label: 'Launch No.', checked: true },
    { label: 'Order No.', checked: true },
    { label: 'Amount', checked: true },
    { label: 'Status', checked: true },
  ];
  frameworkComponents: any;
  count: number = genralConfig.paginator.COUNT;
  totalCount: number = 20;
  loader: boolean = false;
  page: number = genralConfig.paginator.PAGE;
  ordersData = [];
  sort: string;
  sortOrder: number;
  searchText: string;
  customizedColumns: boolean = false;

  constructor(
    private adminService: AdminServicesService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.initializeForm();
    this.rowData = [];
    this.listAllOrders();

    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      unSortIcon: true,
      enableColResize: true,
      rowSelection: 'single',
      context: {},
    };
  }

  ngOnInit(): void {}

  initializeForm(): void {
    this.frameworkComponents = {
      viewOrderHistoryButtonRenderer: ViewOrderHistoryButtonRenderer,
    };
    this.columnDefs = [
      {
        headerName: 'Date',
        field: 'purchase_date',

        cellRenderer: (params) => {
          var launchData;
          return (launchData = params.value
            ? moment(params.value).format('LL')
            : 'N/A');
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'First Name',
        field: 'firstName',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Last Name',
        field: 'lastName',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Member No',
        field: 'memberNumber',

        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Email',
        field: 'email',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Launch No.',
        field: 'launch_number',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Order No.',
        field: 'order_number',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Product ASIN',
        field: 'asin',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Amount',
        field: 'amount',
        cellRenderer: (params) => {
          return !Number.isNaN(params.value) ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Status',
        field: 'order_status',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Order history',
        cellRenderer: 'viewOrderHistoryButtonRenderer',
        cellRendererParams: {
          onClick: this.buttonHandler.bind(this),
          label: 'Click 1',
        },
        sortable: false,
        filter: false,
      },
    ];
  }

  buttonHandler(data): void {
    const rowData = data.rowData;
    if (data.event.target.textContent === 'preview') {
      console.log('editiiiing');
      this.router.navigate(['/layout/admin/order-history/' + rowData._id]);
    }
  }

  listAllOrders(): void {
    this.loader = true;
    const reuestOrderObj: RequestObjectInterface = {
      page: this.page,
      count: this.count,
      searchText: this.searchText ? this.searchText : '',
      sort: this.sort ? this.sort : null,
      sortBy: this.sortOrder ? this.sortOrder : null,
    };
    this.adminService.getAllOrders(reuestOrderObj).subscribe((res) => {
      if (res.status === genralConfig.statusCode.ok) {
        this.ordersData = res.data;
        this.totalCount = res.total;
        this.loader = false;
        //this.toastr.success(res.message);
      } else {
        this.ordersData = [];
        this.loader = false;
        this.toastr.error(res.message);
      }
    });
    this.loader = false;
  }

  //Export all orders from data base.
  exportArray(mode: string): void { 
    const reuestOrderObj: RequestObjectInterface = {
      page: this.page,
      count: mode === 'currentPage' ? this.count : this.totalCount,
      searchText: this.searchText ? this.searchText : '',
      sort: this.sort ? this.sort : null,
      sortBy: this.sortOrder ? this.sortOrder : null,
    };
    this.adminService.getXSLXOrders(reuestOrderObj).subscribe((result) => {
      const blob = new Blob([result], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'orders.xlsx');
    });
  }

  onChange(event, index, item): void {
    const columns = this.gridOptions.columnApi.getAllColumns();
    let valueColumn;
    if (item.label === 'Date') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Date'
      )[0];
    }
    if (item.label === 'First Name') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'First Name'
      )[0];
    }
    if (item.label === 'Last Name') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Last Name'
      )[0];
    }

    if (item.label === 'Member No.') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Member No.'
      )[0];
    }
    if (item.label === 'Email') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Email'
      )[0];
    }
    if (item.label === 'Launch No.') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Launch No.'
      )[0];
    }
    if (item.label === 'Order No.') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Order No.'
      )[0];
    }
    if (item.label === 'Amount') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Amount'
      )[0];
    }
    if (item.label === 'Status') {
      valueColumn = columns.filter(
        (column) => column.getColDef().headerName === 'Status'
      )[0];
    }
    const newState = !valueColumn.isVisible();
    this.gridOptions.columnApi.setColumnVisible(valueColumn, newState);
  }

  sortByFun(value, order): void {
    this.sort = value;
    this.sortOrder = order;
    this.listAllOrders();
  }

  paginate(event): void {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listAllOrders();
  }

  searchOrder(event): void {
    this.searchText = event.target.value;
    this.listAllOrders();
  }

  displayDialog(): void {
    this.customizedColumns = true;
  }

  closeViewdilog(): void {
    this.customizedColumns = false;
  }
}
