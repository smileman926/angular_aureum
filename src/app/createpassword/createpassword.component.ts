import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetpasswordService } from '../forgetpassword/service/forgetpassword.service';
import { genralConfig } from '../core/constant/genral-config.constant';
import { GenralService } from '../core';

@Component({
  selector: 'app-createpassword',
  templateUrl: './createpassword.component.html',
  styleUrls: ['./createpassword.component.scss']
})
export class CreatepasswordComponent implements OnInit {
  loader:Boolean=false;
  createpasswordForm: FormGroup;
  resettoken: any
  message : string = genralConfig.passwordCreatedmessage
  constructor(
    private formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _forgetpasswordService : ForgetpasswordService,
    private router:Router,
    private activatedRoute : ActivatedRoute,
    private generalService : GenralService
  ) {
    this.createpasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(genralConfig.pattern.PASSWORDMAXLENGTH), Validators.minLength(genralConfig.pattern.PASSWORDMINLENGTH)]]
    });

   }

  ngOnInit() {
   

    this.resettoken = this.activatedRoute.snapshot.paramMap.get("id");
    this.generalService.isloggedInRedirect();
    // this.checkUrlLink();

  }

  checkUrlLink(){
    this.generalService.checkUrl({resetkey : this.resettoken}).subscribe((res :any)=>{
      if(res && res.code==genralConfig.statusCode.ok){
      }
      else{
        this._toastr.error(res.message);
      }
    })
  }

  createPassword(){
    this.loader=true;
    let objToAdd = {
      password : this.createpasswordForm.value.password,
      token : this.resettoken
    }
    this.generalService.createPassword(objToAdd).subscribe(res=>{
      if (res.code == genralConfig.statusCode.ok) {
        this.loader=false;
        this._toastr.success(this.message);
        this.router.navigate(['/login'])
      }else{
        this.loader=false;
        this._toastr.error(res.message);
      }
    })
   }

}
