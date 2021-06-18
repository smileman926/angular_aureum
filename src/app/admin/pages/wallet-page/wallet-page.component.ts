import { Component, OnInit } from "@angular/core";
// services
import { AdminServicesService } from "../../services/admin-services.service";
// constats
import { genralConfig } from "src/app/core/constant/genral-config.constant";
// interfaces
import { IWallet, IWalletHistory } from "./wallet.interface";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-wallet-page",
  templateUrl: "./wallet-page.component.html",
  styleUrls: ["./wallet-page.component.scss"],
})
export class WalletPageComponent implements OnInit {
  paymentOperatorMap = {
    dwolla: '/assets/img/symbols.svg',
    paypal: '/assets/img/paypal.svg',
  };
  displayedColumns = [
    "operation_name",
    "operation_datetime",
    "operation_status",
    "balance_change",
    "payment_method",
  ];
  isPending: boolean = false;
  seller_id: "";
  wallet: IWallet;
  history: IWalletHistory[];

  loader = false;
  totalCount: number;
  count = genralConfig.paginator.COUNT;
  page = genralConfig.paginator.PAGE;

  constructor(
    private walletService: AdminServicesService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.seller_id = params["seller_id"];
    });
  }

  ngOnInit() {
    this.getWallet();
    this.getWalletHistory();
  }

  getWallet(): void {
    this.walletService.getWallet(this.seller_id).subscribe(
      (res) => {
        this.wallet = res.wallet;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getWalletHistory(): void {
    this.loader = true;

    const params = {
      page: this.page,
      count: this.count,
    };

    this.walletService.getWalletHistory(this.seller_id, params).subscribe(
      (res) => {
        this.history = res.history;
        this.totalCount = res.pagination.totalCount;
        this.count = res.pagination.count;
        this.page = res.pagination.page;

        this.loader = false;
      },
      (err) => {
        this.loader = false;
        console.log(err);
      }
    );
  }


  paginate(event): void {
    this.page = event.pageIndex + 1;
    this.count = event.pageSize;
    this.getWalletHistory();
  }
}
