import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/behaviorSubject';  
// import {Observer} from 'rxjs/Observer';
// import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  socket;
  constructor() { 
    // this.socket=io('http://localhost:8001');     
  }


}
