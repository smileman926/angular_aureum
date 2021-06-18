import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
    <div class="actionIcon">
      <a
        class="viewI"
        (click)="onClick($event)"
        matTooltip="View order history"
      >
        <i class="material-icons edit-icons" (click)="onClick($event)"
          >preview</i
        >
      </a>
    </div>
  `,
})
export class ViewOrderHistoryButtonRenderer
  implements ICellRendererAngularComp
{
  params: any;
  label: string;

  agInit(params: any): void {
    this.params = params;
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
