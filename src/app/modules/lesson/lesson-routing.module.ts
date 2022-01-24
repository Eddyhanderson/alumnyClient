import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonWatchComponent } from './lesson-watch/lesson-watch/lesson-watch.component';
import { HomeComponent } from '../home/home.component';
import { LessonWacthAboutComponent } from './lesson-watch/lesson-about/lesson-about.component';
import { LessonWatchQuestionsComponent } from './lesson-watch/lesson-questions/lesson-questions.component';

import { LessonWatchCreateQuestionComponent } from './lesson-watch/lesson-create-question/lesson-create-question.component';
import { LessonManagmentComponent } from './lesson-managment/lesson-managment.component';
import { ArticleViewComponent } from './article-view/article-view.component';

const routes: Routes = [
  {
    path: 'watch', component: LessonWatchComponent, children: [
      { path: 'about', component: LessonWacthAboutComponent },
      { path: 'questions', component: LessonWatchQuestionsComponent},
      { path: 'question-expose', component: LessonWatchCreateQuestionComponent },
    ],
  },
  {
    path: 'managment', component: LessonManagmentComponent,
  },
  { path: 'article-view/:lesson', component: ArticleViewComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
