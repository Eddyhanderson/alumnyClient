import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TeacherSchoolsService } from 'src/app/services/teacher-schools-service/teacher-schools.service';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';

import { TeacherPlaceCreateDialog } from '../../../dialogs/teacher-place/teacher-place-create-dialog/teacher-place-create.dialog';
import { TeacherSchoolsModel } from 'src/app/models/teacher-schools-model/teacher-schools.model';
import { SchoolModel } from 'src/app/models/school-model/school.model';

import { Constants } from 'src/app/shared/utils/constants';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { filter, takeUntil } from 'rxjs/operators';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';
import { TeacherPlaceQuery } from 'src/app/queries/teacher-place-query/teacher-places.query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { TeacherSchoolQuery } from 'src/app/queries/teacher-schools-query/teacher-school.query';

@Component({
  selector: 'app-teacher-place',
  templateUrl: './teacher-place.component.html',
  styleUrls: ['./teacher-place.component.scss']
})
export class TeacherPlacesComponent implements OnInit, OnDestroy {

  // Models
  teacherId: string;
  school: SchoolModel;
  academicYear: number;
  teacherSchools: TeacherSchoolsModel[];
  teacherPlaces$: PaginationAdapter<TeacherPlaceModel, TeacherPlaceQuery>;

  // Flags
  hasSchool: boolean = false;

  // Utils variables
  private destroyed = new Subject<any>();


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tss: TeacherSchoolsService,
    private tps: TeacherPlaceService,
    private matDialog: MatDialog) { }


  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit(): void {
    this.initialization();
  }

  private async initialization() {
    this.getTeaecher();
    await this.verifierIfTeacherHasSchool();
    if (this.hasSchool) {
      this.setStrategyToReloadPage();
      this.getAcademicYear();
      await this.getAllTeacherSchools();
      this.getSelectedSchool();
      await this.getAllTeacherPlaces();
    }

  }

  private getTeaecher() {
    this.teacherId = this.route.snapshot.paramMap.get('id');
  }

  private getAcademicYear() {
    this.academicYear = this.academicYear ?? new Date().getFullYear();
  }

  private async verifierIfTeacherHasSchool() {
    this.hasSchool = await this.tss.checkTeacherHasSchool(this.teacherId);
  }

  private async getAllTeacherSchools() {
    let teacherId = this.teacherId;

    let query: PaginationQuery = {
      pageSize: 50,
      pageNumber: 1,
      searchValue: ''
    };

    let param: TeacherSchoolQuery = {
      teacherId: teacherId,
      situation: Constants.NORMAL_MODEL_STATE,
      schoolId: ''
    };

    let response = await this.tss.getAll(query, param).toPromise();

    if (response != null && response.data != null)
      this.teacherSchools = response.data;
  }

  private async getAllTeacherPlaces() {

    let params: TeacherPlaceQuery = {
      schoolId: this.school.id,
      teacherId: this.teacherId
    };

    this.teacherPlaces$ = new PaginationAdapter((query, param) => this.tps.getAll(query, param), params);
  }

  private getSelectedSchool() {
    this.school = this.school ?? this.teacherSchools[0].school;
  }

  private setStrategyToReloadPage() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(event => this.getAllTeacherPlaces())
  }

  private reloadComponent() {
    this.router.navigate([this.router.url]);
  }

  public onCreateTeacherPlace() {
    let dialogRef = this.matDialog.open(TeacherPlaceCreateDialog, {
      height: 'auto',
      width: '40%',
      data: {
        teacherId: this.teacherId
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== null || data != undefined) {
        console.dir(data);
        this.reloadComponent();
      }
    });
  }

}
