import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenralService } from '../../../../core';
import { WebStorage } from '../../../../core/web.storage';
import { CountryService } from '../services/country.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { genralConfig } from '../../../../core/constant/genral-config.constant';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {
  loggedInUserDetails: any;
  editCountryForm: FormGroup;
  loader: boolean = false;
  countryId:any;
  countryDetails:any;
  constructor(public _genralServices: GenralService,
    private _webStorage: WebStorage,
    private _formBuilder: FormBuilder,
    public _countryService: CountryService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loggedInUserDetails = this._webStorage.get('all');
    this.countryId = this.activatedRoute.snapshot.paramMap.get("id");

    this.editCountryForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      code: ['', [Validators.required]],
    });

    this.getCountryDetails();
  }

  getCountryDetails() {
    this.loader = true;
    let objToFind = {
      country_id: this.countryId ? this.countryId : "",
    }
    this._countryService.getCountryDetails(objToFind).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.countryDetails = res.data;
        this.editCountryForm.patchValue({
          name: this.countryDetails.name ? this.countryDetails.name : '',
          code: this.countryDetails.code ? this.countryDetails.code : ''

        })
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }

  editCountry() {
    if(this.editCountryForm.valid){
      this.loader = true;
      let dataObj = {
        country_id: this.countryId ? this.countryId : '',
        name: this.editCountryForm.value.name ? this.editCountryForm.value.name : '',
        code: this.editCountryForm.value.code ? this.editCountryForm.value.code : '',
      }
  
      this._countryService.editCountry(dataObj).subscribe((res: any) => {
        this.loader = false;
        if (res && res.code == genralConfig.statusCode.ok) {
          this.toastr.success(res.message);
          this.router.navigate(['/layout/admin/country/country-list'])
        }
        else {
          this.toastr.error(res.message);
        }
      })

    }else{
      this._genralServices.markFormGroupTouched(this.editCountryForm);
    }
  }

  goBack() {
    this._genralServices.goBack();
  }

}
