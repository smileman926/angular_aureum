import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import * as lodash from "lodash";
import { BuyersStatus } from "../../shared/models/BuyersStatus.model";

@Component({
  selector: "app-button-renderer",
  template: `
    <div class="status-options-wrapper">
      <ng-template [ngIf]="canChangeStatus" [ngIfElse]="statusLabel">
        <mat-form-field>
          <mat-label>Status</mat-label>
          <mat-select
            [value]="params.data.status ? params.data.status : 'regular'"
            (valueChange)="onChange($event)"
          >
            <mat-option
              *ngFor="let status of buyersStatuses"
              [value]="status.key"
            >
              {{ status.title }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </ng-template>
      <ng-template #statusLabel>
        {{ params.data.status ? params.data.status : "Regular" }}
      </ng-template>
    </div>
  `,
})
export class ChangeBuyerStatusRendererComponent
  implements ICellRendererAngularComp {
  params: any;
  label: string;
  buyersStatuses: BuyersStatus[] = [];
  canChangeStatus: boolean;

  agInit(params: any): void {
    this.params = params;
    this.buyersStatuses = lodash.concat(
      this.buyersStatuses,
      this.params.buyersStatuses
    );
    this.canChangeStatus = this.params.canChangeStatus;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onChange($event) {
    if (this.params.onChange instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        // ...something
      };
      this.params.onChange(params);
    }
  }
}
