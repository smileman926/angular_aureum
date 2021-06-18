import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
@Component({
  selector: "app-open-modal-detail",
  templateUrl: "./open-modal-detail.component.html",
})
export class OpenModalDetailComponent implements ICellRendererAngularComp {
  data: any;
  params: any;

  agInit(params: any) {
    this.params = params;
    this.data = params.data;
  }

  refresh(params: any): boolean {
    return true;
  }

  handleClick() {
    this.params.onClick(this.data);
  }
}
