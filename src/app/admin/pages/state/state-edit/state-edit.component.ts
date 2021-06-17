import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenralService } from '../../../../core';
import { WebStorage } from '../../../../core/web.storage';
import { StateService } from '../services/state.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { genralConfig } from '../../../../core/constant/genral-config.constant';

@Component({
  selector: 'app-state-edit',
  templateUrl: './state-edit.component.html',
  styleUrls: ['./state-edit.component.scss']
})
export class StateEditComponent implements OnInit {
  loggedInUserDetails: any;
  editStateForm: FormGroup;
  loader: boolean = false;
  stateId:any;
  stateDetails:any;
  countryListData:any=[];
  constructor(public _genralServices: GenralService,
    private _webStorage: WebStorage,
    private _formBuilder: FormBuilder,
    public _stateService: StateService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.loggedInUserDetails = this._webStorage.get('all');
    this.stateId = this.activatedRoute.snapshot.paramMap.get("id");

    this.editStateForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      code: ['', [Validators.required]],
      country_id:['', [Validators.required]]
    });
    this.countryList();
    this.getStateDetails();
  }

  goBack() {
    this._genralServices.goBack();
  }
  
  getStateDetails(){
    this.loader = true;
    let objToFind = {
      state_id: this.stateId ? this.stateId : "",
    }
    this._stateService.getStateDetails(objToFind).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.stateDetails = res.data;
        this.editStateForm.patchValue({
          name: this.stateDetails.name ? this.stateDetails.name : '',
          code: this.stateDetails.code ? this.stateDetails.code : '',
          country_id: this.stateDetails.country_id ? this.stateDetails.country_id : ''
        })
      }
      else {
        this.toastr.error(res.message);
      }
    })
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

  editState() {
    if(this.editStateForm.valid){
      this.loader = true;
      let dataObj = {
        state_id: this.stateId ? this.stateId : '',
        name: this.editStateForm.value.name ? this.editStateForm.value.name : '',
        code: this.editStateForm.value.code ? this.editStateForm.value.code : '',
        country_id: this.editStateForm.value.country_id ? this.editStateForm.value.country_id:''
      }
      console.log("dsfdsfd \n", dataObj);
  
      this._stateService.editState(dataObj).subscribe((res: any) => {
        this.loader = false;
        if (res && res.code == genralConfig.statusCode.ok) {
          this.toastr.success(res.message);
          this.router.navigate(['/layout/admin/state/state-list'])
        }
        else {
          this.toastr.error(res.message);
        }
      })
      console.log("country data to edit \n", dataObj);
    }else{
      this._genralServices.markFormGroupTouched(this.editStateForm);
    }
  }
}
