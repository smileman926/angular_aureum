export interface Question {
  _id?: string;
  title: string;
  answers: QuestionAnswer[];
  correct: number[];
}

export interface QuestionAnswer {
  id: number;
  title: string;
}
