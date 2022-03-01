import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, HostListener, OnDestroy, NgZone } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes, } from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LessonGroupedModel } from 'src/app/models/lessons-grouped.model/lessons-grouped';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { DisciplineTopicModel } from 'src/app/models/discipline-topic-model/discipline-topic.model';
import { DisciplineModel } from 'src/app/models/discipline-model/discipline.model';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ArticleLessonViewComponent } from 'src/app/dialogs/lesson/article/view/article-lesson-view.component';
import { LessonQuery } from 'src/app/queries/lesson-query/lesson.query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';
import { TopicQuery } from 'src/app/queries/topic-query/topic.query';
import { TopicModel } from 'src/app/models/topic-model/topic.model';
import { TopicService } from 'src/app/services/topic-service/topic.service';

@Component({
  selector: 'app-video-lesson-watch',
  templateUrl: './lesson-watch.component.html',
  styleUrls: ['./lesson-watch.component.scss'],
})
export class LessonWatchComponent implements OnInit {

  private _reloadStrategy: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ls: LessonService,
    private ts: TopicService,
    private dialog: MatDialog) { }

  //Models
  topic: TopicModel;
  lesson: LessonModel;
  lessons$: PaginationAdapter<LessonModel, LessonQuery>;
  lessonsContainer: LessonModel[];
  discipline: DisciplineModel;
  teacherPlace: TeacherPlaceModel;
  disciplineTopic: DisciplineTopicModel;
  totalLesson: number;
  manifestPath$ = new BehaviorSubject<string>('');
  role: string = localStorage.userRole;

  ngOnInit(): void {
    // this.getData();
    // this.setStrategyToReloadPage();
  }

  // public nextLesson(id: string) {
  //   this.router.navigate([], {
  //     queryParams: { 'lesson': id },
  //     relativeTo: this.route, queryParamsHandling: 'merge'
  //   })
  // }

  // public gotToArticleView(lesson: LessonModel) {
  //   this.router.navigate(['./lesson', 'article-view', lesson.id])
  // }

  // // TODO: Load more lessons by scroll event
  // // TODO: Development in the server side of pagedResponse with totalElements
  // private async getData() {
  //   let topicId = this.getTopicFromQuery();

  //   if(topicId == null) return null;

  //   this.topic = await this.ts.get(topicId);

  //   this.teacherPlace = {
  //     id: this.topic.teacherPlaceId,
  //     name: this.topic.teacherPlaceName,
  //     profilePhotoPath: this.topic.teacherPlaceProfilePhoto
  //   }

  //   this.discipline = {
  //     name: this.topic.disciplineName
  //   }


  //   let lessonQuery: LessonQuery = {
  //    /* topicId: this.topic.id*/
  //   }

  //   this.lessons$ = new PaginationAdapter((query, param) => this.ls.getAll(query, param), lessonQuery);

  //   if (this.getLessonId() === undefined) {
  //     this.getFirstLesson();
  //   } else {
  //     this.getLesson(this.getLessonId());
  //   }

  // }

  // private setStrategyToReloadPage() {
  //   this._reloadStrategy = this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       let id = this.getLessonId();

  //       this.lessons$.getDataSource.subscribe(l => {
  //         this.lesson = l.find(lk => lk.id == id);
  //       });
  //     }
  //   })
  // }

  // private getFirstLesson() {
  //   this.lessons$.getDataSource.pipe(first()).subscribe(l => {
  //     this.lesson = l.find(lk => lk.sequence == 1);
  //     this.nextLesson(this.lesson.id);
  //   });
  // }

  // private getLesson(id: string) {
  //   this.lessons$.getDataSource.pipe(first()).subscribe(l => {
  //     this.lesson = l.find(lk => lk.id == id);
  //   })
  // }

  // private getTopicFromQuery(): string {
  //   return this.route.snapshot.queryParams.topic;
  // }

  // private getLessonId() {
  //   return this.route.snapshot.queryParams.lesson;
  // }

}
