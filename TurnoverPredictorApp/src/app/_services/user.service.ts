import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { UserHRModel } from '../_models/UserHRModel';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  TurnoverPredictorAPIUrl = environment.TurnoverPredictorAPIUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.TurnoverPredictorAPIUrl + 'users', httpOptions);
  }

  getManagers(): Observable<User[]> {
    return this.http.get<User[]>(this.TurnoverPredictorAPIUrl + 'users/managers', httpOptions);
  }

  getUsersWithCompensation(): Observable<UserHRModel[]> {
    return this.http.get<UserHRModel[]>(this.TurnoverPredictorAPIUrl + 'users/compall', httpOptions);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.TurnoverPredictorAPIUrl + 'users/' + id, httpOptions);
  }

  // tslint:disable-next-line: typedef
  updateUserProfile(model: any) {
    console.log('user service', model);
    return this.http.put(this.TurnoverPredictorAPIUrl + 'users/updateProfile/' + model.id, model, httpOptions);
  }

  // tslint:disable-next-line: typedef
  updateJobDesc(model: any) {
    console.log('user service jd', model);
    return this.http.put(this.TurnoverPredictorAPIUrl + 'users/updateJob/' + model.id, model, httpOptions);
  }
}
