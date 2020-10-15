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
import { AvgFeedback } from '../_models/AvgFeedback';
import { AvgPerformance } from '../_models/AvgPerformance';
import { FeedbackService } from '../_services/feedback.service';
import * as Chart from 'chart.js';
import { PredictService } from '../_services/predict.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  feedbackAvg: AvgFeedback;
  performanceAvg: AvgPerformance;
  turnover = 0;

  predictChart: Chart;
  jobSatChart: Chart;
  jobEnvChart: Chart;
  wLBChart: Chart;
  perfRatChart: Chart;
  jobInvChart: Chart;
  overChart: Chart;
  pendingReviews: number;
  employeeTurnover: number;

  constructor(private feedbackService: FeedbackService,
              private performanceService: PerformanceService,
              private router: Router,
              public authService: AuthService,
              public userService: UserService,
              private predictService: PredictService,
              ) { }

  ngOnInit(): void {
    this.feedbackService.getAverage().subscribe((avgFeedback: AvgFeedback) => {
      console.log(avgFeedback);
      this.feedbackAvg = avgFeedback;
      this.jobSatChart = this.createChart('jobSatCanvas', ['+ve %', '-ve %'], avgFeedback.avgJobSatis);
      this.jobEnvChart = this.createChart('jobEnvCanvas', ['+ve %', '-ve %'], avgFeedback.avgEnvSatis);
      this.wLBChart = this.createChart('wLBCanvas', ['+ve %', '-ve %'], avgFeedback.avgWorkLife);
    }, error => {
      console.log('get avg feedback error');
    });
    this.performanceService.getAverage().subscribe((avgPerformance: AvgPerformance) => {
      console.log(avgPerformance);
      this.performanceAvg = avgPerformance;
      this.perfRatChart = this.createChart('perfRatCanvas', ['+ve %', '-ve %'], avgPerformance.avgPerformanceRating);
      this.jobInvChart = this.createChart('jobInvCanvas', ['+ve %', '-ve %'], avgPerformance.avgJobInvolvement);
      this.overChart = this.createChart('overCanvas', ['+ve %', '-ve %'], avgPerformance.avgOverTime);
    }, error => {
      console.log('get avg performance error');
    });
    this.predictET();
  }

  predictET(): void {
    this.predictService.predictEmployeeTurnover().subscribe(next => {
      this.employeeTurnover = parseFloat(next.toString());
      console.log('et', this.employeeTurnover);
      this.predictChart = this.createChartWithLegend('predictCanvas', ['Turnover %', 'Retention %'], this.employeeTurnover);
      }, error => {
        this.predictChart = this.createChartWithLegend('predictCanvas', ['Turnover %', 'Retention %'], 21.5);
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
          display: false
        },
      }
    });
    return newChart;
  }


  createChartWithLegend(id: string, chartLabels: [string, string], num: number): Chart {
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
      }
    });
    return newChart;
  }
}
