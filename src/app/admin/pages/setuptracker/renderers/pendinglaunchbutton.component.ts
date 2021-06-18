import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-button-renderer',
    template: `
  <i *ngIf= "params.data.special_link_INS4" class="fa fa-tasks" style="cursor: pointer;" (click)="onClick($event)" aria-hidden="true"></i>
  `
})

export class PendindLaunchButtonComponent implements ICellRendererAngularComp {

    params: any;
    label: string;

    agInit(params: any): void {
        console.log('params agInt', params.data.special_link_INS4);
        console.log('This params ====>', this.params)
        this.params = params;
        this.label = this.params.label || null;
    }

    refresh(params?: any): boolean {
        return true;
    }

    onClick($event) {
        if (this.params.onClick instanceof Function) {
            const params = {
                event: $event,
                rowData: this.params.node.data
            };
            this.params.onClick(params);
        }
    }
}
