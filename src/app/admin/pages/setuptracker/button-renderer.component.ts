import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
    <i *ngIf= "params.data.launch_isApproved" class="fa fa-check" aria-hidden="true"></i>
    <i *ngIf= "params.data.isPaymentDone && !params.data.launch_isApproved"
       class="fa fa-thumbs-up"
       (click)="onClick($event)"
       aria-hidden="true"></i>
  `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params: any;
  label: string;

  agInit(params: any): void {
    this.params =  params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };
      this.params.onClick(params);

    }
  }
}
