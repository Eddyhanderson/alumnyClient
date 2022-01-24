import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherProfileTeacherPlacesComponent } from './teacher-profile/teacher-profile-teacher-places/teacher-profile-teacher-places.component';
import { TeacherProfileSpotlightComponent } from './teacher-profile/teacher-profile-spotlight/teacher-profile-spotlight.component';
import { TeacherProfileAboutComponent } from './teacher-profile/teacher-profile-about/teacher-profile-about.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ControlPainelComponent } from './control-painel/control-painel.component';
import { TeacherPlacesComponent } from './teacher-places/teacher-place.component';



@NgModule({
  declarations: [TeacherProfileComponent,
    TeacherProfileTeacherPlacesComponent,
    TeacherProfileSpotlightComponent,
    TeacherProfileAboutComponent,
    ControlPainelComponent,
    TeacherPlacesComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class TeacherModule { }
