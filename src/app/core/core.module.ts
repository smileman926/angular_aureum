import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenralService, NotificationServiceService } from '.';
import { ProfileViewComponent } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpMaterialModule } from '../material.module';
import { LoginService } from '../login/service/login.service';
import { ChangepasswordComponent } from 'src/app/core/components/changepassword/changepassword.component';
import { SafePipe, CapitalizePipe, TruncatePipe, TzDatePipe, StringifyNumPipe, ReversePipe, PricePipe, FeedDayPipe, FeedTimePipe, FeedMonthPipe, TrustVideoUrl, TrustVideoUrlaz, FeedTimeDetailPipe } from '../core/pipes/index';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component'
// import { } from '../core/pipes';
@NgModule({
  declarations: [
    ChangepasswordComponent,
    ProfileViewComponent,
    SafePipe, CapitalizePipe, TruncatePipe,
    TzDatePipe, StringifyNumPipe, ReversePipe, PricePipe, FeedDayPipe, FeedTimePipe, FeedMonthPipe, TrustVideoUrl, TrustVideoUrlaz, FeedTimeDetailPipe, PagenotfoundComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExpMaterialModule,
  ],
  exports: [
    ChangepasswordComponent,
    ProfileViewComponent,
    TruncatePipe,
    SafePipe, CapitalizePipe
  ],
  providers: [LoginService, GenralService]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: GenralService },
        // {provide: NotificationServiceService}
      ]
    };
  }
}
// {provide: RoleGuardService},
// {provide:AuthService},
// {provide:JwtHelperService},
// {provide:AuthGuardService}