import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateComponent, StateAddComponent, StateListComponent, StateEditComponent } from '.';


const routes: Routes = [{
  path: '', component: StateComponent,
  children: [
    { path: '', redirectTo: 'state-list', pathMatch: 'prefix' },
    { path: 'state-add', component: StateAddComponent },
    { path: 'state-list', component: StateListComponent },
    { path: 'state-edit/:id', component: StateEditComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
