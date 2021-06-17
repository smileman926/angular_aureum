import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-button-renderer",
  template: `
    <div class="actionIcon">
      <i
        *ngIf="params.data.isApproved"
        class="fa fa-check"
        aria-hidden="true"
      ></i>
      <a
        class="viewI"
        matTooltip="Approve"
        *ngIf="!params.data.isApproved"
        (click)="onClick($event)"
      >
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
      </a>

      <a class="viewI" matTooltip="Delete" (click)="onClick($event)">
        <i class="material-icons delete-icons">delete</i>
      </a>
    </div>
  `,
})
export class TestimonialActionsButtonsRendrerComponent
  implements ICellRendererAngularComp {
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
