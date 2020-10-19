import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserEngageModel } from '../_models/UserEngageModel';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import * as Chart from 'chart.js';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-engage',
  templateUrl: './engage.component.html',
  styleUrls: ['./engage.component.css']
})
export class EngageComponent implements OnInit {

  user: User;
  perfCharts: Chart[] = [];
  feedCharts: Chart[] = [];
  users: UserEngageModel[];
  leavingUsers: UserEngageModel[] = [];
  leavingUserProbs: number[] = [];
  chart: Chart;
  keys: any;
  maxBarThickness = 30;
  scores = [
    0.012,
    0.001,
    0.005,
    0.042,
    0.157,
    0.225,
    0.012,
    0.056,
    0.237,
    0.129,
    0.136,
    0.055,
    0.078,
    0.111
  ];
  pOptions =  {
    title: {
      display: true,
      text: 'PERFORMANCE'
    },
    scales: {
      xAxes: [{
        gridLines: {
            color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
            color: 'rgba(0, 0, 0, 0)',
        },
        ticks: {
            min: 0,
            max: 4,
        }
      }]
    },
    legend: {
      display: false,
    }
  };

  fOptions =  {
    title: {
      display: true,
      text: 'FEEDBACK'
    },
    scales: {
      xAxes: [{
        gridLines: {
            color: 'rgba(0, 0, 0, 0)',
        }
      }],
      yAxes: [{
        display: false,
        gridLines: {
          color: 'rgba(0, 0, 0, 0)',
        },
        ticks: {
            min: 0,
            max: 4,
        }
      }]
    },
    legend: {
      display: false,
    }
  };

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.user = this.authService.currentUser;
    this.userService.getUsersModel().subscribe((users: UserEngageModel[]) => {
      this.users = users;
      // console.log(this.users);
      for (let i = 0; i < users.length; i++) {
        if (this.scores[i] > 0.2)
        {
          this.leavingUsers.push(users[i]);
          this.leavingUserProbs.push(this.scores[i] * 100);
        }
      }
      const range = n => Array.from({length: n}, (value, key) => key);
      this.keys = range(this.leavingUsers.length);
    }, error => {
      console.log('get users error');
    });
  }

  loadCharts(): void {
    console.log('load charts');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.leavingUsers.length; i++) {
      // console.log(user);
      this.loadChart(i);
    }
  }

  loadChart(index: number): void {
    console.log('load chart');
    const newPerfChart = this.createPerfChart(index);
    const newFeedChart = this.createFeedChart(index);
    this.perfCharts.push(newPerfChart);
    this.feedCharts.push(newFeedChart);
  }

  createFeedChart(index: number): Chart {
    const red = 'rgba(182, 66, 1, 1)';
    const orange = 'rgba(219, 130, 0, 1)';
    const yellow = 'rgba(245, 188, 12, 1)';
    const green = 'rgba(101, 174, 7, 1)';
    const data: number[] = [];
    const backgroundColor: string[] = [];
    const u = this.leavingUsers[index];
    const feedData: number[] = [];
    feedData.push(u.jobSatisfaction);
    feedData.push(u.environmentSatisfaction);
    feedData.push(u.workLifeBalance);

    feedData.forEach(f => {
      switch (f)
      {
        case 1: data.push(1);
                backgroundColor.push(red);
                break;
        case 2: data.push(2);
                backgroundColor.push(orange);
                break;
        case 3: data.push(3);
                backgroundColor.push(yellow);
                break;
        case 4: data.push(4);
                backgroundColor.push(green);
                break;
      }
    });

    const newChart = new Chart('fCanvas' + u.id, {
      type: 'bar',
      data: {
          labels: ['Job Satisfaction', 'Env. Satisfaction', 'Work Life Balance'],
          datasets: [{
              maxBarThickness: this.maxBarThickness,
              data,
              backgroundColor
          }]
      },
      options: this.fOptions,
    });
    return newChart;
  }

  createPerfChart(index: number): Chart {
    const red = 'rgba(182, 66, 1, 1)';
    const orange = 'rgba(219, 130, 0, 1)';
    const yellow = 'rgba(245, 188, 12, 1)';
    const green = 'rgba(101, 174, 7, 1)';
    const data: number[] = [];
    const backgroundColor: string[] = [];
    const u = this.leavingUsers[index];
    const perfData: number[] = [];
    perfData.push(u.performanceRating);
    perfData.push(u.jobInvolvement);

    perfData.forEach(p => {
      switch (p)
      {
        case 1: data.push(1);
                backgroundColor.push(red);
                break;
        case 2: data.push(2);
                backgroundColor.push(orange);
                break;
        case 3: data.push(3);
                backgroundColor.push(yellow);
                break;
        case 4: data.push(4);
                backgroundColor.push(green);
                break;
      }
    });

    const newChart = new Chart('pCanvas' + u.id, {
      type: 'bar',
      data: {
          labels: ['Performance Rating', 'Job Involvement.'],
          datasets: [{
              maxBarThickness: this.maxBarThickness,
              data,
              backgroundColor
          }]
      },
      options: this.pOptions,
    });
    return newChart;
  }
}

