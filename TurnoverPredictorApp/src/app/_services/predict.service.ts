import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  TurnoverPredictorAPIUrl = environment.TurnoverPredictorAPIUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  predictEmployeeTurnover() {
    return this.http.get(this.TurnoverPredictorAPIUrl + 'predict');
  }

  // tslint:disable-next-line: typedef
  trainEmployeeTurnover() {
    return this.http.get(this.TurnoverPredictorAPIUrl + 'train');
  }

}
