import { Component, OnInit } from '@angular/core';
import { genralConfig } from '../../../../core/constant/genral-config.constant';
import { NotificationServiceService } from '../../../../core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notificationData:any=[];
  displayedColumns=['notification','action'];
  rejectPopupCondition : boolean = false;
  displayActions : boolean = false;
  acceptToolTip : any = genralConfig.admin_notification_tooltip_messages.ACCEPT;
  rejectToolTip : any = genralConfig.admin_notification_tooltip_messages.REJECT;
  loader : boolean = false;

  constructor(
    private notificationService : NotificationServiceService,
    private toastr : ToastrService
  ) { }

  ngOnInit() {
  
    this.listNotification();
    
  }

  listNotification(){
    this.loader = true;
    let notificationListObject = {
      receiver_id : genralConfig.admin.ID,
      roleId : genralConfig.roleId.ADMIN
    }
    this.notificationService.notificationList(notificationListObject).subscribe((res:any)=>{
      this.loader = false;
      if(res.code ==200){
        if(!res.data.length){
          this.displayActions = true;
          res.data.push({message : 'No record found'});
        }
        this.notificationData = res.data;
      }
      else{
      }
    })
  }

  acceptRequest(){
    this.loader = true;
    let obj ={
      notification_id : this.notificationData[0]._id,
      sender_id : this.notificationData[0].sender,
      readers_id : genralConfig.admin.ID,
      role_id : genralConfig.roleId.ADMIN
    }
    this.notificationService.acceptOrRejectRequest(obj).subscribe((res:any)=>{
      this.loader = false;
      if(res.code==200){
        this.toastr.success(res.message);
        this.listNotification();
      }
      else{
      }
    })

  }

  rejectPopup(){
    this.rejectPopupCondition = true
  }


}
