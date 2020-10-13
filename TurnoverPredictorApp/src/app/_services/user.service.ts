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

  WorkforceManagerAPIUrl = environment.WorkforceManagerAPIUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.WorkforceManagerAPIUrl + 'users', httpOptions);
  }

  getUsersUnderManager(id): Observable<User[]> {
    return this.http.get<User[]>(this.WorkforceManagerAPIUrl + 'users/manager/' + id, httpOptions);
  }

  getManagers(): Observable<User[]> {
    return this.http.get<User[]>(this.WorkforceManagerAPIUrl + 'users/managers', httpOptions);
  }

  getUsersWithCompensation(): Observable<UserHRModel[]> {
    return this.http.get<UserHRModel[]>(this.WorkforceManagerAPIUrl + 'users/compall', httpOptions);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.WorkforceManagerAPIUrl + 'users/' + id, httpOptions);
  }

  // tslint:disable-next-line: typedef
  updateUserProfile(model: any) {
    console.log('user service', model);
    return this.http.put(this.WorkforceManagerAPIUrl + 'users/updateProfile/' + model.id, model, httpOptions);
  }

  // tslint:disable-next-line: typedef
  updateJobDesc(model: any) {
    console.log('user service jd', model);
    return this.http.put(this.WorkforceManagerAPIUrl + 'users/updateJob/' + model.id, model, httpOptions);
  }

  getUsersWithoutJD(): Observable<UserHRModel[]> {
    return this.http.get<UserHRModel[]>(this.WorkforceManagerAPIUrl + 'users/jobdes', httpOptions);
  }

  getUsersWithoutCompensation(): Observable<UserHRModel[]> {
    return this.http.get<UserHRModel[]>(this.WorkforceManagerAPIUrl + 'users/compen', httpOptions);
  }

  getUsersUnderManagerNotRated(id): Observable<User[]> {
    return this.http.get<User[]>(this.WorkforceManagerAPIUrl + 'users/manager/' + id + '/notrated', httpOptions);
  }

  // tslint:disable-next-line: typedef
  removeEmployee(id) {
    return this.http.delete(this.WorkforceManagerAPIUrl + 'users/' + id, httpOptions);
  }
}
