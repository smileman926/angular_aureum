import { Component, OnInit, Optional, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { genralConfig } from "../core/constant/genral-config.constant";
import { LoginService } from "./service/login.service";
import { ToastrService } from "ngx-toastr";
import { HeaderService } from "../layout/components/header/service/header.service";
import { WebStorage } from "../core/web.storage";
import { GenralService } from "../core/services/sharedservices/genralservice/genral.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userType: string;
  loggedInUserDetails: any;
  isLoggedin: any = false;
  loader: Boolean = false;
  isRemember: Boolean = false;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private LoginService: LoginService,
    private toastr: ToastrService,
    private headerSercvice: HeaderService,
    private _webStorage: WebStorage,
    private general_service: GenralService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)],
      ],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.general_service.isloggedInRedirect();
  }

  isRemChange(isRemEvnt) {
    this.isRemember = isRemEvnt.checked;
  }
  login() {
    this.loader = true;

    this.LoginService.login(this.loginForm.value, this.isRemember).subscribe(
      (res) => {
        if (res.code == genralConfig.statusCode.ok) {
          this.loader = false;
          //testing purpose

          // this.router.navigate(['/layout/seller/dashboard']);
          // this.headerSercvice.setImage(res.data.userInfo.image);
          this.headerSercvice.setTitle(
            res.data.firstname + " " + res.data.lastname
          );
          switch (res.data.role.role) {
            case "seller": {
              this.toastr.info(
                "Sorry! You are trying to login on seller platform"
              );
              break;
            }
            case "buyer": {
              this.toastr.info(
                "Sorry! You are trying to login on buyer platform"
              );
              break;
            }
            case "admin": {
              this.router.navigate(["/layout/admin/dashboard"]);
              break;
            }
            case "superAdmin": {
              this.router.navigate(["/layout/admin/dashboard"]);
              break;
            }
            case "subAdmin": {
              this.router.navigate(["/layout/admin/dashboard"]);
              break;
            }
          }
        } else {
          this.loader = false;
          this.toastr.warning(res.message);
        }
      }
    );
  }
}
