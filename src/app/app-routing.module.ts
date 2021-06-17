import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatepasswordComponent } from "./createpassword/createpassword.component";
import { EmailVerificationComponent } from "./email-verification/email-verification.component";
import { AuthGuardService } from "./core";
import { PagenotfoundComponent } from "./core/components/pagenotfound/pagenotfound.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "layout",
    loadChildren: () =>
      import("./layout/layout.module").then((m) => m.LayoutModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupModule),
  },
  {
    path: "forget-password",
    loadChildren: () =>
      import("./forgetpassword/forgetpassword.module").then(
        (m) => m.ForgetpasswordModule
      ),
  },
  { path: "create-password/:id", component: CreatepasswordComponent },
  { path: "verification/:id/:token", component: EmailVerificationComponent },
  {
    path: "**",
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
// , { enableTracing: true }
