import { Component, OnInit, Input } from '@angular/core';
import { GenralService } from '../core';
import { genralConfig } from '../core/constant/genral-config.constant';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input() isRender: boolean;
  loggedInUserDetails: any;
  isAdmin: boolean = false;


  constructor(
    private _general_service: GenralService) { }

  ngOnInit() {
    // showHideSidebar: Boolean = false;
    // HideShowSidebar() {
    //   this.showHideSidebar = !this.showHideSidebar;
    // }loggedInUserDetails
    this._general_service.getUserDetails().subscribe(res => {
      if (res.code === genralConfig.statusCode.ok) {
        this.loggedInUserDetails = res.data;
        console.log("login user info", this.loggedInUserDetails);
        const userRole = this.loggedInUserDetails && this.loggedInUserDetails.role_id ? this.loggedInUserDetails.role_id.role || '' :  '';
        if ((userRole === 'admin') || (userRole === 'subAdmin') || (userRole === 'superAdmin')) {
          this.isAdmin = true;
          console.log('admin role trueeeee');
        } else {
          this.isAdmin = false;
          console.log('admin false');
        }
      }
    });
  }
}
