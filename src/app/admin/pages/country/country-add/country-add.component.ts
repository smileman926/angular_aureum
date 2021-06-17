import { Component, OnInit } from '@angular/core';
import { GenralService } from '../../../../core';
import { WebStorage } from '../../../../core/web.storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { genralConfig } from '../../../../core/constant/genral-config.constant';

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.scss']
})
export class CountryAddComponent implements OnInit {
  loggedInUserDetails: any;
  addCountryForm: FormGroup;
  loader: boolean = false;
  
  constructor(public _genralServices: GenralService,
    private _webStorage: WebStorage,
    private _formBuilder: FormBuilder,
    public _countryService: CountryService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.loggedInUserDetails = this._webStorage.get('all');

    this.addCountryForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(genralConfig.pattern.NAME)]],
      code: ['', [Validators.required]],
    });
  }

  addCountry() {
    if(this.addCountryForm.valid){
      this.loader = true;
      let dataObj = {
  
        name: this.addCountryForm.value.name ? this.addCountryForm.value.name : '',
        code: this.addCountryForm.value.code ? this.addCountryForm.value.code : '',
      }
      this._countryService.addCountry(dataObj).subscribe((res: any) => {
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
      this._genralServices.markFormGroupTouched(this.addCountryForm);
    }
  }

  goBack() {
    this._genralServices.goBack();
  }

  navigateToList() {
    this.router.navigate(['/layout/admin/country/country-list']);
  }

}
