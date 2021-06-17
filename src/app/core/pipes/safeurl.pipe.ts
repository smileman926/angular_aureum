import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl' })
export class SafePipe implements PipeTransform {
  safeUrl:SafeResourceUrl
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: any) {
    // let newurl = "https://docs.google.com/viewer?url=" + url + "&embedded=true";
    // return this.sanitizer.bypassSecurityTrustUrl(url)
    console.log('url in pipe to sanitize',url)
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return this.safeUrl
  }
} 