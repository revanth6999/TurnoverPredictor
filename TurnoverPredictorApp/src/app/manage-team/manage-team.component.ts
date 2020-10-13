import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { PerformanceReviewComponent } from '../performance-review/performance-review.component';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

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

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'jobRole', 'jobLevel', 'department'];
  dataSource: any;
  expandedUser: User | null;

  constructor(private dialog: MatDialog, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.userService.getUsersUnderManager(this.authService.currentUser.id).subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource(users);
    }, error => {
      console.log('get users error');
    });
  }

  openPerfomanceDlg(element): void {
    console.log(element);
    this.dialog.open(PerformanceReviewComponent, {
      data: {
        userId: element.id,
      }
    }).afterClosed()
    .subscribe(response => {
      this.refresh();
    });;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange(event): void {
    console.log(event.value);
    if (event.value === 'all')
    {
      this.userService.getUsersUnderManager(this.authService.currentUser.id).subscribe((users: User[]) => {
        this.dataSource = new MatTableDataSource(users);
      }, error => {
        console.log('get users error');
      });
    }
    else if (event.value === 'pending')
    {
      this.userService.getUsersUnderManagerNotRated(this.authService.currentUser.id).subscribe((users: User[]) => {
        this.dataSource = new MatTableDataSource(users);
      }, error => {
        console.log('get users error');
      });
    }
  }
}















  // const users: User[] = [
  //   {ID: 1, FirstName: 'Hydrogn', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
  //   Department: 'iHCM'},
  //   {ID: 2, FirstName: 'Helium', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
  //   Department: 'iHCM'},
  //   {ID: 3, FirstName: 'Lithium', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
  //   Department: 'iHCM'},
  //   {ID: 4, FirstName: 'Beryllium', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
  //   Department: 'iHCM'},
  //   {ID: 5, FirstName: 'Boron', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
  //   Department: 'iHCM'},
  //   {ID: 6, FirstName: 'Carbon', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
  //    Department: 'iHCM'},
  // ];

