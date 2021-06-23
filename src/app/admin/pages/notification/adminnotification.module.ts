import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpMaterialModule } from '../../../material.module';
import { AdminNotificationRoutingModule } from './adminnotification-routing.module';
import { AdminNotificationComponent, NotificationListComponent, NotificationViewComponent } from '.';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AdminNotificationComponent, NotificationListComponent, NotificationViewComponent],
  imports: [
    CommonModule,
    AdminNotificationRoutingModule,
    ExpMaterialModule,
    AgGridModule
  ],
  exports:[AdminNotificationComponent, NotificationListComponent, NotificationViewComponent]
})
export class AdminNotificationModule { }
