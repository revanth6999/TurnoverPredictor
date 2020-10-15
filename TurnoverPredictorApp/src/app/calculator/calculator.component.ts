import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Manager } from '../_models/Manager';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { PredictService } from '../_services/predict.service';
import * as Chart from 'chart.js';
import { UserService } from '../_services/user.service';

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

  predictChart2: Chart;
  grpTravel: number;
  indTravel: number;
  acc: number;
  days: number;
  rate: number;
  size: number;
  strength: number;
  result: number;
  // showCalculator: boolean;
  showPrediction: boolean;
  showCalculated: boolean;
  employeeTurnover: number;
  turnover: number;

  constructor(
    private formBuilder: FormBuilder,
    private predictService: PredictService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.result = 0;
    // this.showCalculator = false;
    this.showPrediction = false;
    this.showCalculated = false;
    this.calculatorForm = this.formBuilder.group({
      teamSize: [1],
      rate: [1],
      grpTravel: [0],
      indTravel: [0],
      acc: [0]
    });

    this.predictET();

    this.userService.getUsers().subscribe((users) => {
      this.strength = users.length;
      // this.strength = 15;
    }, error => {
      this.strength = 15;
      console.log('strength calc error');
    });
  }

  calculate(): void {

    this.grpTravel = parseInt(this.calculatorForm.value.grpTravel, 10);
    this.acc = parseInt(this.calculatorForm.value.acc, 10);
    this.indTravel = parseInt(this.calculatorForm.value.indTravel, 10);
    this.rate = parseInt(this.calculatorForm.value.rate, 10);
    this.size = this.calculatorForm.value.teamSize;

    this.days = Math.ceil(Math.ceil(this.employeeTurnover * this.strength) / (this.rate * 100));
    console.log('ray', this.days);
    // console.log(this.days, this.employeeTurnover, this.rate, this.strength);

    this.result = (this.grpTravel) +
                  (this.acc + this.indTravel) * this.days * this.size;

    this.showCalculated = true;
  }

  predictET(): void {
    this.predictService.predictEmployeeTurnover().subscribe(next => {
      this.employeeTurnover = parseFloat(next.toString());
      console.log('et', this.employeeTurnover);
      this.showPrediction = true;
      this.predictChart2 = this.createChart('predictCanvas2', ['Turnover %', 'Retention %'], this.employeeTurnover);
      this.snackBar.open('Employee turnover prediction success', '',
        {
          duration: 2000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }, error => {
        this.employeeTurnover = 8.5;
        this.predictChart2 = this.createChart('predictCanvas2', ['Turnover %', 'Retention %'], this.employeeTurnover);
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


  trainET(): void {
    this.predictService.trainEmployeeTurnover().subscribe(next => {
      this.snackBar.open('Model training success', '',
        {
          duration: 2000,
          panelClass: ['my-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }, error => {
        this.snackBar.open('Model training failed', '',
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

  createChart(id: string, chartLabels: [string, string], num: number): Chart {
    const newChart = new Chart(id, {
      type: 'doughnut',
      data: {
        labels: chartLabels,
        datasets: [
          {
            data: [num, 100 - num],
            backgroundColor: [
                  'rgba(0, 129, 138, 1)',
                  'rgba(40, 49, 73, 1)',
                ],
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        // title: {
        //   display: true,
        //   text: 'Revanth Nallam',
        // }
      }
    });
    return newChart;
  }
}
