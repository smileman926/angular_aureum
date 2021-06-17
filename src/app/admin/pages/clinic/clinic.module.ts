import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicRoutingModule } from './clinic-routing.module';
import { AddClinicComponent, ClinicViewComponent, ClinicComponent, ClinicListComponent, ClinicEditComponent } from '.';
import { ExpMaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddClinicComponent, ClinicViewComponent, ClinicComponent, ClinicListComponent, ClinicEditComponent],
  imports: [
    CommonModule,
    ClinicRoutingModule,
    ExpMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClinicModule { }
