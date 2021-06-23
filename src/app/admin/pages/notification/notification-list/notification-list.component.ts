import { Component, OnInit } from '@angular/core';
import { genralConfig } from '../../../../core/constant/genral-config.constant';
import { NotificationServiceService } from '../../../../core';
import { ToastrService } from 'ngx-toastr';
import { GridOptions } from 'ag-grid-community';
import { IRowData } from 'src/app/admin/shared/models/IRowData.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  public gridOptions: GridOptions;
  public rowData: IRowData[];
  public defaultColDef;

  frameworkComponents: any;

  columnsData = [
    { label: 'Content', checked: true },
    { label: 'Is Read', checked: true },
    { label: 'Created At', checked: true }
  ];

  buyersData = [];
  buyersStatuses: any[] = [];
  totalCount = 0;
  count: any = genralConfig.paginator.COUNT;
  page = genralConfig.paginator.PAGE;
  noRecordFound = false;
  loader = false;

  sort: any;
  public isSorting = false;
  public sortColumn: string;
  public firstcol = 0;
  public secondcol = 0;
  public sortingOrder: string;

  sortOrder: any;
  sortBy: any = {
  };

  public userStatus: string;

  public columnDefs = [];
  constructor(
    private notificationService : NotificationServiceService,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
    this.initializeCols();
    this.listNotification();
    
  }
  initializeCols(): void {
    this.columnDefs = [
      {
        headerName: 'Content',
        field: 'content',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      },
      {
        headerName: 'Is Read',
        field: 'isRead',
        cellRenderer: (params) => {
          return params.value ? "Yes" : 'No';
        },
      },
      {
        headerName: 'Created At',
        field: 'createdAt',
        cellRenderer: (params) => {
          return params.value ? params.value : 'N/A';
        },
      }
    ];
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  };

  listNotification(){
    this.loader = true;
    const obj = {
      page: this.page,
      count: this.count,
      sort: this.sort,
      sortBy: this.sortOrder,
      status: this.userStatus
    };

    this.notificationService.notificationList(obj).subscribe((res: any) => {
      this.loader = false;

      let errorMessage: string = null;
      if (res) {
        if (res.code === genralConfig.statusCode.ok) {
          //this.toastr.success(res.message);
          console.log(res.total);
          this.buyersData = res.data || [];
          this.totalCount = (res.total && res.total.total) || 0;
        }

        this.noRecordFound =
          res.code === genralConfig.statusCode.data_not_found ||
          this.totalCount <= 0;

        if (
          res.code !== genralConfig.statusCode.ok &&
          res.code !== genralConfig.statusCode.data_not_found
        ) {
          errorMessage = res.message || res.code + ' Error occured';
        }
      } else {
        errorMessage = 'Something went wrong!';
        this.noRecordFound = true;
      }

      if (errorMessage) {
        this.toastr.error(errorMessage);
      }

      if (this.noRecordFound) {
        this.buyersData = [];
        this.totalCount = 0;
      }
    });
  }
  paginate(event) {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.listNotification();
  }

}
