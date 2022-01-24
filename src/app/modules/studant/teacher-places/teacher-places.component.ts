import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { TeacherSchoolsModel } from 'src/app/models/teacher-schools-model/teacher-schools.model';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { SchoolQuery } from 'src/app/queries/school-query/school.query';
import { TeacherPlaceQuery } from 'src/app/queries/teacher-place-query/teacher-places.query';
import { TeacherSchoolQuery } from 'src/app/queries/teacher-schools-query/teacher-school.query';
import { SchoolService } from 'src/app/services/school-service/school.service';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { TeacherSchoolsService } from 'src/app/services/teacher-schools-service/teacher-schools.service';
import { TeacherService } from 'src/app/services/teacher-service/teacher.service';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';

type Filter = { id: string, name: string, type: string };

@Component({
  selector: 'app-teacher-places',
  templateUrl: './teacher-places.component.html',
  styleUrls: ['./teacher-places.component.scss']
})
export class TeacherPlacesComponent implements OnInit {

  // keys
  schoolId: string;
  teacherId: string;

  // Models  
  studant: StudantModel;
  teacherSchools: TeacherSchoolsModel[];
  teachers = new Array<TeacherModel>();
  teacher: TeacherModel;
  schools = new Array<SchoolModel>();
  school: SchoolModel;

  teacherPlaces$: PaginationAdapter<TeacherPlaceModel, TeacherPlaceQuery>;

  filters: Filter[] = new Array();

  // Flags
  hasSchool: boolean = false;

  // Utils variables
  private destroyed = new Subject<any>();


  constructor(
    private route: ActivatedRoute,
    private ts: TeacherService,
    private ss: SchoolService,
    private tps: TeacherPlaceService,
    private tss: TeacherSchoolsService) { }


  ngOnDestroy(): void {

  }

  public async ngOnInit() {
    this.getStudant();
    await this.getAllTeacherPlaces();
    this.getAllTeacherSchools();
    this.getTeacherFromQuery();
    this.getSchoolFromQuery();
  }

  public onSchoolPicked(school: SchoolModel) {
    if (school.id != this.school?.id) {
      this.school = school;
      this.schoolFilterBuild(this.school);
    }
  }

  public onTeacherPicked(teacher: TeacherModel) {
    if (this.teacher?.id != teacher.id) {
      this.teacher = teacher;
      this.teacherFilterBuild(this.teacher);
    }
  }

  public trackByTeacherPlaceId(index: number, teacherPlace: any): string {
    return teacherPlace.id
  }

  public remove(id: string, type: string) {
    var start = this.filters.findIndex(filter => filter.id == id);
    this.filters.splice(start);
    switch (type) {
      case "school": {
        this.teacherPlaces$.setParam = { schoolId: "" }
        break;
      }
      case "teacher": {
        this.teacherPlaces$.setParam = { teacherId: "" }
        break;
      }
    }
  }

  public trackBy = (index, data) => data.id;

  private async teacherFilterBuild(teacher: TeacherModel) {
    this.filters.push({ id: teacher.id, name: teacher.firstName + teacher.lastName, type: "teacher" });
    this.teacherPlaces$.setParam = { teacherId: teacher.id };
  }

  private async schoolFilterBuild(school: SchoolModel) {
    this.filters.push({ id: school.id, name: school.name, type: "school" });
    this.teacherPlaces$.setParam = { schoolId: school.id };
  }


  private getStudant() {
    this.studant = JSON.parse(localStorage.studant);
  }

  private async getAllTeacherPlaces() {

    let params: TeacherPlaceQuery = {
      studantId: this.studant.id,
      teacherId: this.teacherId ?? '',
      schoolId: this.schoolId ?? ''
    };

    this.teacherPlaces$ = new PaginationAdapter((query, param) => this.tps.getAll(query, param), params);
  }

  private async getAllTeacherSchools() {
    let param: TeacherSchoolQuery = {
      studantId: this.studant.id
    }

    let pagination = new PaginationQuery(1, -1);

    var response = await this.tss.getAll(pagination, param).toPromise();

    this.teacherSchools = response?.data;

    this.splitTeacherSchools();
  }

  private splitTeacherSchools() {
    var schoolSet = new Set(this.teacherSchools.map(ts => ts.school.id));
    var teacherSet = new Set(this.teacherSchools.map(ts => ts.teacher.id));

    schoolSet.forEach(v => {
      let teacherSchool = this.teacherSchools.find(ts => ts.school.id == v);
      this.schools.push(teacherSchool.school);
    })

    teacherSet.forEach(v => {
      let teacherSchool = this.teacherSchools.find(ts => ts.teacher.id == v);
      this.teachers.push(teacherSchool.teacher);
    })

  }

  private async getTeacherFromQuery() {
    this.teacherId = this.route.snapshot.queryParams.teacher;

    if (this.teacherId) {
      this.teacher = await this.ts.get(this.teacherId);
      this.teacherFilterBuild(this.teacher);
    }

  }

  private async getSchoolFromQuery() {
    this.schoolId = this.route.snapshot.queryParams.school;

    if (this.schoolId) {
      this.school = await this.ss.get(this.schoolId);
      this.schoolFilterBuild(this.school);
    }

  }

}

