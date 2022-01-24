import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseModel } from 'src/app/models/course-model/course.model';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { CourseService } from 'src/app/services/course-service/course.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-course-create-dialog',
  templateUrl: './course-create-dialog.component.html',
  styleUrls: ['./course-create-dialog.component.scss']
})
export class CourseCreateDialogComponent implements OnInit {

  course: CourseModel;

  courseControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  formGroup: FormGroup;

  filteredCourses$: Observable<CourseModel[]>;

  constructor(

    public dialogRef: MatDialogRef<CourseCreateDialogComponent>,
    private courseService: CourseService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formBuilder();
    this.getFilteredCourses();
  }

  private getFilteredCourses() {
    this.courseControl.valueChanges.subscribe(
      value => {
        if (value == '') return null;

        typeof (value) === 'string' ? this.filteredCourses$ = this.getAllCourses(value)
          : this.course = { name: value.name, id: value.id };
      }
    );
  }

  private getAllCourses(courseName: string) {

    let query: PaginationQuery = {
      pageNumber: 1,
      pageSize: 50,
      searchValue: courseName
    };

    return this.courseService.getAll(query).pipe(map((response) => response.data));
  }

  public displayFn(course: CourseModel): string {
    return course && course.name ? course.name : '';
  }

  private formBuilder(): void {
    this.formGroup = this.fb.group({
      'courseControl': this.courseControl
    })
  }
  /* Event handler */
  public async onCreateCourse() {
    if (!this.courseControl.valid) return null;

    let courseValue = this.courseControl.value;

    if (typeof (courseValue) === 'string') {

      let course: CourseModel = {
        name: courseValue
      };

      let result = await this.courseService.create(course);

      if (result.succeded) {
        this.course = result.data;

        this.dialogRef.close(this.course);
      }
    } else
      this.dialogRef.close(this.course);
  }

}
