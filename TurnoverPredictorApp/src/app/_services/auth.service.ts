import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TurnoverPredictorAPIUrl = environment.TurnoverPredictorAPIUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  login(model: any) {
    return this.http
      .post(this.TurnoverPredictorAPIUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const loginResponse = response;
          if (loginResponse) {
            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('user', JSON.stringify(loginResponse.user));
            this.currentUser = loginResponse.user;
            this.decodedToken = this.jwtHelper.decodeToken(loginResponse.token);
          }
      })
    );
  }
  // tslint:disable-next-line: typedef
  register(model: any) {
    return this.http.post(this.TurnoverPredictorAPIUrl + 'register', model);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
