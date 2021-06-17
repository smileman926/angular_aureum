import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { from } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpMaterialModule } from '../material.module';
import { HeaderService } from '../layout/components/header/service/header.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ExpMaterialModule,
    ReactiveFormsModule,
  
  ],
  providers:[HeaderService]
})
export class LoginModule { }
