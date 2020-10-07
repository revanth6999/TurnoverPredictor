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

export class CompensationService {

  TurnoverPredictorAPIUrl = environment.TurnoverPredictorAPIUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  updateCompensation(model: any) {
    console.log('compensation service', model);
    return this.http.post(this.TurnoverPredictorAPIUrl + 'users/compensations/submit', model, httpOptions);
  }
}
