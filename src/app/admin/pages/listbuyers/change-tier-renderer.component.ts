import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as lodash from 'lodash';
import { TierModel } from '../../shared/models/Tier.model';

@Component({
  selector: 'app-change-tier-renderer',
  template: `
    <div class="status-options-wrapper">
      <ng-template [ngIf]="canChangeStatus" [ngIfElse]="statusLabel">
        <mat-form-field>
          <mat-label>Status</mat-label>
          <mat-select
            [value]="params.value ? params.value : 'Started'"
            (valueChange)="onChange($event)"
          >
            <mat-option
              *ngFor="let status of tiersList"
              [value]="status.name"
            >
              {{ status.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </ng-template>
      <ng-template #statusLabel>
        {{ params.value ? params.value : 'Started' }}
      </ng-template>
    </div>
  `,
})
export class ChangeTierRendererComponent
  implements ICellRendererAngularComp {
  params: any;
  label: string;
  tiersList: TierModel[] = [];
  canChangeStatus: boolean;

  agInit(params: any): void {
    this.params = params;
    this.tiersList = this.params.listTiers;
    this.canChangeStatus = this.params.canChangeStatus;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onChange($event) {
    if (this.params.onChange instanceof Function) {
      const findTier = this.tiersList.find((el) => el.name === $event);

      const params = {
        event: $event,
        id_tier: findTier._id,
        rowData: this.params.node.data,
      };

      this.params.onChange(params);
    }
  }
}
