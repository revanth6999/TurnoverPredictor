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
import { CompensationService } from '../_services/compensation.service';

@Component({
  selector: 'app-edit-compensation',
  templateUrl: './edit-compensation.component.html',
  styleUrls: ['./edit-compensation.component.css']
})

export class EditCompensationComponent implements OnInit {

  editCompForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private compensationService: CompensationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {
      this.userId = data.userId;
    }


  ngOnInit(): void {
    this.editCompForm = this.formBuilder.group({
      businessTravel: [null],
      annualIncome: [null],
      percentSalaryHike: [null],
      dailyRate: [null],
      stockOptionLevel: [null]
    });
    console.log('in dilg', this.userId);
  }

  updateJobDescription(): void {
    if (!this.editCompForm.valid) {
      return;
    }
    this.editCompForm.value.id = this.userId;
    this.editCompForm.value.managerId = parseInt(this.editCompForm.value.managerId, 10);
    console.log('rray2', this.editCompForm.value);
    this.userService.updateJobDesc(this.editCompForm.value).subscribe((response) => {
      this.snackBar.open('Compensation details updated', '',
        {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, error => {
      console.log(error);
      this.snackBar.open('Could not update compensation details', '',
        {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    });
  }
}

