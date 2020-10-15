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
import { User } from '../_models/User';

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
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  user: User;
  minDate: Date;
  today: Date;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {
      this.minDate = new Date();
      this.today = new Date();
    }


  ngOnInit(): void {
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);
    this.user = this.authService.currentUser;
    console.log('ray', this.user.displayPictureUrl);
    this.profileForm = this.formBuilder.group({
      dateOfBirth: [this.user.dateOfBirth],
      gender: [this.user.gender],
      education: [this.user.education.toString(10)],
      educationField: [this.user.educationField],
      maritalStatus: [this.user.maritalStatus],
      numCompaniesWorked: [this.user.numCompaniesWorked],
      totalWorkingYears: [this.user.totalWorkingYears],
      distanceFromHome: [this.user.distanceFromHome],
    });
    console.log(this.authService.currentUser);
  }

  updateProfile(): void {
    this.profileForm.value.id = this.user.id;
    console.log(this.profileForm.value);
    this.profileForm.value.education = parseInt(this.profileForm.value.education, 10);
    this.userService.updateUserProfile(this.profileForm.value).subscribe(() => {
      this.snackBar.open('Profile updated', '',
      {
        duration: 2000,
        panelClass: ['my-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.authService.updateUser();
    }, error => {
      this.snackBar.open('Profile update failed', '',
      {
        duration: 2000,
        panelClass: ['my-snackbar'],
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
