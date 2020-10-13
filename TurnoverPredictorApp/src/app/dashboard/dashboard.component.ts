import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../_services/feedback.service';
import { PerformanceService } from '../_services/performance.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AvgFeedback } from '../_models/AvgFeedback';
import { AvgPerformance } from '../_models/AvgPerformance';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  feedbackAvg: AvgFeedback;
  performanceAvg: AvgPerformance;

  constructor(private feedbackService: FeedbackService,
              private performanceService: PerformanceService,
              private router: Router,
              private authService: AuthService,
              ) { }

  ngOnInit(): void {
    this.feedbackService.getAverage().subscribe((avgFeedback: AvgFeedback) => {
      console.log(avgFeedback);
      this.feedbackAvg = avgFeedback;
    }, error => {
      console.log('get avg feedback error');
    });
    this.performanceService.getAverage().subscribe((avgPerformance: AvgPerformance) => {
      console.log(avgPerformance);
      this.performanceAvg = avgPerformance;
    }, error => {
      console.log('get avg performance error');
    });
  }

}
