import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';
import { FeedbackService } from '../_services/feedback.service';
import { User } from '../_models/User';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {

  feedbackForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {}


  ngOnInit(): void {

    this.user = this.authService.currentUser;

    this.feedbackForm = this.formBuilder.group({
      jobSatisfaction: [null],
      environmentSatisfaction: [null],
      workLifeBalance: [null],
    });
    // console.log(this.authService.currentUser);
  }

  submitFeedback(): void {

    if (!this.feedbackForm.valid) {
      this.snackBar.open('Please enter all fields', '',
        {
          duration: 3000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      return;
    }

    this.feedbackForm.value.userId = this.user.id;
    this.feedbackForm.value.jobSatisfaction = parseInt(this.feedbackForm.value.jobSatisfaction, 10);
    this.feedbackForm.value.environmentSatisfaction = parseInt(this.feedbackForm.value.environmentSatisfaction, 10);
    this.feedbackForm.value.workLifeBalance = parseInt(this.feedbackForm.value.workLifeBalance, 10);
    console.log(this.feedbackForm.value);
    this.feedbackService.submitFeedback(this.feedbackForm.value).subscribe((response) => {
      this.snackBar.open('Feedback submitted', '',
        {
          duration: 2000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, error => {
      console.log(error);
      this.snackBar.open('Could not submit feedback', '',
        {
          duration: 3000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    });
  }
}
