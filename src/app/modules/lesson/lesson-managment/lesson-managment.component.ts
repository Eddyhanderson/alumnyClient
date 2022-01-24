import { SelectionModel } from '@angular/cdk/collections';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { type } from 'os';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleLessonCreationComponent } from 'src/app/dialogs/lesson/article/create/article-lesson-creation.component';
import { ArticleModel } from 'src/app/models/article-model/article.model';
import { DisciplineTopicModel } from 'src/app/models/discipline-topic-model/discipline-topic.model';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { TopicModel } from 'src/app/models/topic-model/topic.model';
import { ArticleQuery } from 'src/app/queries/article-query/article.query';
import { DisciplineTopicQuery } from 'src/app/queries/discipline-topic-query/discipline-topic.query';
import { LessonQuery } from 'src/app/queries/lesson-query/lesson.query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { SchoolQuery } from 'src/app/queries/school-query/school.query';
import { TeacherPlaceQuery } from 'src/app/queries/teacher-place-query/teacher-places.query';
import { TopicQuery } from 'src/app/queries/topic-query/topic.query';
import { ArticleService } from 'src/app/services/article-service/article.service';
import { DisciplineTopicService } from 'src/app/services/discipline-topic-service/discipline-topic.service';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { SchoolService } from 'src/app/services/school-service/school.service';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { TopicService } from 'src/app/services/topic-service/topic.service';
import { TablePaginationAdapter } from 'src/app/shared/utils/table-pagination-adapter/table-pagination-adapter';


type Filter = { id: string, name: string, type: string };

@Component({
  selector: 'app-lesson-managment',
  templateUrl: './lesson-managment.component.html',
  styleUrls: ['./lesson-managment.component.scss']
})
export class LessonManagmentComponent implements OnInit {

  constructor(
    private as: ArticleService,
    private matDialog: MatDialog,
    private bottomSheet: MatBottomSheetRef,
    private route: ActivatedRoute,
    private ls: LessonService,
    private ss: SchoolService,
    private tps: TeacherPlaceService,
    private ts: TopicService) { }

  // Flags
  schoolFilterOpened: boolean = false;
  teacherPlaceFilterOpened: boolean = false;
  topicFilterOpened: boolean = false;
  draftMode: boolean;

  // Models
  teacherPlaceId: string;
  topicId: string;
  schoolId: string;  
  teacherPlaceFilter: TeacherPlaceModel;
  topicFilter: TopicModel;
  schoolFilter: SchoolModel;
  teacher: TeacherModel;
  schools$: Observable<SchoolModel[]>;
  teacherPlaces$: Observable<TeacherPlaceModel[]>;
  topics$: Observable<TopicModel[]>;
  data: TablePaginationAdapter<LessonModel, LessonQuery>;
  draftData: TablePaginationAdapter<ArticleModel, ArticleQuery>;
  filters: Filter[] = new Array();

  // Tables assets
  displayedColumns: string[] = ["lesson", "school", "place", "topic", "type", "date", "views"];
  draftColumns: string[] = ["draft", "name", "changeAt", "action"];

  selection: SelectionModel<LessonModel> = new SelectionModel<LessonModel>(true);

  ngOnInit(): void {
    this.initTeacherData();
    this.checkDraftMode();
    this.draftMode ? this.getDrafts() : this.initDataSource();
  }

  public onSchoolFilterOpened() {
    this.schoolFilterOpened = true;
    this.teacherPlaceFilterOpened = false;
    this.topicFilterOpened = false;

    let schoolQuery: SchoolQuery = {
      teacherId: this.teacher.id,
      subscribed: true
    }

    let page = new PaginationQuery();

    this.schools$ = this.ss.getAll(page, schoolQuery).pipe(map((response => response.data)));
  }

  public onTeacherPlaceFilterOpened() {
    this.teacherPlaceFilterOpened = true;
    this.schoolFilterOpened = false;
    this.topicFilterOpened = false;

    let teacherPlaceQuery: TeacherPlaceQuery = {
      teacherId: this.teacher.id,
      schoolId: this.schoolId ?? ''
    }

    let page = new PaginationQuery();

    this.teacherPlaces$ = this.tps.getAll(page, teacherPlaceQuery).pipe(map((response => response.data)));
  }

  public onTopicFilterOpened() {
    this.topicFilterOpened = true;
    this.teacherPlaceFilterOpened = false;
    this.schoolFilterOpened = false;

    let topicQuery = new TopicQuery(this.teacherPlaceId, this.teacher.id, this.schoolId);

    let page = new PaginationQuery();

    this.topics$ = this.ts.getAll(page, topicQuery).pipe(map((response => response.data)));
  }

