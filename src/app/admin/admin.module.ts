import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { A11yModule } from '@angular/cdk/a11y';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';

import {
  DashboardComponent,
  AdminComponent,
  AdminsidebarComponent,
} from './pages';
import { AdminRoutingModule } from './admin-routing.module';
import { NotificationServiceService } from '../core';
import { ExpMaterialModule } from '../material.module';
import { UserComponent } from './pages/user/user.component';
import { ListbuyersComponent } from './pages/listbuyers/listbuyers.component';
import { FaqComponent } from './pages/faq/faq.component';
import { DialogModule } from 'primeng/dialog';
import { ListTestimonialComponent } from './pages/list-testimonial/list-testimonial.component';
import { ListsellersComponent } from './pages/listsellers/listsellers.component';
import { CoreModule } from '../core/core.module';
import { GiveawaysdbComponent } from './pages/giveawaysdb/giveawaysdb.component';
import { SetuptrackerComponent } from './pages/setuptracker/setuptracker.component';
import { ReimbursementComponent } from './pages/reimbursement/reimbursement.component';
import { OpenModalDetailComponent } from './pages/reimbursement/open-modal-detail.component';
import {
  MatTableExporterModule,
  CdkTableExporterModule,
} from 'mat-table-exporter';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { RouterLinkComponent } from './pages/giveawaysdb/routerlinkorder.component';
import { ButtonRendererComponent } from './pages/setuptracker/renderers/button-renderer.component';
import { QuestionButtonRendererComponent } from './pages/setuptracker/renderers/question-button-renderer.component';
import { AdminAccountDetailsComponent } from './pages/admin-account-details/admin-account-details.component';
import { ListDealsComponent } from './pages/list-deals/list-deals.component';
import { ListInstructionsComponent } from './pages/list-instructions/list-instructions.component';
import { PendindLaunchButtonComponent } from './pages/setuptracker/renderers/pendinglaunchbutton.component';
import { AddStaffComponent } from './pages/add-staff/add-staff.component';
import { StaffCreateUpdateComponent } from './pages/add-staff/staff-create-update/staff-create-update.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditUserLoginDialogComponent } from './shared/edit-user-login-dialog/edit-user-login-dialog.component';
import { SpecialDealComponent } from './pages/special-deal/special-deal.component';
import { SetupBonuscodeComponent } from './pages/setup-bonuscode/setup-bonuscode.component';
import { BonusCodeCreateUpdateComponent } from './pages/setup-bonuscode/bonus-code-create-update/bonus-code-create-update.component';
import { ReferalsComponent } from './pages/referals/referals.component';
import { EditUserSubscriptionDialogComponent } from './shared/edit-user-subscription-dialog/edit-user-subscription-dialog.component';
import { OrdersDatabaseComponent } from './pages/orders-database/orders-database.component';
import { CreateQuestionnaireComponent } from './pages/setuptracker/create-questionnaire/create-questionnaire.component';
import { QuestionItemComponent } from './pages/setuptracker/create-questionnaire/question-item/question-item.component';
import { CreateQuestionComponent } from './pages/setuptracker/create-questionnaire/create-question/create-question.component';
import { DeleteButtonRendererComponent } from './pages/list-deals/delete-button-renderer.component';
import { DeleteBonusButtonRendererComponent } from './pages/setup-bonuscode/delete-bonus-button-renderer.component';
import { EditSellerButtonRendererComponent } from './pages/listsellers/edit-seller-button-renderer.component';
import { EditDeleteBuyerButtonRendererComponent } from './pages/listbuyers/edit-delete-buyer-button-renderer.component';
import { ChangeBuyerStatusRendererComponent } from './pages/listbuyers/change-buyer-status-renderer.component';
import { InstructionActionsButtonsRendrerComponent } from './pages/list-instructions/instructions-actions-buttons-renderer.component';
import { TestimonialActionsButtonsRendrerComponent } from './pages/list-testimonial/testimonial-actions-buttons-renderer.component';
import { ChangeDealCategoryRendererComponent } from './pages/list-deals/change-deal-category-renderer.component';
import { StaffActionButtonsRendererComponent } from './pages/add-staff/staff-action-buttons-renderer.component';
import { UserDetailsResolve } from './pages/dashboard/user-resolver.component';
import { ChangeTierRendererComponent } from './pages/listbuyers/change-tier-renderer.component';
import { EditDeleteLaunchButtonsRendererComponent } from './pages/setuptracker/renderers/edit-delete-launch-button-renderer.component';
import { GoToWalletButtonComponent } from './pages/setuptracker/renderers/go-to-wallet.component';
import { EditProductLaunchByAdminComponent } from './pages/edit-product-launch-by-admin/edit-product-launch-by-admin.component';
import { WalletPageComponent } from './pages/wallet-page/wallet-page.component';
import { OrdersHistoryComponent } from './pages/orders-history/orders-history.component';
import { ViewOrderHistoryButtonRenderer } from './pages/orders-database/renderers/view-order-history-button-renderer.component';
import { AdminNotificationModule } from './pages/notification/adminnotification.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    AdminsidebarComponent,
    UserComponent,
    ListbuyersComponent,
    FaqComponent,
    ListTestimonialComponent,
    ListsellersComponent,
    GiveawaysdbComponent,
    SetuptrackerComponent,
    ReimbursementComponent,
    OpenModalDetailComponent,
    SubscriptionComponent,
    RouterLinkComponent,
    ButtonRendererComponent,
    DeleteButtonRendererComponent,
    EditDeleteLaunchButtonsRendererComponent,
    GoToWalletButtonComponent,
    DeleteBonusButtonRendererComponent,
    EditSellerButtonRendererComponent,
    EditDeleteBuyerButtonRendererComponent,
    ChangeBuyerStatusRendererComponent,
    InstructionActionsButtonsRendrerComponent,
    TestimonialActionsButtonsRendrerComponent,
    QuestionButtonRendererComponent,
    PendindLaunchButtonComponent,
    AdminAccountDetailsComponent,
    ListDealsComponent,
    ListInstructionsComponent,
    AddStaffComponent,
    StaffCreateUpdateComponent,
    EditUserLoginDialogComponent,
    OrdersDatabaseComponent,
    OrdersHistoryComponent,
    SpecialDealComponent,
    SetupBonuscodeComponent,
    BonusCodeCreateUpdateComponent,
    StaffActionButtonsRendererComponent,
    ReferalsComponent,
    EditUserSubscriptionDialogComponent,
    CreateQuestionnaireComponent,
    QuestionItemComponent,
    CreateQuestionComponent,
    ChangeDealCategoryRendererComponent,
    ChangeTierRendererComponent,
    ViewOrderHistoryButtonRenderer,
    EditProductLaunchByAdminComponent,
    WalletPageComponent,
  ],

  imports: [
    ScrollingModule,
    CdkTableModule,
    CommonModule,
    CdkTreeModule,
    A11yModule,
    AdminRoutingModule,
    FormsModule,
    ExpMaterialModule,
    DialogModule,
    ReactiveFormsModule,
    ProgressBarModule,
    CoreModule,
    MatTableExporterModule,
    CdkTableExporterModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule.withComponents([
      RouterLinkComponent,
      ButtonRendererComponent,
      DeleteButtonRendererComponent,
      DeleteBonusButtonRendererComponent,
      EditDeleteLaunchButtonsRendererComponent,
      GoToWalletButtonComponent,
      StaffActionButtonsRendererComponent,
      EditSellerButtonRendererComponent,
      EditDeleteBuyerButtonRendererComponent,
      InstructionActionsButtonsRendrerComponent,
      TestimonialActionsButtonsRendrerComponent,
      ChangeBuyerStatusRendererComponent,
      QuestionButtonRendererComponent,
      PendindLaunchButtonComponent,
      ChangeDealCategoryRendererComponent,
      ChangeTierRendererComponent,
      ViewOrderHistoryButtonRenderer,
    ]),
  ],
  entryComponents: [StaffCreateUpdateComponent, BonusCodeCreateUpdateComponent],
  providers: [NotificationServiceService, UserDetailsResolve],
})
export class AdminModule {}
