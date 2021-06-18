import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
    <div class="actionIcon">
      <a
        *ngIf="!params.data.launch_isApproved"
        class="viewI"
        (click)="onClick($event)"
        matTooltip="Edit product launch"
      >
        <i class="material-icons edit-icons">edit</i>
      </a>
      <a
        *ngIf="!params.data.launch_isApproved"
        class="viewI"
        (click)="onClick($event)"
        matTooltip="Return to seller"
      >
        <i class="material-icons cancel-icons">refresh</i>
      </a>
      <a
        *ngIf="params.data.launch_isApproved"
        class="viewI"
        (click)="onClick($event)"
        matTooltip="Cancel launch"
      >
        <i class="material-icons cancel-icons">cancel</i>
      </a>
    </div>
  `,
})
export class EditDeleteLaunchButtonsRendererComponent
  implements ICellRendererAngularComp
{
  params: any;
  label: string;
  canDelete: boolean;

  agInit(params: any): void {
    this.params = params;
    this.canDelete = this.params.canDelete;
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
        rowData: this.params.node.data,
        // ...something
      };
      this.params.onClick(params);
    }
  }
}
