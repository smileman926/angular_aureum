import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent, AdminComponent } from './pages';
import { ListbuyersComponent } from './pages/listbuyers/listbuyers.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ListTestimonialComponent } from './pages/list-testimonial/list-testimonial.component';
import { ListsellersComponent } from './pages/listsellers/listsellers.component';
import { SetuptrackerComponent } from './pages/setuptracker/setuptracker.component';
import { GiveawaysdbComponent } from './pages/giveawaysdb/giveawaysdb.component';
import { ReimbursementComponent } from './pages/reimbursement/reimbursement.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { AdminAccountDetailsComponent } from './pages/admin-account-details/admin-account-details.component';
import { ListDealsComponent } from './pages/list-deals/list-deals.component';
import { ListInstructionsComponent } from './pages/list-instructions/list-instructions.component';
import { AddStaffComponent } from './pages/add-staff/add-staff.component';
import { SpecialDealComponent } from './pages/special-deal/special-deal.component';
import { SetupBonuscodeComponent } from './pages/setup-bonuscode/setup-bonuscode.component';
import { ReferalsComponent } from './pages/referals/referals.component';
import { OrdersDatabaseComponent } from './pages/orders-database/orders-database.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'list-buyers', component: ListbuyersComponent },
            { path: 'list-testimonials', component: ListTestimonialComponent },
            { path: 'list-deals', component: ListDealsComponent },
            { path: 'list-instructions', component: ListInstructionsComponent },
            { path: 'special-deals', component: SpecialDealComponent },

            { path: 'list-sellers', component: ListsellersComponent },

            { path: 'faq', component: FaqComponent },
            { path: 'setuptracker', component: SetuptrackerComponent },
            { path: 'reimbursement/:Orderid', component: ReimbursementComponent },


            { path: 'giveawaysdb', component: GiveawaysdbComponent },
            { path: 'giveawaysdb/:orderNo', component: GiveawaysdbComponent },

            { path: 'orders-database', component: OrdersDatabaseComponent },

            { path: 'subscription', component: SubscriptionComponent },
            { path: 'staff', component: AddStaffComponent },
            { path: 'bonuscodes', component: SetupBonuscodeComponent },
            { path: 'referals', component: ReferalsComponent },
            { path: 'bankDetails', component: AdminAccountDetailsComponent },

            { path: 'country', loadChildren: () => import('./pages/country/country.module').then(m => m.CountryModule) },
            { path: 'state', loadChildren: () => import('./pages/state/state.module').then(m => m.StateModule) },
            // { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },


        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
