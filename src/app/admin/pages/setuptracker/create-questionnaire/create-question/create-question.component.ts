import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Question, QuestionAnswer } from '../../../../shared/models/Questionnaire.model';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  @Input() editQuestion: Question;
  @Input() isEdit = false;
  @Output() handlerCreateQuestion = new EventEmitter<Question>();
  @Output() handleCancelForm = new EventEmitter();

  selectRightAnswer: number;
  listAnswers: QuestionAnswer[] = [];
  answerForm: any;
  nameQuestion: FormControl;
  isHasErrorRightAnswer = false;
  isErrorLengthAnswer = false;

  constructor() {
    this.nameQuestion = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.answerForm = new FormGroup({
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  ngOnInit() {
    if (this.isEdit) {
      const { answers, title, correct } = this.editQuestion;
      this.nameQuestion.setValue(title);
      this.listAnswers = answers;
      this.selectRightAnswer = correct[0];
    }
  }

  get answerLabelValue() {
    return this.answerForm.get('label').value;
  }

  getErrorMessage() {
    if (this.answerForm.controls.label.hasError('required')) {
      return 'You must enter a value';
    }
    return 'You must enter min 2 symbol';
  }

  createNewAnswer(formData: any, formDirective: FormGroupDirective) {
    const validForm = this.answerForm.invalid;
    if (!validForm) {
      this.listAnswers.push({
        title: this.answerLabelValue,
        id: this.listAnswers.length,
      });

      formDirective.resetForm();
      this.answerForm.reset({
        label: '',
      });
    }

    this.validateLengthAnswers();
  }

  removeAnswer(id: number) {
    if (this.selectRightAnswer === id) {
      this.selectRightAnswer = null;
    }

    this.listAnswers = this.listAnswers.filter((el) => el.id !== id);
  }

  createNewQuestion() {
    const validateForm = this.nameQuestion.valid;
    const validAnswers = this.validateLengthAnswers();
    const validSelectRightAnswer = this.validateRightAnswerField();

    if (validateForm && !validAnswers && !validSelectRightAnswer) {
      let questionData = {
        title: this.nameQuestion.value,
        answers: this.listAnswers,
        correct: [this.selectRightAnswer],
      };

      if (this.isEdit) {
        questionData = {
          ...this.editQuestion,
          ...questionData,
        };
      }

      this.resetValues();
      this.handlerCreateQuestion.emit(questionData);
    }
  }

  resetValues() {
    this.nameQuestion.reset();
    this.nameQuestion.setErrors(null);
    this.selectRightAnswer = null;
    this.listAnswers = [];
  }

  cancelForm() {
    this.handleCancelForm.emit();
  }

  validateRightAnswerField(): boolean {
    if (this.selectRightAnswer === undefined || this.selectRightAnswer === null) {
      this.isHasErrorRightAnswer = true;
    } else {
      this.isHasErrorRightAnswer = false;
    }

    return this.isHasErrorRightAnswer;
  }

  validateLengthAnswers() {
    if (this.listAnswers.length === 0) {
      this.isErrorLengthAnswer = true;
    } else {
      this.isErrorLengthAnswer = false;
    }
    return this.isErrorLengthAnswer;
  }
}
