import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolProfileComponent } from './school-profile/school-profile.component';
import { SchoolAboutComponent } from './school-profile/school-about/school-about.component';
import { SchoolTeachersComponent } from './school-profile/school-teachers/school-teachers.component';
import { SchoolCoursesComponent } from './school-profile/school-courses/school-courses.component';
import { MaterialModule } from '../material/material.module';
import { SchoolChoiceComponent } from './school-choice/school-choice.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [SchoolProfileComponent, SchoolAboutComponent, SchoolTeachersComponent, SchoolCoursesComponent, SchoolChoiceComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class SchoolModule { }