  public onSchoolFilterPicked(event: MatSelectionListChange) {
    this.schoolFilter = event.options[0].selected ? event.options[0].value : null;
    this.schoolFilterBuild(this.schoolFilter);
  }

  public onTeacherPlaceFilterPicked(event: MatSelectionListChange) {
    this.teacherPlaceFilter = event.options[0].selected ? event.options[0].value : null;

    this.teacherPlaceFilterBuild(this.teacherPlaceFilter);
  }

  public onTopicFilterPicked(event: MatSelectionListChange) {
    this.topicFilter = event.options[0].selected ? event.options[0].value : null;

    this.topicFilterBuild(this.topicFilter);
  }

  public remove(id: string, type: string) {

    var start = this.filters.findIndex(filter => filter.id == id);
    this.filters.splice(start);
    switch (type) {
      case "school": {
        this.data.setParam = { schoolId: "" }
        break;
      }
      case "topic": {
        this.data.setParam = { topicId: "" }
        break;
      }
      case "teacherPlace": {
        this.data.setParam = { teacherPlaceId: "" }
      }
    }
  }

  public async isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.dataValue.data.length;
    return numRows == numSelected;
  }

  public async masterToggle() {
    await this.isAllSelected() ?
      this.selection.clear() :
      this.data.dataValue.data.forEach(lesson => {
        this.selection.select(lesson);
      });
  }

  public switchMode() {
    this.draftMode ? this.initDataSource() : this.getDrafts();
    this.draftMode = !this.draftMode;
  }

  public openArticleCreation(article: ArticleModel) {
    this.matDialog.open(ArticleLessonCreationComponent, {
      data: article, width: '70%',
      height: '70%'
    })
  }

  private initDataSource() {
    this.setParams();

    let initialLessonQuery: LessonQuery = {
      teacherPlaceId: this.teacherPlaceId ?? '',
      topicId: this.topicId ?? '',
      schoolId: this.schoolId ?? '',
      teacherId: this.teacher.id
    }

    this.data = new TablePaginationAdapter<LessonModel, LessonQuery>((query, param) => this.ls.getAll(query, param), initialLessonQuery);
  }

  private getDrafts() {
    let initialLessonQuery: ArticleQuery = {
      teacherId: this.teacher.id,
      draft: true
    }

    this.draftData = new TablePaginationAdapter<ArticleModel, ArticleQuery>((query, param) => this.as.getAll(query, param), initialLessonQuery);
  }

  private async setParams() {
    this.schoolId = this.route.snapshot.queryParamMap.get('schoolId');
    if (this.schoolId !== null)
      await this.schoolFilterFromQuery(this.schoolId);

    this.teacherPlaceId = this.route.snapshot.queryParamMap.get('teacherPlaceId');
    if (this.teacherPlaceId !== null)
      await this.teacherPlaceFromQuery(this.teacherPlaceId);

    this.topicId = this.route.snapshot.queryParamMap.get('topicId');
    if (this.topicId)
      await this.topicFromQuery(this.topicId);
  }

  private checkDraftMode() {
    this.draftMode = this.route.snapshot.queryParamMap.get('draft') == '1';
  }

  private initTeacherData() {
    this.teacher = JSON.parse(localStorage.teacher);
  }

  private async schoolFilterFromQuery(id: string) {
    this.schoolFilter = await this.ss.get(id);
    this.schoolFilterBuild(this.schoolFilter);
  }

  private async teacherPlaceFromQuery(id: string) {
    this.teacherPlaceFilter = await this.tps.get(id);
    this.teacherPlaceFilterBuild(this.teacherPlaceFilter);
  }

  private async topicFromQuery(id: string) {
    this.topicFilter = await this.ts.get(id);
    this.topicFilterBuild(this.topicFilter);
  }

  private async teacherPlaceFilterBuild(teacherPlace: TeacherPlaceModel) {
    this.teacherPlaceId = teacherPlace.id;
    this.filters.push({ id: this.teacherPlaceFilter.id, name: this.teacherPlaceFilter.name, type: "teacherPlace" });
    this.data.setParam = { teacherPlaceId: this.teacherPlaceId };
  }

  private async schoolFilterBuild(school: SchoolModel) {
    this.schoolId = school.id;
    this.filters.push({ id: this.schoolFilter.id, name: this.schoolFilter.name, type: "school" });
    this.data.setParam = { schoolId: this.schoolId };
  }

  private async topicFilterBuild(topic: TopicModel) {
    this.topicId = topic.id;

    this.filters.push({ id: this.topicFilter.id, name: this.topicFilter.disciplineTopicName, type: "topic" });

    this.data.setParam = { topicId: this.topicId };
  }

}


