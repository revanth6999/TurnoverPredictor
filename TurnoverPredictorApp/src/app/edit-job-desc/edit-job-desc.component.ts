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
import { User } from '../_models/User';

@Component({
  selector: 'app-edit-job-desc',
  templateUrl: './edit-job-desc.component.html',
  styleUrls: ['./edit-job-desc.component.css']
})

export class EditJobDescComponent implements OnInit {

  editJDForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userId: number;
  managers: User[];

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

    this.userService.getManagers().subscribe((managers: User[]) => {
      this.managers = managers;
    }, error => {
      console.log('Could not get managers');
    });
  }

  updateJobDescription(): void {
    if (!this.editJDForm.valid) {
      return;
    }
    this.editJDForm.value.id = this.userId;
    this.editJDForm.value.managerId = parseInt(this.editJDForm.value.managerId, 10);
    this.editJDForm.value.jobLevel = parseInt(this.editJDForm.value.jobLevel, 10);
    console.log('rray', this.editJDForm.value);
    this.userService.updateJobDesc(this.editJDForm.value).subscribe((response) => {
      this.snackBar.open('Job description updated', '',
        {
          duration: 2000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, error => {
      console.log(error);
      this.snackBar.open('Could not update job description', '',
        {
          duration: 3000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    });
  }
}
