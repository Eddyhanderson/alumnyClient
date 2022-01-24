import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchoolProfileComponent } from './school-profile/school-profile.component';
import { SchoolTeachersComponent } from './school-profile/school-teachers/school-teachers.component';
import { SchoolAboutComponent } from './school-profile/school-about/school-about.component';
import { SchoolCoursesComponent } from './school-profile/school-courses/school-courses.component';
import { SchoolChoiceComponent } from './school-choice/school-choice.component';

const routes: Routes = [
  {
    path: 'profile', component: SchoolProfileComponent, children: [
      { path: 'teachers', component: SchoolTeachersComponent },
      { path: 'courses', component: SchoolCoursesComponent },
      { path: 'about', component: SchoolAboutComponent }
    ]
  },
  {
    path:'choice/:id', component: SchoolChoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
