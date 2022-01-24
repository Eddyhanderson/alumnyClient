import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { DisciplineTopicModel } from 'src/app/models/discipline-topic-model/discipline-topic.model';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { DisciplineModel } from 'src/app/models/discipline-model/discipline.model';
import { LessonGroupedModel } from 'src/app/models/lessons-grouped.model/lessons-grouped';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { LessonQuery } from 'src/app/queries/lesson-query/lesson.query';
import { TopicService } from 'src/app/services/topic-service/topic.service';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';
import { TopicModel } from 'src/app/models/topic-model/topic.model';
import { TopicQuery } from 'src/app/queries/topic-query/topic.query';

@Component({
  selector: 'app-teacher-place-lessons',
  templateUrl: './teacher-place-lessons.component.html',
  styleUrls: ['./teacher-place-lessons.component.scss']
})
export class TeacherPlaceLessonsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private ts: TopicService) { }

  // Model
  public topics$: PaginationAdapter<TopicModel, TopicQuery>;

  teacherPlaceId: string;

  ngOnInit(): void {
    this.getParam();
    this.getAllTopics();
  }


  private async getAllTopics() {

    if (this.teacherPlaceId == null) return null;

    let initialParam = new TopicQuery(this.teacherPlaceId);
    this.topics$ = new PaginationAdapter((query, param) => this.ts.getAll(query, param), initialParam);    
  }  

  private getParam() {
    this.teacherPlaceId = this.route.parent.snapshot.paramMap.get('id');
  }
}
