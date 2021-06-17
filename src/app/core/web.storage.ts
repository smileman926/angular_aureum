import { Injectable } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class WebStorage {

  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) { }


  public get(key: any) {
    try {
      var localStorage = JSON.parse(this.localStorageService.retrieve(key));
      var sessionStorage = JSON.parse(this.sessionStorageService.retrieve(key));
    } catch (e) {
      var localStorage = (this.localStorageService.retrieve(key));
      var sessionStorage = (this.sessionStorageService.retrieve(key));
    }
    return localStorage || sessionStorage;
  }
  
  public getByPromise(key: any) {
    return new Promise((resolve,reject)=>{
      try {
        var localStorage = JSON.parse(this.localStorageService.retrieve(key));
        var sessionStorage = JSON.parse(this.sessionStorageService.retrieve(key));
      } catch (e) {
        var localStorage = (this.localStorageService.retrieve(key));
        var sessionStorage = (this.sessionStorageService.retrieve(key));
      }
      resolve(localStorage || sessionStorage)
    })
    // return localStorage || sessionStorage;
  }


  public set(key: any, value: any) {
    try {
      if (value instanceof Object) {
        value = JSON.stringify(value);
      }
      this.localStorageService.store(key, value);
      this.sessionStorageService.store(key, value);
    } catch (e) {
      this.localStorageService.store(key, value);
      this.sessionStorageService.store(key, value);
    }
    return localStorage || sessionStorage;
  }


  public localStore(key: any, value: any) {

    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    this.localStorageService.store(key, value);
  }

  public sessionStore(key: any, value: any) {
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    this.sessionStorageService.store(key, value);
  }
  public clear(key: any) {
    this.localStorageService.clear(key);
    this.sessionStorageService.clear(key);
  }

  public clearAll() {
    this.localStorageService.clear();
    this.sessionStorageService.clear();
  }

  public exists(key: any) {
    if (this.get(key) != null) {
      return true;
    } else {
      return false;
    }
  }

}