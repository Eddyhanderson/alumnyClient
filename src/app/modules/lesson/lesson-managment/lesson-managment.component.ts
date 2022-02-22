import { Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleLessonCreationComponent } from 'src/app/dialogs/lesson/article/create/article-lesson-creation.component';
import { ArticleLessonViewComponent } from 'src/app/dialogs/lesson/article/view/article-lesson-view.component';
import { VideoLessonViewComponent } from 'src/app/dialogs/lesson/video/view/video-lesson-view.component';
import { ArticleModel } from 'src/app/models/article-model/article.model';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { ModuleModel } from 'src/app/models/module-model/modules.model';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { FormationQuery } from 'src/app/queries/formation-query/formation-query';
import { LessonQuery } from 'src/app/queries/lesson-query/lesson.query';
import { ModuleQuery } from 'src/app/queries/module-query/module-query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { ArticleService } from 'src/app/services/article-service/article.service';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { ModuleService } from 'src/app/services/module-service/module.service';
import { LessonTypes } from 'src/app/shared/utils/constants';
import { Routes } from 'src/app/shared/utils/routing-constants';
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
    private formationService: FormationService,
    private moduleService: ModuleService) { }

  // Flags
  formationFilterOpened: boolean = false;
  moduleFilterOpened: boolean = false;

  // Models
  moduleId: string;
  formationId: string;
  moduleFilter: ModuleModel;
  formatinFilter: FormationModel;
  school: SchoolModel;
  formations$: Observable<FormationModel[]>;
  modules$: Observable<ModuleModel[]>;
  data: TablePaginationAdapter<LessonModel, LessonQuery>;
  filters: Filter[] = new Array();

  // Tables assets
  displayedColumns: string[] = ["sequence", "lesson", "formation", "module", "type", "questions", "date", "action"];

  ngOnInit(): void {
    this.initSchoolData();
    this.initDataSource();
  }

  public onModuleFilterOpened() {
    this.moduleFilterOpened = true;
    this.formationFilterOpened = false;

    let moduleQuery: ModuleQuery = {
      formationId: this.formationId
    }

    let page = new PaginationQuery();

    this.modules$ = this.moduleService.getAll(page, moduleQuery).pipe(map((response => response.data)));
  }

  public onFormationFilterOpened() {
    this.formationFilterOpened = true;
    this.moduleFilterOpened = false;

    let formationQuery = new FormationQuery(this.school.id);

    let page = new PaginationQuery();

    this.formations$ = this.formationService.getAll(page, formationQuery).pipe(map((response => response.data)));
  }

  public onFormationFilterPicked(event: MatSelectionListChange) {
    this.formatinFilter = event.options[0].selected ? event.options[0].value : null;
    this.formationFilterBuild(this.formatinFilter);
  }

  public onModuleFilterPicked(event: MatSelectionListChange) {
    this.moduleFilter = event.options[0].selected ? event.options[0].value : null;
    this.moduleFilterBuild(this.moduleFilter);
  }

  public remove(id: string, type: string) {

    var start = this.filters.findIndex(filter => filter.id == id);
    this.filters.splice(start);
    switch (type) {
      case "formation": {
        this.data.setParam = { formationId: "" }
        break;
      }
      case "module": {
        this.data.setParam = { moduleId: "" }
        break;
      }
    }
  }

  public openArticleCreation(article: ArticleModel) {
    this.matDialog.open(ArticleLessonCreationComponent, {
      data: article, width: '70%',
      height: '70%'
    })
  }

  public buildImageUrl(url: string) { return Routes.BASE_URL_SERVER_FILE.concat(url) }

  public openLessonView(lesson: LessonModel) {
    console.dir(lesson);
    if (lesson.lessonType.toUpperCase() == LessonTypes.Video.toUpperCase()) {
      this.matDialog.open(VideoLessonViewComponent, {
        height: '70%',
        width: '70%',
        data: lesson.manifestPath
      })
    } else if (lesson.lessonType.toUpperCase() == LessonTypes.Article.toUpperCase()) {
      this.matDialog.open(ArticleLessonViewComponent, {
        height: '70%',
        width: '70%',
        data: lesson
      })
    }
  }

  private initDataSource() {
    this.setParams();

    let initialLessonQuery: LessonQuery = {
      schoolId: this.school.id,
      formationId: this.formationId ?? '',
    }

    if (this.formationId != null) {
      initialLessonQuery.moduleId = this.moduleId ?? '';
    }

    this.data = new TablePaginationAdapter<LessonModel, LessonQuery>((query, param) => this.ls.getAll(query, param), initialLessonQuery);
  }

  private async setParams() {
    this.route.queryParamMap.subscribe(async query => {
      this.formationId = query.get("formationId");
      if (this.formationId !== null)
        await this.formationFilterFromQuery(this.formationId);
    });

    this.route.queryParamMap.subscribe(async query => {
      this.moduleId = query.get("moduleId")
      if (this.moduleId !== null)
        await this.moduleFilterFromQuery(this.moduleId);
    });
  }

  private initSchoolData() {
    this.school = JSON.parse(localStorage.school);
  }

  private async formationFilterFromQuery(id: string) {
    this.formatinFilter = await this.formationService.get(id);
    this.formationFilterBuild(this.formatinFilter);
  }

  private async moduleFilterFromQuery(id: string) {
    this.moduleFilter = await this.moduleService.get(id);
    this.moduleFilterBuild(this.moduleFilter);
  }

  private async moduleFilterBuild(module: ModuleModel) {
    this.moduleId = module.id;
    this.filters.push({ id: module.id, name: module.name, type: "module" });
    this.data.setParam = { moduleId: this.moduleId };
  }

  private async formationFilterBuild(formation: FormationModel) {
    this.formationId = formation.id;
    this.filters.push({ id: formation.id, name: formation.theme, type: "formation" });
    this.data.setParam = { formationId: this.formationId };
  }



}


