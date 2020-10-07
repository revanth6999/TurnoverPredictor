import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  TurnoverPredictorAPIUrl = environment.TurnoverPredictorAPIUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  submitFeedback(model: any) {
    console.log('feedback service', model);
    return this.http.post(this.TurnoverPredictorAPIUrl + 'feedbacks/submit', model, httpOptions);
  }
}