import { Component, OnInit } from '@angular/core';
import { NotificationServiceService, GenralService } from '../../../core';
import { genralConfig } from '../../../core/constant/genral-config.constant';
import { MatDialog } from '@angular/material/dialog';
import { TooltipDialogDashboardComponent } from '../../../shared/tooltip-dialog-dashboard/tooltip-dialog-dashboard.component';
import { AdminServicesService } from '../../services/admin-services.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loader: boolean = false;
  OrdersCount: any;
  SellersCount: any;
  BuyersCount: any;
  ProductsCount: any;
  subAdminPermission: any;
  userRole: string;
  isSuperAdmin: Boolean = false;
  isLoaded: Boolean = false;

  constructor(
    private notificationService: NotificationServiceService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public _adminServices: AdminServicesService,
    private toastr: ToastrService,
    private _general_service: GenralService
  ) {}

  ngOnInit() {
    this.getUserDetails();
    this.subAdminPermission =
      this.activatedRoute.snapshot.data.userDetails.data;
    this.getStatsCount();
  }

  checkPermission(compare_text: string, menu: string) {
    if (this.userRole === 'subAdmin') {
      if (this.subAdminPermission) {
        if (menu == 'buyers') {
          if (
            this.subAdminPermission.buyers.filter(function (e) {
              return e.item_text === compare_text;
            }).length > 0
          ) {
            this.isLoaded = true;
            return true;
          } else return false;
        }
        if (menu == 'giveaways') {
          if (
            this.subAdminPermission.giveaways.filter(function (e) {
              return e.item_text === compare_text;
            }).length > 0
          ) {
            this.isLoaded = true;
            return true;
          } else return false;
        }
        if (menu == 'sellers') {
          if (
            this.subAdminPermission.sellers.filter(function (e) {
              return e.item_text === compare_text;
            }).length > 0
          ) {
            this.isLoaded = true;
            return true;
          } else return false;
        }
      }
    } else {
      return true;
    }
  }

  getUserDetails(): void {
    this._general_service.getUserDetails().subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        this.userRole =
          res.data && res.data.role_id ? res.data.role_id.role || '' : '';
        if (this.userRole === 'superAdmin') {
          this.isSuperAdmin = true;
        }
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(TooltipDialogDashboardComponent, {
      width: '600px',
      height: '250px',
      data: 'Do you confirm the deletion of this data?',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  getStatsCount() {
    this.loader = true;
    this._adminServices.getStatsCount().subscribe((res: any) => {
      if (res && res.code == genralConfig.statusCode.ok) {
        this.ProductsCount = res.data.productCount;
        this.OrdersCount = res.data.orderCount;
        this.SellersCount = res.data.sellerCount;
        this.BuyersCount = res.data.buyerCount;
        this.loader = false;
      } else {
        this.toastr.error(res.message);
        this.loader = false;
      }
    });
  }
}
