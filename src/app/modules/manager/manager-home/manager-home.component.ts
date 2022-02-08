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
    this.setStrategyToReloadPage();
    this.getManager();
    this.getTeacherSchoolsRequests();
    this.getTeachersSchool();
    this.getSchoolCourses();
  }

  ngOnDestroy(): void {
    this._reloadStrategy.unsubscribe();
  }

  private getManager() {
    this.manager = JSON.parse(localStorage.manager);
  }

  private getTeacherSchoolsRequests() {
    let schoolId = this.manager.school.id;

    let param: TeacherSchoolQuery = {
      schoolId: schoolId,
      situation: Constants.PENDING_MODEL_STATE
    }

    this.teacherSchoolsPending$ = new PaginationAdapter((query, param) => this.tss.getAll(query, param), param);
  }


  private getSchoolCourses() {
    let param: SchoolCourseQuery = {
      schoolId: this.manager.school.id,
      situation: Constants.NORMAL_MODEL_STATE
    }

    this.schoolCourses$ = new PaginationAdapter((query, param) => this.scs.getAll(query, param), param);
  }


  private getTeachersSchool() {
    let param: TeacherSchoolQuery = {
      schoolId: this.manager.school.id,
      situation: Constants.NORMAL_MODEL_STATE
    }

    this.teacherSchoolsNormal$ = new PaginationAdapter((query, param) => this.tss.getAll(query, param), param);
  }

  /* To reload component */
  private setStrategyToReloadPage() {
    this._reloadStrategy = this.router.events.subscribe(
      (evt) => {
        if (evt instanceof NavigationEnd) {
          this.getTeacherSchoolsRequests();
          this.getTeachersSchool();
          this.getSchoolCourses();
        }
      }
    )
  }

  private reloadComponent() {
    this.router.navigate([this.router.url]);
  }

  // Events handlers
  public async acceptRequest(teacherId: string) {
    let schoolId = this.manager.school.id;

    let tsModel: TeacherSchoolsModel = {
      teacherId: teacherId,
      schoolId: schoolId,
      situation: Constants.NORMAL_MODEL_STATE
    }

    var updated = await this.tss.update(teacherId, schoolId, tsModel);

    if (updated)
      this.reloadComponent();
  }

  public async onCreateCourse() {
    let dialogRef = this.matDialog.open(CourseCreateDialogComponent, {
      width: '40%',
      height: '40%'
    });

    dialogRef.afterClosed().subscribe(
      async (course) => {
        let schoolCourse: SchoolCourseModel = {
          courseId: course.id,
          schoolId: this.manager.school.id
        }
        var result = await this.scs.create(schoolCourse);

        if (result.succeded) {

          this.reloadComponent();
        }
      }
    );
  }

}
