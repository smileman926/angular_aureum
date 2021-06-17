import { Component, OnInit, Inject } from '@angular/core';
import { NotificationServiceService } from '../../../core';
import { genralConfig } from '../../../core/constant/genral-config.constant';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipDialogDashboardComponent } from '../../../shared/tooltip-dialog-dashboard/tooltip-dialog-dashboard.component';
import { AdminServicesService } from '../../services/admin-services.service';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loader: boolean = false;
  OrdersCount: any;
  SellersCount: any;
  BuyersCount: any;
  ProductsCount: any;
  // payment is done
  constructor(
    private notificationService: NotificationServiceService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public _adminServices: AdminServicesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
     this.statsAnalysis();
    // this.buyersCount();
    // this.productCount();
    // this.sellersCount();
    // this.orderCount();
    this.getStatsCount();

    // createSocketIdForUser(userId) 
    //  this.notificationService.createSocketIdForUser(genralConfig.admin.ID); 
    //  this.notificationService.notifyUserForNewNotification(genralConfig.admin.ID); 
  }
  openDialog() {
    const dialogRef = this.dialog.open(TooltipDialogDashboardComponent, {
      width: '600px',
      height: '250px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  statsAnalysis() {
    this.loader = true;

    this._adminServices.statsAnalysis().subscribe((res: any) => {
      console.log("statsAnalysis  ", res)
      this.loader = false;
      // if (res && res.code == genralConfig.statusCode.ok) {
      // }
      // else if (res && res.code == genralConfig.statusCode.data_not_found) {
      //   this.toastr.success(res.message);
      // }
      // else {
      //   this.toastr.error(res.message);
      // }
    })
  }
  buyersCount() {

    this.loader = true;

    this._adminServices.getBuyersCount().subscribe((res: any) => {
      console.log("getBuyersCount  ", res)
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.BuyersCount = res.total;
      }
      else if (res && res.code == genralConfig.statusCode.data_not_found) {
        // this.toastr.success(res.message);
      }
      else {
        this.toastr.error(res.message);
      }
    })


  }
  productCount() {

    // this.loader = true;

    this._adminServices.getProductsCount().subscribe((res: any) => {
      console.log("getBuyersCount  ", res)
      // this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.ProductsCount = res.total;

      }
      else if (res && res.code == genralConfig.statusCode.data_not_found) {
        // this.toastr.success(res.message);
      }
      else {
        this.toastr.error(res.message);
      }
    })


  }
  sellersCount() {

    this.loader = true;

    this._adminServices.getSelersCount().subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.SellersCount = res.total;

      }
      else if (res && res.code == genralConfig.statusCode.data_not_found) {
        // this.toastr.success(res.message);
      }
      else {
        this.toastr.error(res.message);
      }
    })


  }
  orderCount() {

    // this.loader = true;

    this._adminServices.getOrdersCount().subscribe((res: any) => {
      console.log("getBuyersCount  ", res)
      // this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.OrdersCount = res.total;

      }
      else if (res && res.code == genralConfig.statusCode.data_not_found) {
        // this.toastr.success(res.message);
      }
      else {
        this.toastr.error(res.message);
      }
    })


  }
  getStatsCount() {
    this.loader = true;

    this._adminServices.getStatsCount().subscribe((res: any) => {
      console.log("statsAnalysis  ", res)
    
      if (res && res.code == genralConfig.statusCode.ok) {
        this.ProductsCount = res.data.productCount
        this.OrdersCount = res.data.orderCount
        this.SellersCount = res.data.sellerCount
        this.BuyersCount = res.data.buyerCount
        this.loader = false;
      }
      // else if (res && res.code == genralConfig.statusCode.data_not_found) {
       
      // }
      else {
        this.toastr.error(res.message);
        this.loader = false;
      }
    })
  }
}
