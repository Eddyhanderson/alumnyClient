import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentModel } from 'src/app/models/comment-model/comment.model';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TopicModel } from 'src/app/models/topic-model/topic.model';
import { CommentQuery } from 'src/app/queries/comment-query/comment.query';
import { CommentService } from 'src/app/services/comment-service/comment.service';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { SchoolService } from 'src/app/services/school-service-3/school.service';
import { TopicService } from 'src/app/services/topic-service/topic.service';
import { Constants } from 'src/app/shared/utils/constants';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';

@Component({
  selector: 'app-video-lesson-about',
  templateUrl: './lesson-about.component.html',
  styleUrls: ['./lesson-about.component.scss']
})
export class LessonWacthAboutComponent implements OnInit {

  private _reloadStrategy: Subscription;
  public commented = false;
  public lessonId: string;
  public topicId: string;

  public lesson: LessonModel;
  public topic: TopicModel;
  public teacher: TeacherModel;
  public topicComments$: PaginationAdapter<CommentModel, CommentQuery>;

  public commentControl: FormControl;

  constructor(private route: ActivatedRoute,
    private ls: LessonService,
    private ts: TopicService,
    private tss: SchoolService,
    private cs: CommentService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.listenQueryParam();
    this.initCommentForm();
    this.setStrategyToReloadPage();
  }

  private listenQueryParam() {
    this.route.queryParams.subscribe(async param => {
      this.lessonId = param.lesson;
      this.topicId = param.topic;

      if (this.lessonId == null || this.topicId == null) return;

      await this.getLesson();
      await this.getTopic();
      await this.getTeacher();
    })
  }

  public async comment() {
    if (this.commentControl.value != null) {
      this.commented = true;
      let comment = new CommentModel();

      comment.comentableId = this.topic.commentableId;
      comment.content = this.commentControl.value;
      let result = await this.cs.create(comment);

      if (result.succeded) {
        await this.snackBar.open("Muito obrigado pelo seu comentário.").afterDismissed().toPromise();
        this.router.navigateByUrl(this.router.url);
        this.commented = false;
        this.commentControl.setValue("");
        this.commentControl.markAsUntouched();
      }else{
        this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
      }
    }
  }

  private async getLesson() {
    this.lesson = await this.ls.get(this.lessonId);
  }

  private async getTopic() {
    this.topic = await this.ts.get(this.topicId);
    if (this.topic != null)
      this.getTopicComments();
  }

  private async getTeacher() {
    /*this.teacher = await this.tss.get(this.lesson.teacherId);*/
  }

  private async getTopicComments() {
    let initialParam = new CommentQuery(this.topic.commentableId);
    this.topicComments$ = new PaginationAdapter((query, param) => this.cs.getAll(query, param), initialParam);
  }

  private initCommentForm() {
    this.commentControl = new FormControl('');
  }

  /* To reload component */
  private setStrategyToReloadPage() {
    this._reloadStrategy = this.router.events.subscribe(
      async (evt) => {
        if (evt instanceof NavigationEnd) {
          await this.getLesson();
          await this.getTopic();
          await this.getTeacher();
        }
      }
    )
  }

}
