import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherPlacesComponent } from '../teacher/teacher-places/teacher-place.component'
import { TeacherPlaceProfileComponent } from './teacher-place-profile/teacher-place-profile.component';
import { TeacherPlaceLessonsComponent } from './teacher-place-profile/teacher-place-lessons/teacher-place-lessons.component';
import { TeacherPlaceAboutComponent } from './teacher-place-profile/teacher-place-about/teacher-place-about.component';
import { TeacherPlaceStudantsComponent } from './teacher-place-profile/teacher-place-studants/teacher-place-studants.component';
import { TeacherPlaceReviewComponent } from './teacher-place-review/teacher-place-review.component';

const routes: Routes = [
  {
    path: 'profile', component: TeacherPlaceProfileComponent,
    children: [
      { path: 'lessons', component: TeacherPlaceLessonsComponent },
      { path: 'about', component: TeacherPlaceAboutComponent },
      { path: 'studants', component: TeacherPlaceStudantsComponent },
    ]
  },
  {
    path: 'review', component: TeacherPlaceReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherPlaceRoutingModule { }
