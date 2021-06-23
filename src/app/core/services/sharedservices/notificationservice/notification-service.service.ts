import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

import { ApiUrlConstant } from '../../../constant/api-url.constant';
@Injectable({
  providedIn: 'root',
})
export class NotificationServiceService {
  socket;
  constructor(private http: HttpClient) {}

  notificationList(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.USER_NOTIFICATION_LIST, data);
  }

  acceptOrRejectRequest(data: any): Rx.Observable<any> {
    return this.http.post(ApiUrlConstant.ACCEPTORREJECTREQUEST, data);
  }

  createSocketIdForUser(userId) {
    this.socket.emit('create-socket-user', { user_id: userId });
  }

  notifyUserForNewNotification(userId) {
    this.socket.emit('notify-user-for-new-notification', { user_id: userId });
  }

  // createSocketIdForUser = () => {
  // return Rx.Observable.create((observer) => {
  //     this.socket.on('create-socket-user', (message) => {
  //         observer.next(message);
  //     });
  // });
  // }

  getNotified(): Rx.Observable<any> {
    return Rx.Observable.create((observer) => {
      this.socket.on('get-notified', (message) => {
        observer.next(message);
      });
    });
  }
}
