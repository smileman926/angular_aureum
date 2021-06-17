import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-button-renderer",
  template: `
    <div class="actionIcon">
      <a class="viewI" (click)="onClick($event)" matTooltip="Edit Log In Data">
        <i class="material-icons edit-icons">edit</i>
      </a>
      <a
        *ngIf="params.canDelete"
        class="viewI"
        (click)="onClick($event)"
        matTooltip="Delete user"
      >
        <i class="material-icons delete-icons">delete</i>
      </a>
    </div>
  `,
})
export class EditDeleteBuyerButtonRendererComponent
  implements ICellRendererAngularComp {
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
