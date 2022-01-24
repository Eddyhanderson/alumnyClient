import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ArticleLessonViewComponent } from 'src/app/dialogs/lesson/article/view/article-lesson-view.component';
import { VideoLessonViewComponent } from 'src/app/dialogs/lesson/video/view/video-lesson-view.component';
import { StudantRegistrationComponent } from 'src/app/dialogs/teacher-place-studants/studant-registration/studant-registration.component';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { TopicModel } from 'src/app/models/topic-model/topic.model';
import { LessonQuery } from 'src/app/queries/lesson-query/lesson.query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { TopicQuery } from 'src/app/queries/topic-query/topic.query';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { TopicService } from 'src/app/services/topic-service/topic.service';

@Component({
  selector: 'app-teacher-place-review',
  templateUrl: './teacher-place-review.component.html',
  styleUrls: ['./teacher-place-review.component.scss']
})
export class TeacherPlaceReviewComponent implements OnInit {

  // Model
  teacherPlace: TeacherPlaceModel;
  topics: TopicModel[];
  lessons: LessonModel[];

  selectedTopic: TopicModel;
  selectedLesson: LessonModel;

  initSelection: TopicModel[];
  initLessonSelection: LessonModel[];

  // Form controls
  topicControl: FormControl;
  lessonControl: FormControl;


  constructor(private dialogRef: MatDialog,
    private tps: TeacherPlaceService,
    private route: ActivatedRoute,
    private ts: TopicService,
    private dialog: MatDialog,
    private ls: LessonService) { }

  public async ngOnInit() {
    await this.getTeacherPlace();
    await this.buildTopic();
    await this.buildLesson();

  }

  public async buildTopic() {
    await this.getAllTopics();
    this.firstTopicSelection();
  }

  public async buildLesson() {
    await this.getAllLessons();
    this.firstLessonSelection();
  }

  public compare = (a1: any, a2: any) => a1.id === a2.id;

  public topicListChange(change: MatSelectionListChange) {
    change.options.map(async option => {
      if (option.selected) {
        this.selectedTopic = option.value;
        await this.buildLesson();
      }
    })
  }

  public lessonListChange(change: MatSelectionListChange) {
    change.options.map(option => {
      if (option.selected) {
        this.selectedLesson = option.value;
      }
    })
  }

  private async getAllTopics() {
    if (this.teacherPlace != null) {
      let query = new TopicQuery(this.teacherPlace.id)
      let pagination = new PaginationQuery(1, -1);
      let response = await this.ts.getAll(pagination, query).toPromise();

      if (response?.data)
        this.topics = response?.data;
    }
  }

  private async getAllLessons() {
    if (this.selectedTopic) {
      let query: LessonQuery = { topicId: this.selectedTopic.id };
      let pagination = new PaginationQuery(1, -1);

      let response = await this.ls.getAll(pagination, query).toPromise();
      if (response?.data)
        this.lessons = response.data
    }
  }

  private async firstTopicSelection() {
    if (this.topics?.length > 0) {
      this.initSelection = [this.topics[0]];
      this.selectedTopic = this.topics[0];
      this.topicControl = new FormControl(this.initSelection);
    }
  }

  private async firstLessonSelection() {
    if (this.lessons?.length > 0) {
      this.initLessonSelection = [this.lessons[0]];
      this.selectedLesson = this.lessons[0];
      this.lessonControl = new FormControl(this.initLessonSelection);
    }
  }

  public async getTeacherPlace() {
    let teacherPlaceId = this.route.parent?.snapshot.params?.id;
    if (teacherPlaceId != null)
      this.teacherPlace = await this.tps.get(teacherPlaceId);
    else
      this.getTeacherPlaceFromHistory();
  }

  public async getTeacherPlaceFromHistory() {
    this.teacherPlace = history.state.data;
  }

  public lessonView() {
    if (this.selectedLesson.lessonType.toUpperCase() == "VIDEO") {
      this.dialogRef.open(VideoLessonViewComponent, {
        height: '70%',
        width: '70%',
        data: this.selectedLesson.manifestPath
      })
    } else if (this.selectedLesson.lessonType.toUpperCase() == "ARTICLE") {
      this.dialogRef.open(ArticleLessonViewComponent, {
        height: '70%',
        width: '70%',
        data: this.selectedLesson
      })
    }
  }

  public onRegister() {
    this.dialog.open(StudantRegistrationComponent, {
      width: '40%',
      height: '70%',
      data: this.teacherPlace
    })
  }

}
