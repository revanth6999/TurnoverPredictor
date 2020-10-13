import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AvgFeedback } from '../_models/AvgFeedback';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  WorkforceManagerAPIUrl = environment.WorkforceManagerAPIUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  submitFeedback(model: any) {
    console.log('feedback service', model);
    return this.http.post(this.WorkforceManagerAPIUrl + 'feedbacks/submit', model, httpOptions);
  }

  getAverage(): Observable<AvgFeedback> {
    return this.http.get<AvgFeedback>(this.WorkforceManagerAPIUrl + 'feedbacks/average', httpOptions);
  }
}
