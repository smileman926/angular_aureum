import { BrowserModule, HammerLoader, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpMaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebStorage } from './core/web.storage';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { GenralService, NotificationServiceService, AuthGuardService, AuthService, RoleGuardService } from './core';
import { JwtHelperService, JwtModuleOptions, JwtModule } from '@auth0/angular-jwt';
import { CreatepasswordComponent } from './createpassword/createpassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetpasswordService } from './forgetpassword/service/forgetpassword.service';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { TooltipDialogDashboardComponent } from './shared/tooltip-dialog-dashboard/tooltip-dialog-dashboard.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { BlockUIModule } from 'ng-block-ui';
import { NgxLoadingModule } from 'ngx-loading';
import { MatTableModule } from '@angular/material/table';
import { DragDropFileUploadDirective } from './shared/drag-drop-file-upload/drag-drop-file-upload.directive';
import { GestureConfig } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';



let token: string = "";
export function jwtTokenGetter() {
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    CreatepasswordComponent,
    ConfirmationDialogComponent,
    TooltipDialogDashboardComponent,
    EmailVerificationComponent,
    DragDropFileUploadDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    ExpMaterialModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    CoreModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectInfiniteScrollModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
    ReactiveFormsModule,
    BlockUIModule,
    BlockUIModule.forRoot(),
    AgGridModule.forRoot()



  ],
  entryComponents: [
    ConfirmationDialogComponent,
    TooltipDialogDashboardComponent
  ],
  providers: [
    WebStorage, GenralService, NotificationServiceService, AuthGuardService, AuthService, JwtHelperService, RoleGuardService, ForgetpasswordService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HammerGestureConfig, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule {
  constructor(public _webStorage: WebStorage) {
    token = this._webStorage.get('token');
  }
}
