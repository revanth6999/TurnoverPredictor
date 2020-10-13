import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TitleComponent } from './title/title.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';
import { PerformanceReviewComponent } from './performance-review/performance-review.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EditJobDescComponent } from './edit-job-desc/edit-job-desc.component';
import { EditCompensationComponent } from './edit-compensation/edit-compensation.component';
import { ChartsModule } from 'ng2-charts';

import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { PredictService } from './_services/predict.service';
import { FeedbackService } from './_services/feedback.service';
import { CompensationService } from './_services/compensation.service';
import { PerformanceService } from './_services/performance.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { CalculatorComponent } from './calculator/calculator.component';
import { PhotoComponent } from './photo/photo.component';
import { FileUploadModule } from 'ng2-file-upload';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RemoveEmployeeComponent } from './remove-employee/remove-employee.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TitleComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ManageEmployeesComponent,
    ManageTeamComponent,
    PerformanceReviewComponent,
    FeedbackComponent,
    EditJobDescComponent,
    EditCompensationComponent,
    CalculatorComponent,
    PhotoComponent,
    DashboardComponent,
    RemoveEmployeeComponent
  ],
  entryComponents: [HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule
  ],
  providers: [
    AuthService,
    UserService,
    FeedbackService,
    CompensationService,
    PerformanceService,
    PredictService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
