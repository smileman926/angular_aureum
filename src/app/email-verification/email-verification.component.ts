import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GenralService } from '../core/services';
import { genralConfig } from '../core/constant/genral-config.constant';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  userId: any
  userToken: any
  loader: boolean = false
  constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private general_service: GenralService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.general_service.isloggedInRedirect();
    this.loader = true;
    this.userId = this.activatedRoute.snapshot.paramMap.get("id");
    this.userToken = this.activatedRoute.snapshot.paramMap.get("token");
    let verifyObj = {
      id: this.userId,
      verification_token: this.userToken
    }

    this.general_service.verifyEmail(verifyObj).subscribe((res) => {
      if (res.code == genralConfig.statusCode.ok) {
        this.loader = false;
        this.router.navigate(['/login']);
        this._toastr.success(res.message)
      } else {
        alert("Something went wrong!");
        this.loader = false;
        this.router.navigate(['/']);

      }

    })
  }

}
