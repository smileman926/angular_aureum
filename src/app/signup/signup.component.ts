import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { genralConfig } from "../core/constant/genral-config.constant";
import { CustomValidators } from "ng2-validation";
import { SignupService } from "./services/signup.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { WebStorage } from "../core/web.storage";
import { GenralService } from "../core/services/sharedservices/genralservice/genral.service";
import * as moment from "moment";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  successEmail: string = "Brand Expand";
  lawfirmText: Boolean = true;
  insuranceCompanyText: Boolean = false;
  signUpForm: FormGroup;
  registrationSucess: Boolean = false;
  loader: Boolean = false;
  usermail: string = "";
  isLoggedin: Boolean = false;
  loggedInUserDetails: any;
  lessThan18 = false;
  maxDate = new Date();
  stateJson = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
    "AS",
    "GU",
    "MP",
    "PR",
    "UM",
    "VI",
  ];
  userState: any;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignupService,
    private router: Router,
    private toastr: ToastrService,
    private _webStorage: WebStorage,
    private general_service: GenralService
  ) {}

  ngOnInit() {
    // this.registrationSucess=true;
    this.general_service.isloggedInRedirect();

    let password = new FormControl("", [
      Validators.required,
      Validators.maxLength(genralConfig.pattern.PASSWORDMAXLENGTH),
      Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH),
    ]);
    let confirmPassword = new FormControl("", [
      Validators.required,
      CustomValidators.equalTo(password),
    ]);
    this.signUpForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.pattern(genralConfig.pattern.EMAIL)],
      ],
      password: password,
      confirmPassword: confirmPassword,
      first_name: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      last_name: [
        "",
        [
          Validators.required,
          Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH),
          Validators.minLength(genralConfig.pattern.NAMEMINLENGTH),
        ],
      ],
      // address1: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.MAXLENGTH), Validators.minLength(genralConfig.pattern.MINLENGTH)]],
      // city: ['', [Validators.required, Validators.pattern(genralConfig.pattern.CITY), Validators.maxLength(genralConfig.pattern.NAMEMAXLENGTH), Validators.minLength(genralConfig.pattern.NAMEMINLENGTH)]],
      // state: [''],
      // postalCode: ['', [Validators.required, Validators.pattern(genralConfig.pattern.POSTAL_CODE)]],
      // dateOfBirth: ['', [Validators.required]],
      // ssn: ['', [Validators.required, Validators.pattern(genralConfig.pattern.SSN)]],
      // phone:['',[Validators.required,Validators.pattern(genralConfig.pattern.PHONE_NO)]]
    });
  }

  userRegister() {
    this.loader = true;
    this.usermail = this.signUpForm.value.email;
    const userObject = {
      firstname: this.signUpForm.value.first_name,
      lastname: this.signUpForm.value.last_name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      role: "seller",
    };
    this.signUpService.userRegistration(userObject).subscribe((res) => {
      if (res.code == 200) {
        this.loader = false;
        this.registrationSucess = true;
        this.toastr.success(res.message);
        console.log(res.data, "In user register call");
        // const dataObject = {
        //   firstName: userObject.firstname,
        //   lastName: userObject.lastname,
        //   email: userObject.email,
        //   role: 'seller',
        //   address1: this.signUpForm.value.address1,
        //   city: this.signUpForm.value.city,
        //   password: this.signUpForm.value.password,
        //   state: this.userState,
        //   postalCode: this.signUpForm.value.postalCode,
        //   dateOfBirth: this.formatDate(this.signUpForm.value.dateOfBirth),
        //   ssn: this.signUpForm.value.ssn,
        //   type: 'personal',
        //   user: res.data.user
        // };
      } else {
        this.toastr.error(res.message);
        this.loader = false;
      }
    });
  }

  getState(event) {
    this.userState = event.value;
    this.signUpForm.value.state = event.value;
    console.log(this.userState, "this.userState");
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    console.log([year, month, day].join("-"));
    return [year, month, day].join("-");
  }

  checkAge() {
    const a = moment(new Date());
    const b = moment(this.signUpForm.value.dateOfBirth);
    const dobDiff = a.diff(b, "years");
    if (dobDiff < 18) {
      this.toastr.error("Sorry!, your age must be 18 years or older.");
      this.loader = false;
      this.lessThan18 = true;
    } else {
      this.lessThan18 = false;
    }
  }
}
