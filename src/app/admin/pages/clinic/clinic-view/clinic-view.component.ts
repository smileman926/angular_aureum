import { Component, OnInit } from '@angular/core';
import { GenralService } from '../../../../core';
import { ActivatedRoute } from '@angular/router';
import { ClinicServiceService } from '../services/clinic-service.service';
import { genralConfig } from '../../../../core/constant/genral-config.constant';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-clinic-view',
  templateUrl: './clinic-view.component.html',
  styleUrls: ['./clinic-view.component.scss']
})
export class ClinicViewComponent implements OnInit {
  displayColumns = ['Clinic Name', 'Registration No.', 'Phone No.', 'Address', 'action'];
  loader: boolean = false;
  userId: any;
  clinicDetails: any;

  constructor(
    public _genralServices: GenralService,
    public _clinicService: ClinicServiceService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get("id");

    this.getClinic();
  }
  goBack() {
    this._genralServices.goBack();
  }
  getClinic() {
    this.loader = true;
    let objToFind = {
      user_id: this.userId ? this.userId : "",
    }
    this._clinicService.getClinicDetails(objToFind).subscribe((res: any) => {
      this.loader = false;
      if (res && res.code == genralConfig.statusCode.ok) {
        this.clinicDetails = res.data;
      }
      else {
        this.toastr.error(res.message);
      }
    })
  }
}
