import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Manager } from '../_models/Manager';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { PredictService } from '../_services/predict.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  calculatorForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmPasswordCtrl = new FormControl('', [Validators.required]);

  grpTravel: number;
  grpFood: number;
  grpAcc: number;
  thirdParty: number;
  indTravel: number;
  indFood: number;
  indOther: number;
  indAcc: number;
  days: number;
  size: number;
  result: number;
  showCalculator: boolean;
  showPrediction: boolean;
  employeeTurnover: string;

  constructor(
    private formBuilder: FormBuilder,
    private predictService: PredictService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.result = 0;
    this.showCalculator = false;
    this.showPrediction = false;
    this.calculatorForm = this.formBuilder.group({
      teamSize: [1],
      days: [1],
      grpTravel: [0],
      grpFood: [0],
      grpAcc: [0],
      thirdParty: [0],
      indTravel: [0],
      indFood: [0],
      indOther: [0],
      indAcc: [0]
    });
  }

  calculate(): void {

    this.grpTravel = parseInt(this.calculatorForm.value.grpTravel, 10);
    this.grpFood = parseInt(this.calculatorForm.value.grpFood, 10);
    this.grpAcc = parseInt(this.calculatorForm.value.grpAcc, 10);
    this.thirdParty = parseInt(this.calculatorForm.value.thirdParty, 10);
    this.indTravel = parseInt(this.calculatorForm.value.indTravel, 10);
    this.indFood = parseInt(this.calculatorForm.value.indFood, 10);
    this.indOther = parseInt(this.calculatorForm.value.indOther, 10);
    this.indAcc = parseInt(this.calculatorForm.value.indAcc, 10);
    this.days = this.calculatorForm.value.days;
    this.size = this.calculatorForm.value.teamSize;

    this.result = (this.grpTravel + this.grpFood + this.grpAcc + this.thirdParty) +
                  (this.indFood + this.indAcc + this.indOther + this.indTravel) * this.days * this.size;

    alert(this.result);
  }

  predictET(): void {
    this.predictService.predictEmployeeTurnover().subscribe((result: number) => {
      this.employeeTurnover = (100 - result).toFixed(2);
      this.showPrediction = true;
      this.snackBar.open('Employee turnover prediction success', '',
        {
          duration: 2000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }, error => {
        this.snackBar.open('Employee turnover prediction failed', '',
        {
          duration: 2000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return;
      }
    );
  }
}