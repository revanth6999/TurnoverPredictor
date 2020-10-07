import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Output() toggleOpened = new EventEmitter();
  opened = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggle(): void{
    this.opened = !this.opened;
    this.toggleOpened.emit(this.opened);
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  loggedIn(): boolean{
    return this.authService.loggedIn();
  }
}
