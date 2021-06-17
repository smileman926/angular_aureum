import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetpasswordRoutingModule } from './forgetpassword-routing.module';
import { ForgetpasswordComponent } from './forgetpassword.component';
import { ExpMaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetpasswordService } from './service/forgetpassword.service';


@NgModule({
  declarations: [ForgetpasswordComponent],
  imports: [
    CommonModule,
    ForgetpasswordRoutingModule,
    ExpMaterialModule,
    ReactiveFormsModule
  ],
  providers:[ForgetpasswordService]
})
export class ForgetpasswordModule { }
