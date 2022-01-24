import { AfterViewInit, Component, ElementRef, Inject, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleModel } from 'src/app/models/article-model/article.model';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { PostModel } from 'src/app/models/post-model/post.model';
import { ArticleService } from 'src/app/services/article-service/article.service';
import { PostService } from 'src/app/services/post-service/post.service';
import Delta from '../../../../../../node_modules/@types/quill/node_modules/quill-delta/dist/Delta';
import Quill from 'quill';
import { UserService } from 'src/app/services/user-service/user.service';
import { UserModel } from 'src/app/models/user-model/user-model';

@Component({
  selector: 'app-article-lesson-view',
  templateUrl: './article-lesson-view.component.html',
  styleUrls: ['./article-lesson-view.component.scss']
})
export class ArticleLessonViewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ArticleLessonViewComponent>,
    private as: ArticleService,
    private ps: PostService,
    private us: UserService,
    @Inject(MAT_DIALOG_DATA) public lesson: LessonModel) { }

  public user: UserModel;
  public article: ArticleModel;
  public post: PostModel;
  private _quill: Quill;

  @ViewChild('view', { static: true }) view: ElementRef<HTMLElement>;


  public async ngOnInit() {
    if (this.lesson == null) throw Error("Lesson is required");
    await this.getArticle();
    await this.getPost();
    await this.getUser();
  }

  private async getArticle() {
    if (this.lesson?.articleId != null) {
      this.article = await this.as.get(this.lesson.articleId);
    }
  }

  private async getPost() {
    if (this.lesson?.postId != null) {
      this.post = await this.ps.get(this.lesson.postId);
    }
  }


  private async getUser() {
    this.user = await this.us.get(this.post.userId);
  }
}
