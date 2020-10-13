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
  selector: 'app-remove-employee',
  templateUrl: './remove-employee.component.html',
  styleUrls: ['./remove-employee.component.css']
})
export class RemoveEmployeeComponent implements OnInit {

  removeEmployeeForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  userId: number;
  emailHidden: string;
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
      this.emailHidden = data.email;
    }


  ngOnInit(): void {
    this.removeEmployeeForm = this.formBuilder.group({
      hidden: [this.emailHidden],
      email: [null, Validators.required],
    }, {
      validator: MustMatch('hidden', 'email')
    });
    console.log(this.removeEmployeeForm);
  }

  removeEmployee(): void {
    if (!this.removeEmployeeForm.valid) {
      return;
    }
    this.removeEmployeeForm.value.id = this.userId;
    this.userService.removeEmployee(this.userId).subscribe((response) => {
        this.snackBar.open('Employee removed', '',
        {
          duration: 2000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }, error => {
        console.log(error);
        this.snackBar.open('Could not remove employee', '',
          {
            duration: 3000,
            panelClass: ['my-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      });
  }
}
