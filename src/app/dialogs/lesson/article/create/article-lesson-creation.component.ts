import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ArticleModel } from 'src/app/models/article-model/article.model';
import { CourseModel } from 'src/app/models/course-model/course.model';
import { DisciplineTopicModel } from 'src/app/models/discipline-topic-model/discipline-topic.model';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TeacherPlaceGroup } from 'src/app/models/teacher-place-group/teacher-place.group';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { TopicModel } from 'src/app/models/topic-model/topic.model';
import { DisciplineTopicQuery } from 'src/app/queries/discipline-topic-query/discipline-topic.query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { TeacherPlaceQuery } from 'src/app/queries/teacher-place-query/teacher-places.query';
import { DisciplineTopicService } from 'src/app/services/discipline-topic-service/discipline-topic.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { Constants, DocumentLeave, PostTypes } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-article-lesson-creation',
  templateUrl: './article-lesson-creation.component.html',
  styleUrls: ['./article-lesson-creation.component.scss']
})
export class ArticleLessonCreationComponent implements OnInit {

  // To edit document
  close: boolean = false;
  editing: boolean = true;
  article: ArticleModel;  

  // Models
  public teacher: TeacherModel;
  public topic: TopicModel;
  public teacherPlace: TeacherPlaceModel;  
  public imgUrl: string;


  // Form Controls
  public titleCtl = new FormControl('', [Validators.required, Validators.maxLength(100)])
  public descriptionCtl = new FormControl('', Validators.required);
  public isPublic: FormControl = new FormControl(true, Validators.required);
  public teacherPlaceCtl = new FormControl('', Validators.required);
  public topicCtl: FormControl = new FormControl('', [Validators.required]);  
  detailFg: FormGroup;  

  // Flags 
  submited: boolean = false;

  constructor(
    private ls: LessonService,
    private is: ImageService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ArticleLessonCreationComponent>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.dir(this.data);
  }

  public async uploadImageEvt(event) {
    var file = event.target.files[0];

    if (file == null) return null;

    let response = await this.is.uploadImageLesson(file).toPromise();

    if (response?.data) {
      this.imgUrl = response.data;
      this.snackBar.open('Miniatura criada com sucesso')
    }
    else {
      this.sendErrorMessage();
    }
  }

  public stopEditing() {     
    console.log("Entreiii")   ;
    this.editing = false;
  }

  public detailForm(group:FormGroup){
    this.detailFg = group;
  }

  public async onLessonCreate() {
    if (this.detailFg.valid) {
      this.submited = true;
      
      let lesson: LessonModel = {
        picture: this.imgUrl,
        description: this.detailFg.value.description,
        title: this.detailFg.value.title,
        articleId: this.article.id,
        moduleId: this.data.moduleId,
        lessonType: PostTypes.Article
      }

      console.dir(lesson);

      let stt = await this.createLesson(lesson);

      if (stt?.succeded) {
        let snackBarRef = this.snackBar.open('Parabéns! Artigo publicado com sucesso');

        /*snackBarRef.afterDismissed().subscribe(() => this.router.navigate(["lesson/managment"], {
          queryParams: {
            'teacherPlaceId': this.teacherPlace.id,
            'topicId': this.topic.id
          }
        }));*/

        this.dialogRef.close(true);
      } else {
        this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);    
        this.submited = false;    
      }
    }
  }

  private createLesson(lesson: LessonModel) {
    if (lesson == null || lesson == undefined) return null;

    return this.ls.create(lesson);
  }


  // Editing handlers  
  public onClose(action: DocumentLeave) {
    switch (action) {
      case DocumentLeave.Save: {
        this.draftRedirection();
        break;
      }
      case DocumentLeave.Discard:
      case DocumentLeave.Close: {
        this.dialogRef.close();
        break;
      }
      case DocumentLeave.Cancel: {
        this.close = false;
        break;
      }
      default: this.close = false;
    }
  }

  public getContent(article: ArticleModel) {
    console.dir(article);
    this.article = article;
  }

  private draftRedirection() {
    this.snackBar.open("Documento guardado como rascunho");
    this.router.navigate(['lesson', 'managment'], { queryParams: { draft: '1' } });
    this.dialogRef.close();
  }

  closeEditor() {
    if (this.editing) {
      this.close = true;
    } else {
      this.dialogRef.close;
    }
  }

  private sendErrorMessage() {
    this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
  }
}
