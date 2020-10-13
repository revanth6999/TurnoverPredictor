import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AvgPerformance } from '../_models/AvgPerformance';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})

export class PerformanceService {

  WorkforceManagerAPIUrl = environment.WorkforceManagerAPIUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  submitPerformance(model: any) {
    console.log('performance service', model);
    return this.http.post(this.WorkforceManagerAPIUrl + 'performances/submit', model, httpOptions);
  }

  getAverage(): Observable<AvgPerformance> {
    return this.http.get<AvgPerformance>(this.WorkforceManagerAPIUrl + 'performances/average', httpOptions);
  }
}
