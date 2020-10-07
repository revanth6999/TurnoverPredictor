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

import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { FeedbackService } from './_services/feedback.service';
import { CompensationService } from './_services/compensation.service';
import { PerformanceService } from './_services/performance.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';



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
    EditCompensationComponent
  ],
  entryComponents: [PerformanceReviewComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    UserService,
    FeedbackService,
    CompensationService,
    PerformanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
