import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CourseModule { }
