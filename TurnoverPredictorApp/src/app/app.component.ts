import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // tslint:disable-next-line: no-trailing-whitespace

  jwtHelper = new JwtHelperService();
  opened = false;
  currentUser: User;

  constructor(public authService: AuthService) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this.authService.currentUser = user;
    }
  }
  // tslint:disable-next-line: typedef
  toggleSideNav(opened: boolean){
    this.opened = opened;
  }
  loggedIn(): boolean{
    return this.authService.loggedIn();
  }
}
