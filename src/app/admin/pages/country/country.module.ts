import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent, CountryAddComponent, CountryListComponent, CountryEditComponent} from '.';
import { ExpMaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CountryComponent, CountryAddComponent, CountryListComponent, CountryEditComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ExpMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CountryModule { }
