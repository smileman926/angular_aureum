import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import {
  catchError,
  filter,
  finalize,
  take,
  switchMap,
  tap,
} from "rxjs/operators";
import { genralConfig } from "../constant/genral-config.constant";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { LoaderService } from "../services/sharedservices/loaderservice/loader.service";
import { WebStorage } from "../web.storage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  token: any;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private injector: Injector,
    private _webStorage: WebStorage
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!genralConfig.pattern.AUTHISNOTREQ.some((el) => req.url.includes(el))) {
      req = this.addAuthenticationToken(req);
    } else {
      return next.handle(req);
    }

    if (
      !req.headers.has("Content-Type") &&
      !req.url.includes("/addProduct") &&
      !req.url.includes("/uploadProductPic") &&
      !req.url.includes("/updateSubscriptionPlan") &&
      !req.url.includes("/addSubscriptionPlan") &&
      !req.url.includes("/importUsersIntoSellerCollection") &&
      !req.url.includes("/importUsersIntoBuyerCollection")
    ) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json"),
      });
    }

    const loaderService = this.injector.get(LoaderService);
    loaderService.show();
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 201) {
          this.toastr.success(event.statusText);
        }
        if (event instanceof HttpResponse && event.status === 401) {
          let str = this.router.url;
          let url = str.split("/");
          if (url[1] !== "login" && url[1] !== "signup") {
            this.router.navigate(["/"]);
          }
          return false;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // this.toastr.error(error.message);
        return throwError(error);
      }),
      finalize(() => loaderService.hide())
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    this.token = this._webStorage.get("token");
    if (!this.token) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    // if (!request.url.match(/www.mydomain.com\//)) {
    //   return request;
    // }
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, this.token),
    });
  }
}
