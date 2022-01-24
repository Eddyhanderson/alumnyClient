import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionViewComponent } from './question-view/question-view.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { MaterialModule } from '../material/material.module';
import { QuestionAnswersComponent } from './question-answers/question-answers.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [QuestionViewComponent, QuestionAnswerComponent, QuestionAnswersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    QuestionRoutingModule,
    SharedModule
  ]
})
export class QuestionModule { }
