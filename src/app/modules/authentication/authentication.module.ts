import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationStudantComponent } from './registration/registration-studant/registration-studant.component';
import { RegistrationTeacherComponent } from './registration/registration-teacher/registration-teacher.component';
import { MaterialModule } from '../material/material.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationSchoolComponent } from './registration/registration-school/registration-school.component';


@NgModule({
  declarations: [
    LoginComponent, 
    RegistrationStudantComponent, 
    RegistrationTeacherComponent, 
    RegistrationSchoolComponent, ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],  
  exports:[
    LoginComponent,
    RegistrationStudantComponent,
    RegistrationTeacherComponent
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }  
  ],
})
export class AuthenticationModule { }
