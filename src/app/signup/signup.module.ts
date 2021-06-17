import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ExpMaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    ExpMaterialModule
  ]
})
export class SignupModule { }
