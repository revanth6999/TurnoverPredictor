import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { EditCompensationComponent } from '../edit-compensation/edit-compensation.component';
import { EditJobDescComponent } from '../edit-job-desc/edit-job-desc.component';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { UserHRModel } from '../_models/UserHRModel';



@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ManageEmployeesComponent implements OnInit  {

  users: UserHRModel[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'jobRole', 'jobLevel', 'department', 'managerId', 'annualIncome', 'percentSalaryHike', 'stockOptionLevel'];
  dataSource: any;
  expandedUser: User | null;

  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.userService.getUsersWithCompensation().subscribe((users: UserHRModel[]) => {
      this.dataSource = users;
    }, error => {
      console.log('get users error');
    });
  }

  openJobDescDlg(element): void {
    console.log(element);
    this.dialog.open(EditJobDescComponent, {
      data: {
        userId: element.id,
      }
    });
  }

  openCompensationDlg(element): void {
    console.log(element);
    this.dialog.open(EditCompensationComponent, {
      data: {
        userId: element.id,
      }
    });
  }
}










// const users: User[] = [
//   {ID: 1, FirstName: 'Hydrogn', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//   Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
//   {ID: 2, FirstName: 'Helium', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//   Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
//   {ID: 3, FirstName: 'Lithium', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//   Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
//   {ID: 4, FirstName: 'Beryllium', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//   Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
//   {ID: 5, FirstName: 'Boron', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//   Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
//   {ID: 6, FirstName: 'Carbon', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//    Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
//   {ID: 7, FirstName: 'Nitrogen', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//   Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
//   {ID: 8, FirstName: 'Oxygen', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//   Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
//   {ID: 9, FirstName: 'Fluorine', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//   Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
//   {ID: 10, FirstName: 'Neon', LastName: 'Nallam', Email: 'revanth@adp.com', JobRole: 'developer', JobLevel: 1,
//   Department: 'iHCM', ManagerId: 1, AnnualIncome: 8800000, StockOptionLevel: 1, DailyRate: 123, PercentSalaryHike: 10},
// ];
