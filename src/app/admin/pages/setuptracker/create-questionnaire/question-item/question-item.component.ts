import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../../../shared/models/Questionnaire.model';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss']
})
export class QuestionItemComponent implements OnInit {
  @Input() question: Question;
  @Output() handleRemoveQuestion = new EventEmitter<string>();
  @Output() handleUpdateQuestion = new EventEmitter<Question>();

  showEditQuestion = false;

  constructor() { }

  ngOnInit() {
  }

  removeQuestion() {
    this.handleRemoveQuestion.emit(this.question._id);
  }

  updateQuestion(question: Question) {
    this.handleUpdateQuestion.emit(question);
    this.showEditQuestion = false;
  }
}
