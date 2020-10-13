import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { EditCompensationComponent } from '../edit-compensation/edit-compensation.component';
import { EditJobDescComponent } from '../edit-job-desc/edit-job-desc.component';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { UserHRModel } from '../_models/UserHRModel';
import { MatTableDataSource } from '@angular/material/table';
import { RemoveEmployeeComponent } from '../remove-employee/remove-employee.component';

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
      this.dataSource = new MatTableDataSource(users);
      console.log(users);
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
    }).afterClosed()
    .subscribe(response => {
      this.refresh();
    });
  }

  openCompensationDlg(element): void {
    console.log(element);
    this.dialog.open(EditCompensationComponent, {
      data: {
        userId: element.id,
      }
    }).afterClosed()
    .subscribe(response => {
      this.refresh();
    });
  }

  onChange(event): void {
    // alert(event.value);
    console.log(event.value);
    if (event.value === 'all')
    {
      this.userService.getUsersWithCompensation().subscribe((users: UserHRModel[]) => {
        this.dataSource = new MatTableDataSource(users);
      }, error => {
        console.log('get users error');
      });
    }
    else if (event.value === 'pendingJd')
    {
      this.userService.getUsersWithoutJD().subscribe((users: UserHRModel[]) => {
        this.dataSource = new MatTableDataSource(users);
      }, error => {
        console.log('get users error');
      });
    }
    else if (event.value === 'pendingComp')
    {
      this.userService.getUsersWithoutCompensation().subscribe((users: UserHRModel[]) => {
        this.dataSource = new MatTableDataSource(users);
      }, error => {
        console.log('get users error');
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeEmployee(element): void {
    console.log(element);
    this.dialog.open(RemoveEmployeeComponent, {
      data: {
        userId: element.id,
        email: element.email
      }
    });
  }
}