import { Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Quill from "quill";
import { ArticleModel } from "src/app/models/article-model/article.model";
import { LessonModel } from "src/app/models/lesson-model/lesson.model";
import { PostModel } from "src/app/models/post-model/post.model";
import { UserModel } from "src/app/models/user-model/user-model";
import { AccountService } from "src/app/services/account-service/account.service";
import { ArticleService } from "src/app/services/article-service/article.service";
import { LessonService } from "src/app/services/lesson-service/lesson.service";
import { PostService } from "src/app/services/post-service/post.service";
import { UserService } from "src/app/services/user-service/user.service";
import Delta from '../../../../../node_modules/@types/quill/node_modules/quill-delta/dist/Delta';

@Component({
    selector: 'app-article-view',
    templateUrl: './article-view.component.html',
    styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent {
    constructor(
        private route: ActivatedRoute,
        private ls: LessonService,
        private as: ArticleService,
        private ps: PostService,
        private us:UserService) { }
        
    public user: UserModel;
    public lesson: LessonModel;
    public article: ArticleModel;
    public post: PostModel;
    private _quill: Quill;

    @ViewChild('view', { static: true }) view: ElementRef<HTMLElement>;
    
    ngOnInit(): void {

    }

    async ngAfterViewInit() {
        await this.getLesson();
        await this.getArticle();
        await this.getPost();
        await this.getUser();
        this.createView();
    }

    private async getLesson() {
        let lessonId = this.route.snapshot.paramMap.get('lesson');
        this.lesson = await this.ls.get(lessonId);        
    }

    private async getArticle() {
        this.article = await this.as.get(this.lesson?.articleId);
    }

    private async getPost() {
        this.post = await this.ps.get(this.lesson?.postId);                 
    }

    private async getUser(){
        this.user = await this.us.get(this.post.userId);        
    }

    private createView() {
        if (this.lesson && this.article) {
            this._quill = new Quill(this.view.nativeElement, {
                readOnly: true,
                theme: 'bubble'
            });

            let content: Delta = JSON.parse(this.article.delta);            
            this._quill.setContents(content);
        }
    }
}