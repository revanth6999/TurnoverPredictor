import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from '../feedback/feedback.component';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {}


  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      dateOfBirth: [null],
      gender: [null],
      education: [null],
      educationField: [null],
      maritalStatus: [null],
      numCompaniesWorked: [null],
      totalWorkingYears: [null],
      distanceFromHome: [null],
    });
    console.log(this.authService.currentUser);
  }

  updateProfile(): void {
    this.profileForm.value.id = 2; // this.authService.currentUser.id;
    console.log(this.profileForm.value);
    this.userService.updateUserProfile(this.profileForm.value).subscribe(() => {
      this.snackBar.open('Profile updated', '',
      {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => {
      this.snackBar.open('Profile update failed', '',
      {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }

  openFeedbackDlg(): void {
    console.log('feedback');
    this.dialog.open(FeedbackComponent);
  }
}
