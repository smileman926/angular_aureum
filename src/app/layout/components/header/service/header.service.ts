import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { WebStorage } from '../../../../core/web.storage';
import { GenralService } from 'src/app/core';
import { genralConfig } from 'src/app/core/constant/genral-config.constant';

@Injectable()
export class HeaderService implements OnInit {
  loggedInUserDetails: any;
  imageProfile: any;
  profileName: any;
  token: any;
  ngOnInit(): void { }
  constructor(private _webStorage: WebStorage, private _general_service: GenralService) {
    // this.loggedInUserDetails = this._webStorage.get('all');
    this._general_service.getUserDetails().subscribe(res => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loggedInUserDetails = res.data
        console.log("login user info", this.loggedInUserDetails)

      }
    })
  }

  public image = new BehaviorSubject(this.getLoggedInUserImage())
  public username = new BehaviorSubject(this.getLoggedInUserName());
  public notificationCount = new ReplaySubject<number>();
  public notificationList = new ReplaySubject<Array<Object>>();
  public UnReadNotificationList = new ReplaySubject<Array<Object>>();
  setTitle(username) {
    this.username.next(username);
  }

  setImage(url) {
    this.image.next(url);
  }
  setNotificationCount(count) {
    this.notificationCount.next(count);
  }
  setNotificationList(list) {
    this.notificationList.next(list);
  }

  getNotificationList() {
    return this.notificationList.asObservable();
  }

  setUnReadNotificationList(list) {
    this.UnReadNotificationList.next(list);
  }

  getUnReadNotificationList() {
    return this.UnReadNotificationList.asObservable();
  }

  getNotificationCount() {
    return this.notificationCount.asObservable();
  }

  unsubscribeFunc() {
    this.image = new BehaviorSubject('');
    this.username = new BehaviorSubject('');
  }



  getLoggedInUserImage() {
    // this.loggedInUserDetails = this._webStorage.get('all');
    console.log('This logged in users details is ====>', this.loggedInUserDetails)

    if (this.loggedInUserDetails) {
      return this.imageProfile = this.loggedInUserDetails.profile_image ? this.loggedInUserDetails.profile_image : ""
    }
  }
  getLoggedInUserName() {
    // this.loggedInUserDetails = this._webStorage.get('all');
    if (this.loggedInUserDetails) {
      return this.profileName = this.loggedInUserDetails ? this.loggedInUserDetails.firstname + ' ' + this.loggedInUserDetails.lastname : ""
    }
  }



}