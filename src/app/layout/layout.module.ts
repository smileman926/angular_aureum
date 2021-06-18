import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ExpMaterialModule } from '../material.module';
import { HeaderService } from './components/header/service/header.service';
import { AdminheaderComponent } from './components/adminheader/adminheader.component';
import { AdminModule } from '../admin/admin.module';
//
@NgModule({
  declarations: [LayoutComponent, AdminheaderComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ExpMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    FileUploadModule,
    AdminModule,
  ],
  providers: [HeaderService],
})
export class LayoutModule {}
