import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionViewComponent } from './question-view/question-view.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { QuestionAnswersComponent } from './question-answers/question-answers.component';

const routes: Routes = [
  {
    path: ':id', component: QuestionViewComponent,
    children: [
      { path: 'answer', component: QuestionAnswerComponent },
      { path: 'answers', component: QuestionAnswersComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
