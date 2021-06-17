import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WebStorage } from 'src/app/core/web.storage';

const MINUTES_UNITL_AUTO_LOGOUT = 60 // in Minutes
const CHECK_INTERVALL = 1000 // in ms
const STORE_KEY = 'lastAction';

@Injectable()
export class AutoLogoutService {

    info = null;

    constructor(
        private router: Router,
        private ngZone: NgZone,
        private toastr: ToastrService,
        private _webStorage: WebStorage,
    ) {
        // console.log("this.info----------------------------->", this.info);
        this.check();
        this.initListener();
        this.initInterval();
    }

    get lastAction() {
        return parseInt(localStorage.getItem(STORE_KEY))
    }

    set lastAction(value) {
        localStorage.setItem(STORE_KEY, value.toString());
    }

    initListener() {
        this.ngZone.runOutsideAngular(() => {
            document.body.addEventListener('click', () => this.reset('click'));
            document.body.addEventListener('keypress', () => this.reset('keypress'));
            document.body.addEventListener('mouseover', () => this.reset('mouseover'));
            document.body.addEventListener('mouseout', () => this.reset('mouseout'));
            document.body.addEventListener('mouseup', () => this.reset('mouseup'));
            document.body.addEventListener('wheel', () => this.reset('wheel'));
        });
    }

    initInterval() {
        this.ngZone.runOutsideAngular(() => {
            setInterval(() => {
                this.check();
            }, CHECK_INTERVALL);
        })
    }

    reset(type) {
        this.lastAction = Date.now();
    }

    check() {
        const now = Date.now();
        const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        // console.log("this.info----------------------------->", timeleft, diff, isTimeout);

        this.ngZone.run(() => {
            if (isTimeout) {
                this.enforceLogout();
            }
        });
    }

    enforceLogout() {
        this.info = this._webStorage.get('token');
        if (this.info) {
            console.log("Logout calling here in buyer....");
            this._webStorage.clearAll();
            this.router.navigate(['/login']);
            this.toastr.warning('System Idle', 'You have been logged out of the application.')
            this.info = null;
        }
    }
}
