import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { ProfileComponent } from './profile/profile.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AuthGuard } from './_guards/AuthGuard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'team', component: ManageTeamComponent, canActivate: [AuthGuard] },
    { path: 'employees', component: ManageEmployeesComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'predictor', component: CalculatorComponent, canActivate: [AuthGuard] },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
