import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-button-renderer",
  template: `
    <div class="actionIcon">
      <a class="viewI" (click)="onClick($event)" matTooltip="Answer Faq">
        <i class="material-icons edit-icons">edit</i>
      </a>
      <a class="viewI" matTooltip="Delete" (click)="onClick($event)">
        <i class="material-icons delete-icons">delete</i>
      </a>
      <a class="viewI" matTooltip="View" (click)="onClick($event)">
        <i class="fa fa-eye" aria-hidden="true"></i>
      </a>
    </div>
  `,
})
export class InstructionActionsButtonsRendrerComponent
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
