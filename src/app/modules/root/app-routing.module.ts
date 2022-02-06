import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: "auth", loadChildren: () => import('../../modules/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: "home", loadChildren: () => import('../../modules/home/home.module').then(m => m.HomeModule) },
  { path: "lesson", loadChildren: () => import('../../modules/lesson/lesson.module').then(m => m.LessonModule) },
  { path: "manager", loadChildren: () => import('../../modules/manager/manager.module').then(m => m.ManagerModule) },
  { path: "question", loadChildren: () => import('../../modules/question/question.module').then(m => m.QuestionModule) },
  { path: "studant", loadChildren: () => import('../../modules/studant/studant.module').then(m => m.StudantModule) },
  { path: "school", loadChildren: () => import('../../modules/school/school.module').then(m => m.SchoolModule) },
  { path: "teacher-place/:id", loadChildren: () => import('../../modules/teacher-place/teacher-place.module').then(m => m.TeacherPlaceModule) },
  { path: "teacher/:id", loadChildren: () => import('../../modules/teacher/teacher.module').then(m => m.TeacherModule) },
  { path: "search", component: SearchComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

