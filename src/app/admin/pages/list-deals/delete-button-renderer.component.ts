import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-button-renderer",
  template: `
    <button
      *ngIf="!params.data.isDeleted"
      mat-flat-button
      color="warn"
      (click)="onClick($event)"
    >
      Delete
    </button>
    <button
      *ngIf="params.data.isDeleted"
      mat-flat-button
      color="primary"
      (click)="onClick($event)"
    >
      Reinstate
    </button>
  `,
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
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
