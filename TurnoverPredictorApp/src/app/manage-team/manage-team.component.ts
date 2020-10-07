import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { PerformanceReviewComponent } from '../performance-review/performance-review.component';

export interface User {
  ID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  JobRole: string;
  JobLevel: string;
  Department: string;
}

const users: User[] = [
  {ID: 1, FirstName: 'Hydrogn', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 'associate',
  Department: 'iHCM'},
  {ID: 2, FirstName: 'Helium', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 'associate',
  Department: 'iHCM'},
  {ID: 3, FirstName: 'Lithium', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 'associate',
  Department: 'iHCM'},
  {ID: 4, FirstName: 'Beryllium', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 'associate',
  Department: 'iHCM'},
  {ID: 5, FirstName: 'Boron', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 'associate',
  Department: 'iHCM'},
  {ID: 6, FirstName: 'Carbon', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 'associate',
   Department: 'iHCM'},
];

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManageTeamComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'FirstName', 'LastName', 'Email', 'JobRole', 'JobLevel', 'Department'];
  dataSource = users;
  expandedUser: User | null;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openPerfomanceDlg(element): void {
    console.log(element);
    this.dialog.open(PerformanceReviewComponent, {
      data: {
        userId: element.ID,
      }
    });
  }

}
