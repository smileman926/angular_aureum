import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateComponent, StateAddComponent, StateEditComponent, StateListComponent } from '.';
import { ExpMaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StateComponent, StateAddComponent, StateEditComponent, StateListComponent],
  imports: [
    CommonModule,
    StateRoutingModule,
    ExpMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StateModule { }
