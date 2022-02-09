import { Component, OnDestroy, OnInit } from '@angular/core';
import { config, Observable, Subscription } from 'rxjs';
import { CourseModel } from 'src/app/models/course-model/course.model';
import { ManagerModel } from 'src/app/models/manager-model/manager.model';
import { SchoolCourseService } from 'src/app/services/school-courses-service/school-course.service';
import { TeacherSchoolsService } from 'src/app/services/teacher-schools-service/teacher-schools.service';
import { Constants } from 'src/app/shared/utils/constants';
import { TeacherSchoolsModel } from '../../../models/teacher-schools-model/teacher-schools.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SchoolCourseModel } from 'src/app/models/school-course-model/school-course.model';
import { PaginationAdapter } from '../../../shared/utils/pagination-adapter/pagination-adapter';
import { NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CourseCreateDialogComponent } from 'src/app/dialogs/course/course-create-dialog/course-create-dialog.component';
import { TeacherSchoolQuery } from 'src/app/queries/teacher-schools-query/teacher-school.query';
import { SchoolCourseQuery } from 'src/app/queries/school-course-query/school-course.query';


@Component({
  selector: 'app-manager-school-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.scss']
})
export class ManagerHomeComponent implements OnInit, OnDestroy {
  manager: ManagerModel;
  teacherSchoolsPending$: PaginationAdapter<TeacherSchoolsModel, TeacherSchoolQuery>;
  schoolCourses$: PaginationAdapter<SchoolCourseModel, SchoolCourseQuery>;
  teacherSchoolsNormal$: PaginationAdapter<TeacherSchoolsModel, TeacherSchoolQuery>;

  private _reloadStrategy: Subscription;

  constructor(private tss: TeacherSchoolsService,
    private scs: SchoolCourseService,
    private matDialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this._reloadStrategy.unsubscribe();
  }


}
