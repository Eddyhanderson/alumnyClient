import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerModel } from 'src/app/models/answer-model/answer.model';
import { CommentModel } from 'src/app/models/comment-model/comment.model';
import { AnswerQuery } from 'src/app/queries/answer-query/answer.query';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss']
})
export class QuestionAnswersComponent implements OnInit {

  questionId: string;
  commment:CommentModel;

  answerPagination: PaginationAdapter<AnswerModel, AnswerQuery>;

  constructor(private as: AnswerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getQuestion();
    this.getAll();
  }

  public comment(commentableId:string){
    
  }

  private getQuestion() {
    this.questionId = this.route.snapshot.parent.params.id;
  }

  private getAll() {
    if(this.questionId == null) return;
    var initParam = new AnswerQuery(this.questionId);

    this.answerPagination = new PaginationAdapter((query, param) => this.as.getAll(query, param), initParam);
  }

}
