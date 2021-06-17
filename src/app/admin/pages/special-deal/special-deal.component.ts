import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AdminServicesService} from '../../services/admin-services.service';

interface Deal {
  asin: string;
  position: string;
}

@Component({
  selector: 'app-special-deal',
  templateUrl: './special-deal.component.html',
  styleUrls: ['./special-deal.component.scss']
})
export class SpecialDealComponent implements OnInit {

  private leftDeal: Deal = {
    asin: '',
    position: 'left'
  };
  private rightDeal: Deal = {
    asin: '',
    position: 'right',
  };

  public leftDealFormControl = new FormControl('', [Validators.required]);
  public rightDealFormControl = new FormControl('', [Validators.required]);

  public editMode = false;

  constructor(
      private toastService: ToastrService,
      private adminService: AdminServicesService,
  ) { }

  ngOnInit() {
    this.editMode = false;
    this.leftDealFormControl.disable();
    this.rightDealFormControl.disable();
    this.getSpecialDeals();
  }

  editDeals() {
    this.editMode = true;
    this.leftDealFormControl.enable();
    this.rightDealFormControl.enable();
  }

  saveDeals() {
    if(!(this.leftDealFormControl.valid && this.rightDealFormControl.valid)) { return; }

    this.leftDeal.asin = this.leftDealFormControl.value;
    this.rightDeal.asin = this.rightDealFormControl.value;

    let rightValid = false;
    let leftValid = false;

    if (this.leftDeal.asin === this.rightDeal.asin) {
      return this.toastService.error('Deals must be unique');
    }

    if (this.rightDeal) {
      rightValid = this.checkDeal(this.rightDeal);
    }

    if (this.leftDeal) {
      leftValid = this.checkDeal(this.leftDeal);
    }

    if (leftValid && rightValid) {
      const deals = [this.rightDeal, this.leftDeal];

      this.adminService.setSpecialDeals({deals}).subscribe((result) => {
        console.log(result);
        if (result && result.code === 200) {
          this.toastService.success('Special Deals added successfully!');

          this.editMode = false;
          this.leftDealFormControl.disable();
          this.rightDealFormControl.disable();
        } else {
          this.toastService.error(result.message);
        }
      });
    }
  }

  checkDeal(deal) {
    const regEx = /^[A-Za-z0-9]{10}$/g;
    const isDealValid = regEx.test(deal.asin);
    if (!isDealValid) {
      this.toastService.error(deal.position + ' deal validation error!');
    }
    return isDealValid;
  }

  getSpecialDeals() {
    this.adminService.getSpecialDeals().subscribe((result) => {

      if (result && result.code === 200 && result.data.length > 0) {
        this.leftDeal = result.data.find(item => item.position === 'left');
        this.leftDealFormControl.setValue(this.leftDeal.asin);
        this.rightDeal = result.data.find(item => item.position === 'right');
        this.rightDealFormControl.setValue(this.rightDeal.asin);
      } else {
        this.toastService.error(result.message);
      }
    });
  }

}
