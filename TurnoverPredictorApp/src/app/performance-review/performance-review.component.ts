import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';
import { PerformanceService } from '../_services/performance.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.css']
})

export class PerformanceReviewComponent implements OnInit {

  performanceForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private performanceService: PerformanceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {
      this.userId = data.userId;
    }


  ngOnInit(): void {
    this.performanceForm = this.formBuilder.group({
      trainingTimesLastYear: [null],
      overTime: [null],
      performanceRating: [null],
      jobInvolvement: [null],
    });
    console.log('in dilg', this.userId);
  }

  submitPerformance(): void {
    if (!this.performanceForm.valid) {
      this.snackBar.open('Please enter all fields', '',
        {
          duration: 3000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      return;
    }
    this.performanceForm.value.userId = this.userId; // this.authService.currentUser.id;
    this.performanceForm.value.performanceRating = parseInt(this.performanceForm.value.performanceRating, 10);
    this.performanceForm.value.jobInvolvement = parseInt(this.performanceForm.value.jobInvolvement, 10);
    console.log(this.performanceForm.value);
    this.performanceService.submitPerformance(this.performanceForm.value).subscribe((response) => {
      this.snackBar.open('Performance review submitted', '',
        {
          duration: 2000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, error => {
      console.log(error);
      this.snackBar.open('Could not submit performance review', '',
        {
          duration: 3000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    });
  }
}
