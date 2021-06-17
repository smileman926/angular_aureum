import { Component, OnInit } from '@angular/core';
import { NotificationServiceService, GenralService } from '../../../core';
import { HeaderService } from 'src/app/layout/components/header/service/header.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';
const path = environment.baseUrl + 'uploads/profile/'
@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.scss']
})
export class AdminsidebarComponent implements OnInit {
  counter: number = 0;
  loggedInUserDetails: any;
  username: any;
  userRole: any;
  subAdminPermission: any;
  subscriptionname: Subscription;
  subscriptionimage: Subscription;
  image: any;
  displaySellerDB: Boolean = false
  displayStaff: Boolean = false
  constructor(
    private notificationService: NotificationServiceService,
    private _headerService: HeaderService,
    private _general_service: GenralService
  ) { }

  ngOnInit() {
    this._general_service.getSubAdminPermission().subscribe(res => {
      if (res.code == genralConfig.statusCode.ok) {
        this.subAdminPermission = res.data;
      }
    });
    this._general_service.getUserDetails().subscribe(res => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loggedInUserDetails = res.data;
        this.getUserImage(this.loggedInUserDetails.profile_image)


        this.userRole = this.loggedInUserDetails && this.loggedInUserDetails.role_id ? this.loggedInUserDetails.role_id.role || '' : '';
        if (this.userRole === 'superAdmin') {
          this.displaySellerDB = true;
          this.displayStaff = true;
        } else if (this.userRole === 'subAdmin') {
          this.displaySellerDB = true;
        } else {
          this.displaySellerDB = false;
          this.displayStaff = false;
        }
        const dynamicScripts = '../../../../assets/js/sidebar.js';
        const node = document.createElement('script');
        node.src = dynamicScripts;
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
        node.onload = function () {
        }
      }
    })
    // this.notificationService.getNotified().subscribe((res: any) => {
    //   if (res && res.status) {
    //     this.counter++
    //   }
    // });
    this.subscriptionname = this._headerService.username.subscribe(username => {
      this.username = username
    })

    this.subscriptionimage = this._headerService.image.subscribe(url => {
      // this.image = path + url;
      this.getUserImage(url)

    });
  };

  getUserImage(url: string) {
    this._general_service.getImageLink(url).subscribe(res => {
      if (res.code == genralConfig.statusCode.ok) {
        console.log('This link from api is =====>', JSON.stringify(res))
        this.image = res;
      }
      else {
        this.image = res
      }
    })
  }

  checkPermission(compare_text: string, menu: string) {
    if (this.userRole === 'subAdmin') {
      if (menu == "buyers") {
        if (this.subAdminPermission.buyers.filter(function (e) { return e.item_text === compare_text; }).length > 0) {
          return true;
        }
        else
          return false;
      }
      if (menu == "giveaways") {
        if (this.subAdminPermission.giveaways.filter(function (e) { return e.item_text === compare_text; }).length > 0) {
          return true;
        }
        else
          return false;
      }
      if (menu == "sellers") {
        if (this.subAdminPermission.sellers.filter(function (e) { return e.item_text === compare_text; }).length > 0) {
          return true;
        }
        else
          return false;
      }

    }

    {
      return true;
    }
  }


  ngAfterViewInit() {
    // const dynamicScripts = '../../../../assets/js/sidebar.js';
    // const node = document.createElement('script');
    // node.src = dynamicScripts;
    // node.type = 'text/javascript';
    // node.async = false;
    // node.charset = 'utf-8';
    // document.getElementsByTagName('head')[0].appendChild(node);
    // node.onload = function () {
    // console.log('above external js library code executed');
    // }
  }
}
