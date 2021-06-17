import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenralService } from '../../../../core';
import { WebStorage } from '../../../../core/web.storage';
import { StateService } from '../services/state.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { genralConfig } from '../../../../core/constant/genral-config.constant';

@Component({
  selector: 'app-state-add',
  templateUrl: './state-add.component.html',
  styleUrls: ['./state-add.component.scss']
})
export class StateAddComponent implements OnInit {
  loggedInUserDetails: any;
  addStateForm: FormGroup;
  loader: boolean = false;
  countryListData:any=[];
  constructor(public _genralServices: GenralService,
    private _webStorage: WebStorage,
    private _formBuilder: FormBuilder,
    public _stateService: StateService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.loggedInUserDetails = this._webStorage.get('all');

    this.addStateForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      code: ['', [Validators.required]],
      country_id: ['', [Validators.required]]
    });
    this.countryList();
  }

  goBack() {
    this._genralServices.goBack();
  }

  navigateToList() {
    this.router.navigate(['/layout/admin/state/state-list']);
  }

  addState() {
    if(this.addStateForm.valid){
      this.loader = true;
      let dataObj = {
        name: this.addStateForm.value.name ? this.addStateForm.value.name : '',
        code: this.addStateForm.value.code ? this.addStateForm.value.code : '',
        country_id: this.addStateForm.value.country_id ? this.addStateForm.value.country_id : ''
      }
      this._stateService.addState(dataObj).subscribe((res: any) => {
        this.loader = false;
        if (res && res.code == genralConfig.statusCode.ok) {
          this.toastr.success(res.message);
          this.navigateToList();
        }
        else {
          this.toastr.error(res.message);
        }
      })
    }else{
      this._genralServices.markFormGroupTouched(this.addStateForm);
    }
  }

  countryList(){
    let countryObject = {}
    this._genralServices.countryList(countryObject).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        // this.toastr.success(res.message);
        this.countryListData = res.data;
      }
      else {
        // this.toastr.error(res.message);
      }
    })
  }

}
