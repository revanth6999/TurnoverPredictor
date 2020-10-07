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
  selector: 'app-edit-job-desc',
  templateUrl: './edit-job-desc.component.html',
  styleUrls: ['./edit-job-desc.component.css']
})

export class EditJobDescComponent implements OnInit {

  editJDForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) {
      this.userId = data.userId;
    }


  ngOnInit(): void {
    this.editJDForm = this.formBuilder.group({
      jobRole: [null],
      jobLevel: [null],
      department: [null],
      managerId: [null],
    });
    console.log('in dilg', this.userId);
  }

  updateJobDescription(): void {
    if (!this.editJDForm.valid) {
      return;
    }
    this.editJDForm.value.id = this.userId;
    this.editJDForm.value.managerId = parseInt(this.editJDForm.value.managerId, 10);
    console.log('rray', this.editJDForm.value);
    this.userService.updateJobDesc(this.editJDForm.value).subscribe((response) => {
      this.snackBar.open('Job description updated', '',
        {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, error => {
      console.log(error);
      this.snackBar.open('Could not update job description', '',
        {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    });
  }
}
