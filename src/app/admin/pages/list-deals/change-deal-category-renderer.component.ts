import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import * as lodash from "lodash";
import { BuyersStatus } from "../../shared/models/BuyersStatus.model";
import { ProductCategory } from "../../shared/models/ProductCategory.model";

@Component({
  selector: "app-button-renderer",
  template: `
    <div class="status-options-wrapper">
      <mat-form-field>
        <mat-label>Category</mat-label>
        <mat-select
          [value]="params.data.category ? params.data.category : 'Test'"
          (valueChange)="onChange($event)"
        >
          <mat-option
            *ngFor="let category of categories"
            [value]="category.category_name"
          >
            {{ category.category_name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
})
export class ChangeDealCategoryRendererComponent
  implements ICellRendererAngularComp {
  params: any;
  label: string;
  categories: ProductCategory[] = [];

  agInit(params: any): void {
    this.params = params;
    console.log(params.data.category);
    this.categories = lodash.concat(this.categories, this.params.categories);
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
