import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseModel } from 'src/app/models/course-model/course.model';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { Constants } from 'src/app/shared/utils/constants';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';

// Services
import { CourseService } from 'src/app/services/course-service/course.service';
import { TeacherSchoolsService } from 'src/app/services/teacher-schools-service/teacher-schools.service';
import { SchoolCourseService } from 'src/app/services/school-courses-service/school-course.service';
import { DisciplineService } from 'src/app/services/discipline-service/discipline.service';
import { DisciplineModel } from 'src/app/models/discipline-model/discipline.model';
import { PageResponse } from 'src/app/models/page-response/page-response';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { TeacherSchoolsModel } from 'src/app/models/teacher-schools-model/teacher-schools.model';
import { SchoolCourseModel } from 'src/app/models/school-course-model/school-course.model';
import { TeacherSchoolQuery } from 'src/app/queries/teacher-schools-query/teacher-school.query';
import { SchoolCourseQuery } from 'src/app/queries/school-course-query/school-course.query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';


@Component({
  selector: 'app-create',
  templateUrl: './teacher-place-create.dialog.html',
  styleUrls: ['./teacher-place-create.dialog.scss']
})
export class TeacherPlaceCreateDialog implements OnInit {

  // Form control
  schoolControl: FormControl;
  courseControl: FormControl;
  teacherPlaceName: FormControl;
  teacherPlaceDiscipline: FormControl;
  teacherPlaceDescription: FormControl;

  // Form group
  schoolFormGroup: FormGroup;
  courseFormGroup: FormGroup;
  teacherPlaceGroup: FormGroup;

  // Models
  hasCourse: boolean = false;
  school: SchoolModel;
  course: CourseModel;
  discipline: DisciplineModel;
  teacherPlace: TeacherPlaceModel;
  disciplinesFiltered$: Observable<DisciplineModel[]>;
  teacherSchools$: PaginationAdapter<TeacherSchoolsModel, TeacherSchoolQuery>;
  schoolCourses$: PaginationAdapter<SchoolCourseModel, SchoolCourseQuery>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { teacherId: string },
    public dialogRef: MatDialogRef<TeacherPlaceCreateDialog>,
    private tss: TeacherSchoolsService,
    private tps: TeacherPlaceService,
    private scs: SchoolCourseService,
    private ds: DisciplineService,
    private fb: FormBuilder,
    private render: Renderer2,
    private el: ElementRef) { }


  ngOnInit(): void {
    this.intializeForms();
    this.getAllTeacherSchools();
  }

  private intializeForms() {
    this.schoolControl = new FormControl('', [Validators.required]);
    this.courseControl = new FormControl('', Validators.required);
    this.teacherPlaceName = new FormControl('', [Validators.required, Validators.max(25), Validators.pattern(Constants.TEXT_WITH_SPACE_AND_NUMBER_REGEX)])
    this.teacherPlaceDescription = new FormControl('', [Validators.required, Validators.max(100)]);
    this.teacherPlaceDiscipline = new FormControl('', [Validators.required, Validators.max(25), Validators.pattern(Constants.TEXT_WITH_SPACE_AND_NUMBER_REGEX)]);


    this.schoolFormGroup = this.fb.group({
      'schoolControl': this.schoolControl,
    });

    this.courseFormGroup = this.fb.group({
      'courseControl': this.courseControl
    });

    this.teacherPlaceGroup = this.fb.group({
      'teacherPlaceName': this.teacherPlaceName,
      'teacherPlaceDiscription': this.teacherPlaceDescription,
      'teacherPlaceDiscipline': this.teacherPlaceDiscipline
    });
  }

  // Teacher Schools services

  private getAllTeacherSchools() {
    let params: TeacherSchoolQuery = {
      teacherId: this.data.teacherId,
      situation: Constants.NORMAL_MODEL_STATE
    };

    this.teacherSchools$ = new PaginationAdapter(this.teacherSchoolGetAllPrototype(), params);
  }

  private schoolCourseGetAllPrototype() {
    return (query, param): Observable<any> => {
      return this.scs.getAll(query, param)
        .pipe(map((response) => {
          if (response != null && response.data.length > 0)
            this.hasCourse = true;
          return response;
        }))
    }
  }

  // School course service

  private getAllSchoolCourse(schoolId: string) {
    let params: SchoolCourseQuery = {
      schoolId: schoolId,
      situation: Constants.NORMAL_MODEL_STATE
    };

    this.schoolCourses$ = new PaginationAdapter(this.schoolCourseGetAllPrototype(), params);
  }

  private teacherSchoolGetAllPrototype() {
    return (query, param): Observable<any> => {
      return this.tss.getAll(query, param).pipe(map((data) => data))
    }
  }

  // Discipline service
  private disciplineGetAll(value: string) {
    let query: PaginationQuery = {
      pageNumber: 1,
      pageSize: 10,
      searchValue: value ?? ''
    };

    this.disciplinesFiltered$ = this.ds.getAll(query).pipe(map((response) => response.data));
  }



  // Auto complete feature
  private changeDetection() {
    this.teacherPlaceDiscipline.valueChanges.subscribe((value) => {
      if (value == null || value == undefined) return null;

      typeof value === 'string' ?
        this.disciplineGetAll(value) :
        this.discipline = value;
    })
  }

  public displayFn(discipline: DisciplineModel) {
    return discipline && discipline.name ? discipline.name : '';
  }


  // Events handlers

  public async onTeacherPlaceCreate() {
    if (!this.teacherPlaceGroup.valid) return null;

    let name = this.teacherPlaceName.value;
    let description = this.teacherPlaceDescription.value;

    if (typeof this.teacherPlaceDiscipline.value == 'string') {
      let name = this.teacherPlaceDiscipline.value;

      let discipline = new DisciplineModel(name);

      let result = await this.ds.create(discipline);

      if (result.succeded) {
        this.discipline = result.data;
        console.log(this.discipline);
      } else this.dialogRef.close();
    } else {
      this.discipline = this.teacherPlaceDiscipline.value;
    }

    /*this.teacherPlace = new TeacherPlaceModel(this.data.teacherId, this.school.id, this.course.id, this.discipline.id, name, description);*/
  }

  public async onConfirmTeacherPlace() {
    let result = await this.tps.create(this.teacherPlace);

    if (result.succeded)
      this.dialogRef.close(result.data);
  }

  public onSchoolChoice() {
    if (!this.schoolFormGroup.valid) return null;

    this.school = this.schoolControl.value;
    /*this.getAllSchoolCourse(this.school.id);*/
  }

  public onCourseChoice() {
    if (!this.courseFormGroup.valid) return null;

    this.course = this.courseFormGroup.value.courseControl;

    this.changeDetection();
  }

  // Utils
  private hideStepHeaders() {
    let stepHeaders = this.el.nativeElement.querySelectorAll('.mat-horizontal-stepper-header-container');

    stepHeaders.forEach(element => {
      this.render.setStyle(element, 'display', 'none');
    });
  }

}
