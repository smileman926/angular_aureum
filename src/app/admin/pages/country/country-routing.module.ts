import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent, CountryAddComponent, CountryListComponent, CountryEditComponent } from '.';


const routes: Routes = [
  {
    path: '', component: CountryComponent,
    children: [
      { path: '', redirectTo: 'country-list', pathMatch: 'prefix' },
      { path: 'country-add', component: CountryAddComponent },
      { path: 'country-list', component: CountryListComponent },
      { path: 'country-edit/:id', component: CountryEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
