import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Question } from '../../../shared/models/Questionnaire.model';
import { AdminTrackerService } from 'src/app/admin/services/admin-tracker.service';

@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.scss']
})
export class CreateQuestionnaireComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() id: string;
  @Input() questions: Question[] = [];
  @Output() changeProduct = new EventEmitter<{ id: string, product: any}>();

  listQuestions: Question[] = [];
  isOpenForm = false;

  constructor(
    private trackerService: AdminTrackerService,
  ) {}

  ngOnInit() {
    this.listQuestions = this.questions;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.listQuestions = changes.questions.currentValue;
  }

  createNewQuestion(question: Question) {
    const sendQuestions = [...this.listQuestions, question];

    this.updateData(sendQuestions);
    this.isOpenForm = false;
  }

  removeQuestion(idQuestion: string) {
    const filterQuestion = this.listQuestions.filter(el => el._id !== idQuestion);

    this.updateData(filterQuestion);
  }

  updateQuestion(question: Question) {
    const updateList = this.listQuestions.map((el) => {
      if (el._id === question._id) {
        return question;
      }
      return el;
    });

    this.updateData(updateList);
  }

  updateData(listQuestion: Question[]) {
    this.trackerService.updateQuestionnaire(this.id, listQuestion).subscribe(res => {
      const { questions } = res.questionary;
      this.listQuestions = questions;

      this.changeQuestion(res);
    });
  }

  changeQuestion(product: any) {
    this.changeProduct.emit({ id: this.id, product });
  }
}
