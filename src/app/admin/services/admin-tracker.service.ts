import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrlConstant } from 'src/app/core/constant/api-url.constant';
import { Observable } from 'rxjs';
import { Question } from '../shared/models/Questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class AdminTrackerService {

  constructor(private http: HttpClient) { }

  updateQuestionnaire(idProduct: string, questions: Question[]): Observable<any> {
    return this.http.put(`${ApiUrlConstant.UPDATEQUESTIONNIRE}/${idProduct}`, {
      questionary: {
        questions,
      },
    });
  }
}
