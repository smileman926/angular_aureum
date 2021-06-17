import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpMaterialModule } from '../../../material.module';
import { AdminNotificationRoutingModule } from './adminnotification-routing.module';
import { AdminNotificationComponent, NotificationListComponent, NotificationViewComponent } from '.';



@NgModule({
  declarations: [AdminNotificationComponent, NotificationListComponent, NotificationViewComponent],
  imports: [
    CommonModule,
    AdminNotificationRoutingModule,
    ExpMaterialModule
  ],
  exports:[AdminNotificationComponent, NotificationListComponent, NotificationViewComponent]
})
export class AdminNotificationModule { }
