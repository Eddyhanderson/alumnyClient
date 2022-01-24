import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeacherProfileAboutComponent } from './teacher-profile/teacher-profile-about/teacher-profile-about.component';
import { TeacherProfileSpotlightComponent } from './teacher-profile/teacher-profile-spotlight/teacher-profile-spotlight.component';
import { TeacherProfileTeacherPlacesComponent } from './teacher-profile/teacher-profile-teacher-places/teacher-profile-teacher-places.component';

import { ControlPainelComponent } from './control-painel/control-painel.component';
import { TeacherPlacesComponent } from './teacher-places/teacher-place.component';

const routes: Routes = [
  {
    path: 'profile', component: TeacherProfileComponent,
    children: [
      { path: 'about', component: TeacherProfileAboutComponent },
      { path: 'spotlight', component: TeacherProfileSpotlightComponent },
      { path: 'teacherPlaces', component: TeacherProfileTeacherPlacesComponent }
    ]
  },
  { path: 'control-painel', component: ControlPainelComponent },
  { path: 'teacher-places', component: TeacherPlacesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
