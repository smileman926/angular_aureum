import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClinicComponent, ClinicComponent, ClinicViewComponent, ClinicListComponent, ClinicEditComponent } from '.';


const routes: Routes = [
  {
    path: '', component: ClinicComponent,
    children: [
      { path: '', redirectTo: 'clinic-list', pathMatch: 'prefix' },
      { path: 'clinic-view/:id', component: ClinicViewComponent },
      { path: 'clinic-add', component: AddClinicComponent },
      { path: 'clinic-list', component: ClinicListComponent },
      { path: 'clinic-edit/:id', component: ClinicEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule { }
