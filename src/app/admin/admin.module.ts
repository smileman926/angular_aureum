import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  DashboardComponent,
  AdminComponent,
  AdminsidebarComponent,
} from "./pages";
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotificationServiceService } from "../core";
import { ExpMaterialModule } from "../material.module";
import { UserComponent } from "./pages/user/user.component";
import { ListbuyersComponent } from "./pages/listbuyers/listbuyers.component";
import { FaqComponent } from "./pages/faq/faq.component";
import { DialogModule } from "primeng/dialog";
import { ListTestimonialComponent } from "./pages/list-testimonial/list-testimonial.component";
import { ListsellersComponent } from "./pages/listsellers/listsellers.component";
import { CoreModule } from "../core/core.module";
import { GiveawaysdbComponent } from "./pages/giveawaysdb/giveawaysdb.component";
import { SetuptrackerComponent } from "./pages/setuptracker/setuptracker.component";
import { ReimbursementComponent } from "./pages/reimbursement/reimbursement.component";
import {
  MatTableExporterModule,
  CdkTableExporterModule,
} from "mat-table-exporter";
import { SubscriptionComponent } from "./pages/subscription/subscription.component";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { A11yModule } from "@angular/cdk/a11y";
import { AgGridModule } from "ag-grid-angular";
import { RouterLinkComponent } from "./pages/giveawaysdb/routerlinkorder.component";
import { ButtonRendererComponent } from "./pages/setuptracker/button-renderer.component";
import { QuestionButtonRendererComponent } from "./pages/setuptracker/question-button-renderer.component";
import { AdminAccountDetailsComponent } from "./pages/admin-account-details/admin-account-details.component";
import { ListDealsComponent } from "./pages/list-deals/list-deals.component";
import { ListInstructionsComponent } from "./pages/list-instructions/list-instructions.component";
import { PendindLaunchButtonComponent } from "./pages/setuptracker/pendinglaunchbutton.component";
import { AddStaffComponent } from "./pages/add-staff/add-staff.component";
import { StaffCreateUpdateComponent } from "./pages/add-staff/staff-create-update/staff-create-update.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { EditUserLoginDialogComponent } from "./shared/edit-user-login-dialog/edit-user-login-dialog.component";
import { SpecialDealComponent } from "./pages/special-deal/special-deal.component";
import { SetupBonuscodeComponent } from "./pages/setup-bonuscode/setup-bonuscode.component";
import { BonusCodeCreateUpdateComponent } from "./pages/setup-bonuscode/bonus-code-create-update/bonus-code-create-update.component";
import { ReferalsComponent } from "./pages/referals/referals.component";
import { EditUserSubscriptionDialogComponent } from "./shared/edit-user-subscription-dialog/edit-user-subscription-dialog.component";

import { OrdersDatabaseComponent } from "./pages/orders-database/orders-database.component";

import { CreateQuestionnaireComponent } from "./pages/setuptracker/create-questionnaire/create-questionnaire.component";
import { QuestionItemComponent } from "./pages/setuptracker/create-questionnaire/question-item/question-item.component";
import { CreateQuestionComponent } from "./pages/setuptracker/create-questionnaire/create-question/create-question.component";
import { DeleteButtonRendererComponent } from "./pages/list-deals/delete-button-renderer.component";
import { DeleteBonusButtonRendererComponent } from "./pages/setup-bonuscode/delete-bonus-button-renderer.component";
import { EditSellerButtonRendererComponent } from "./pages/listsellers/edit-seller-button-renderer.component";
import { EditDeleteBuyerButtonRendererComponent } from "./pages/listbuyers/edit-delete-buyer-button-renderer.component";
import { ChangeBuyerStatusRendererComponent } from "./pages/listbuyers/change-buyer-status-renderer.component";
import { InstructionActionsButtonsRendrerComponent } from "./pages/list-instructions/instructions-actions-buttons-renderer.component";
import { TestimonialActionsButtonsRendrerComponent } from "./pages/list-testimonial/testimonial-actions-buttons-renderer.component";
import { ChangeDealCategoryRendererComponent } from "./pages/list-deals/change-deal-category-renderer.component";

// import { SafePipe,CapitalizePipe ,TruncatePipe} from '../core/pipes';

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
    SubscriptionComponent,
    RouterLinkComponent,
    ButtonRendererComponent,
    DeleteButtonRendererComponent,
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
    SpecialDealComponent,
    SetupBonuscodeComponent,
    BonusCodeCreateUpdateComponent,
    ReferalsComponent,
    EditUserSubscriptionDialogComponent,
    CreateQuestionnaireComponent,
    QuestionItemComponent,
    CreateQuestionComponent,
    ChangeDealCategoryRendererComponent,
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
    CoreModule,
    MatTableExporterModule,
    CdkTableExporterModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule.withComponents([
      RouterLinkComponent,
      ButtonRendererComponent,
      DeleteButtonRendererComponent,
      DeleteBonusButtonRendererComponent,
      EditSellerButtonRendererComponent,
      EditDeleteBuyerButtonRendererComponent,
      InstructionActionsButtonsRendrerComponent,
      TestimonialActionsButtonsRendrerComponent,
      ChangeBuyerStatusRendererComponent,
      QuestionButtonRendererComponent,
      PendindLaunchButtonComponent,
      ChangeDealCategoryRendererComponent,
    ]),
  ],
  entryComponents: [StaffCreateUpdateComponent, BonusCodeCreateUpdateComponent],
  providers: [NotificationServiceService],
})
export class AdminModule {}
