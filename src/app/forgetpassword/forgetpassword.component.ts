import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { genralConfig } from "../core/constant/genral-config.constant";
import { ForgetpasswordService } from "./service/forgetpassword.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { GenralService } from "../core/services/sharedservices/genralservice/genral.service";
@Component({
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.component.html",
  styleUrls: ["./forgetpassword.component.scss"],
})
export class ForgetpasswordComponent implements OnInit {
  forgotPwdForm: any;
  loader: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private _forgetpasswordService: ForgetpasswordService,
    private _toastr: ToastrService,
    private router: Router,
    private general_service: GenralService
  ) {
    this.forgotPwdForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)],
      ],
    });
  }

  ngOnInit() {
    this.general_service.isloggedInRedirect();
  }

  send() {
    this.loader = true;
    this._forgetpasswordService
      .sendEmail(this.forgotPwdForm.value)
      .subscribe((res) => {
        if (res.code == genralConfig.statusCode.ok) {
          this.loader = false;
          this._toastr.success(res.message);
          this.router.navigate(["/"]);
        } else {
          this.loader = false;
          this._toastr.error(res.message);
        }
      });
  }
}
