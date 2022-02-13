import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SchoolCourseModel } from 'src/app/models/school-course-model/school-course.model';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TeacherPlaceGroup } from 'src/app/models/teacher-place-group/teacher-place.group';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { SchoolCourseQuery } from 'src/app/queries/school-course-query/school-course.query';
import { SchoolQuery } from 'src/app/queries/school-query/school.query';
import { TeacherPlaceQuery } from 'src/app/queries/teacher-place-query/teacher-places.query';
import { SchoolCourseService } from 'src/app/services/school-courses-service/school-course.service';
import { SchoolService } from 'src/app/services/school-service/school.service';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-teacher-place-picker',
  templateUrl: './teacher-place-picker.component.html',
  styleUrls: ['./teacher-place-picker.component.scss']
})
export class TeacherPlacePickerComponent implements OnInit {
  schools: SchoolModel[];
  teacher: TeacherModel;
  schoolCourses: SchoolCourseModel[];
  teacherPlaces: TeacherPlaceModel[];
  teacherPlacesGrouped = new Array<TeacherPlaceGroup>();   
  
  public teacherPlaceCtl: FormControl = new FormControl('', Validators.required);

  @Output("result")
  pickResult = new EventEmitter<FormControl>();

  constructor(private ss: SchoolService,
    private scs: SchoolCourseService, private tps: TeacherPlaceService,) { 
    }

  ngOnInit(): void {
    
    this.getTeacher();
    this.groupTeacherPlace(); 
    this.listenFormChanges();   
  }

  private async groupTeacherPlace() {

    let schoolQuery = new SchoolQuery();
    schoolQuery.teacherId = this.teacher.id;
    schoolQuery.subscribed = true;

    let pagParam = new PaginationQuery(1, -1);

    this.schools = (await this.ss.getAll(pagParam, schoolQuery).toPromise()).data;

    if (this.schools === null) return;

    for (let school of this.schools) {
      /*
      let schoolCourseQuery = new SchoolCourseQuery();
      schoolCourseQuery.schoolId = school.id;
      schoolCourseQuery.situation = Constants.NORMAL_MODEL_STATE;

      this.schoolCourses = (await this.scs.getAll(pagParam, schoolCourseQuery).toPromise()).data;

      if (this.schoolCourses?.length == 0) continue;

      for (let schoolCourse of this.schoolCourses) {


        let teacherPlaceQuery = new TeacherPlaceQuery();
        teacherPlaceQuery.schoolId = school.id;
        teacherPlaceQuery.courseId = schoolCourse.course.id;

        this.teacherPlaces = (await this.tps.getAll(pagParam, teacherPlaceQuery).toPromise()).data;


        if (this.teacherPlaces?.length == 0) continue;
        let i = this.teacherPlacesGrouped.findIndex(tp => tp.school.id == school.id);


        if (i >= 0) {
          this.teacherPlacesGrouped[i].courseTeacherPlaces.push({ course: schoolCourse.course, teacherPlaces: this.teacherPlaces });
        } else {
          this.teacherPlacesGrouped.push({
            school: school,
            courseTeacherPlaces: [{ course: schoolCourse.course, teacherPlaces: this.teacherPlaces }]
          })
        }
      }*/
    }

  }

  private getTeacher() {
    this.teacher = JSON.parse(localStorage.school);
  }

  private listenFormChanges(){
    this.teacherPlaceCtl.valueChanges.subscribe(_ => {
      this.pickResult.emit(this.teacherPlaceCtl);
    })
  }

}
