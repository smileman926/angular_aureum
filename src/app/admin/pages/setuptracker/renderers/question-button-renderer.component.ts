import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-question-button-renderer',
  template: `
    <button (click)="onClick($event)" mat-stroked-button mat-button>
        {{ label }}
      <span *ngIf="countQuestions !== 0">
        ({{ countQuestions }})
      </span>
    </button>
  `
})

export class QuestionButtonRendererComponent implements ICellRendererAngularComp {
  params: any;
  label: string;
  countQuestions = 0;

  agInit(params: any): void {
    this.params =  params;

    if (this.params.data.questionary) {
      this.countQuestions = this.params.data.questionary.questions.length;
    }
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
        rowData: this.params.node.data
        // ...something
      };
      this.params.onClick(params);

    }
  }
}
