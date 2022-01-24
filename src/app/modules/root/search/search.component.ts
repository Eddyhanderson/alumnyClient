import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'lodash';
import { from, fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { LessonQuery } from 'src/app/queries/lesson-query/lesson.query';
import { StudantQuery } from 'src/app/queries/studant-query/studant.query';
import { TeacherPlaceQuery } from 'src/app/queries/teacher-place-query/teacher-places.query';
import { TeacherQuery } from 'src/app/queries/teacher-query/teacher.query';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { StudantService } from 'src/app/services/studant-service/studant.service';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { TeacherService } from 'src/app/services/teacher-service/teacher.service';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private bottomDetectTp: Subscription;
  private tabDetect: Subscription;

  public key: string;
  public teacherPlacePagination: PaginationAdapter<TeacherPlaceModel, TeacherPlaceQuery>;
  public lessonPagination: PaginationAdapter<LessonModel, LessonQuery>;
  public teacherPagination: PaginationAdapter<TeacherModel, TeacherQuery>;
  public studantPagination: PaginationAdapter<StudantModel, StudantQuery>;

  @ViewChild('tabGroup', {
    static: true
  })
  public tabGroup: MatTabGroup;


  constructor(private route: ActivatedRoute,
    private tps: TeacherPlaceService,
    private ls: LessonService,
    private ts: TeacherService,
    private ss: StudantService) { }


  ngOnInit(): void {
    this.listenKeyChanges();
  }

  private listenKeyChanges() {
    this.route.queryParamMap.subscribe(key => {
      this.unsubscriptions();
      this.key = key.get('key');
      this.key != null ? this.getTeacherPlace() : null;
      this.scrollListen();
      this.changeTabListen();
    })
  }

  private getTeacherPlace() {
    let initParam = new TeacherPlaceQuery(null, null, '1');

    this.teacherPlacePagination = new PaginationAdapter((param, query) => this.tps.getAll(param, query), initParam);
    this.teacherPlacePagination.setSearchValue = this.key;
  }

  private getLesson() {
    let initParam: LessonQuery;
    this.lessonPagination = new PaginationAdapter((param, query) => this.ls.getAll(param, query), initParam);
    this.lessonPagination.setSearchValue = this.key;
  }

  private getTeacher() {
    let initParam: TeacherQuery;
    this.teacherPagination = new PaginationAdapter((param, query) => this.ts.getAll(param, query), initParam);
    this.teacherPagination.setSearchValue = this.key;
  }

  private getStudant() {
    let initParam: StudantQuery;
    this.studantPagination = new PaginationAdapter((param, query) => this.ss.getAll(param, query), initParam);
    this.studantPagination.setSearchValue = this.key;
  }


  private scrollListen() {
    let m: MatTabGroup;

    this.bottomDetectTp = fromEvent(window, 'scroll').subscribe(
      () => {
        if (Math.ceil(window.pageYOffset + window.innerHeight) >= document.body.scrollHeight) {
          if (this.tabGroup.selectedIndex == 0) {
            this.teacherPlacePagination.hasMore.getValue() ? this.teacherPlacePagination.nextPage() : null;
          }
        }
      }
    )
  }

  private changeTabListen() {
    this.tabDetect = this.tabGroup.selectedTabChange.subscribe((evt) => {
      switch (this.tabGroup.selectedIndex) {
        case 0: {
          this.teacherPlacePagination == null ? this.getTeacherPlace() : null;
          break;
        }
        case 1: {
          this.lessonPagination == null ? this.getLesson() : null;
          break;
        }
        case 2: {
          this.teacherPagination == null ? this.getTeacher() : null;
          break;
        }
        case 3: {
          this.studantPagination == null ? this.getStudant() : null;
          break;
        }
      }
    })
  }

  private unsubscriptions() {
    this.bottomDetectTp?.unsubscribe();
    this.tabDetect?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.bottomDetectTp.unsubscribe();
    this.tabDetect.unsubscribe();
  }

}
