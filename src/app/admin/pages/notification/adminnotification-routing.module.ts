import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminNotificationComponent ,NotificationViewComponent, NotificationListComponent} from '.';


const routes: Routes = [
  {   path: '', component: AdminNotificationComponent,
      children :[
          { path: '', redirectTo: 'notify-list', pathMatch: 'prefix' },
          { path: 'notify-view', component: NotificationViewComponent },
          { path: 'notify-list', component: NotificationListComponent}
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminNotificationRoutingModule { }
