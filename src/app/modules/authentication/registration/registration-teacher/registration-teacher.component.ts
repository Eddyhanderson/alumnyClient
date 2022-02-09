import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form, ValidatorFn, AbstractControl } from '@angular/forms';
import { Constants } from 'src/app/shared/utils/constants';

// Models
import { UserModel } from 'src/app/models/user-model/user-model';
import { AcademyModel } from 'src/app/models/academy-model/academy.model';
import { CourseModel } from 'src/app/models/course-model/course.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import {AcademicLevelModel} from 'src/app/models/academic-level-model/academic-level.model';

// Services
import { AccountService } from 'src/app/services/account-service/account.service';
import { AcademyService } from 'src/app/services/academy-service/academy.service';
import { CourseService } from 'src/app/services/course-service/course.service';
import { TeacherService } from 'src/app/services/teacher-service/teacher.service';

import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-studant',
  templateUrl: './registration-teacher.component.html',
  styleUrls: ['./registration-teacher.component.scss']
})
export class RegistrationTeacherComponent implements OnInit {

  // Auxiliary variables
  errors: string[] = [];
  inProgress: boolean = false;
  isLogin:boolean = false;

  //Form control declarations
  firstName: FormControl;
  lastName: FormControl;
  phoneNumber: FormControl;
  email: FormControl;
  birth: FormControl;
  genre: FormControl;

  academicLevel: FormControl;
  academyName: FormControl;
  courseName: FormControl;

  password: FormControl;
  cpassword: FormControl;

  //Form group declarations
  basicInfo: FormGroup;
  academicInfo: FormGroup;
  securityInfo: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private academyService: AcademyService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private router: Router,
    private snackBar:MatSnackBar) 
    {
      accountService.logStatus.subscribe(status =>{
        this.isLogin = status;
      })
     }

  /**
   * To validate the password
   * @param password to compare with confirm password
   */
  private confirmPassword(password: AbstractControl): ValidatorFn {
    return (cpassword: AbstractControl): { [key: string]: any; } | null => {

      if (password.value === cpassword.value) return null;

      return { 'matched': true };
    }
  }

  /**
   * To group the form controls within the basicInfo form group
   */
  private basicInformationBuild() {
    this.firstName = new FormControl('', [Validators.required, Validators.max(15), Validators.pattern(Constants.NOMENCLATURE_REGEX)]);
    this.lastName = new FormControl('', [Validators.required, Validators.max(15), Validators.pattern(Constants.NOMENCLATURE_REGEX)]);
    this.phoneNumber = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.pattern(Constants.EMAIL_REGEX)]);
    this.birth = new FormControl('', [Validators.required]);
    this.genre = new FormControl('', [Validators.required]);

    this.basicInfo = this.formBuilder.group(
      {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "phoneNumber": this.phoneNumber,
        "email": this.email,
        "birth": this.birth,
        "genre": this.genre
      },
    );
  }

  /**
   * To group the form controls within the academicInfo form group
   */
  private academicInformationBuild() {
    this.academicLevel = new FormControl('', [Validators.required, Validators.pattern(Constants.NUMERIC_REGEX)]);
    this.academyName = new FormControl('', [Validators.required, Validators.pattern(Constants.TEXT_WITH_SPACE_AND_NUMBER_REGEX)]);
    this.courseName = new FormControl('', [Validators.required, Validators.pattern(Constants.TEXT_WITH_SPACE_REGEX)]);

    this.academicInfo = this.formBuilder.group({
      'academicLevel': this.academicLevel,
      'academyName': this.academyName,
      'courseName': this.courseName
    });
  }

  /**
   * To group the form controls within the securityInfo form group
   */
  private securityInformationBuild() {
    this.password = new FormControl('', [Validators.required, Validators.min(5)]);
    this.cpassword = new FormControl('', [Validators.required, this.confirmPassword(this.password)])

    this.securityInfo = this.formBuilder.group({
      'password': this.password,
      'cpassword': this.cpassword
    });
  }

  /**
   * To create the user and the teacher and submit the data to the server 
   */
  public async submit(e) {

    e.disabled = true;
    this.inProgress = true;

    let user = this.getUser();

    let authResult = await this.userRegister(user)
    .catch((error) => {
      this.setErrorsMessages(error.error.errors);
      return null;
    });

    if (authResult.authenticated) {

      let academy = await this.academyRegistration();
      let course = await this.courseRegistration();
      let academyLevel = this.getAcademicLevel();

      let teacher = this.getTeacher(academy, course, authResult.user, academyLevel);
      let stt = this.teacherRegister(teacher);

      this.inProgress = false;

      if(stt != null){
        this.snackBar.open('Utilizador criado. Seja bem vindo.');
        this.router.navigateByUrl('/teacher/control-painel');
      }

    } else {
      this.setErrorsMessages(authResult.errors);
    }    
  }

  /**
   * Send the info about user to the server to be registrated
   * @param user contain the data about user
   */
  private userRegister(user: UserModel): Promise<any> {
    if (user == null) return null;

    return this.accountService.registration(user);
  }

  /**
   * To register the teacher 
   * @param teacher the data about teacher to be persisted
   */
  private async teacherRegister(teacher: TeacherModel) {
    let data = await this.teacherService.create(teacher)
      .catch((error: HttpErrorResponse) => { this.setErrorsMessages(Array.of(error.message)); return null; });
    
      return data;
  }

  // Registration of academy if isn't exists
  private async academyRegistration(): Promise<AcademyModel> {
    let academyName = this.academicInfo.value.academyName;

    let newAcademy: AcademyModel = {
      name: academyName
    };

    var response = await this.academyService.create(newAcademy)
    .catch((e: HttpErrorResponse) => {
      console.error(e.message)
      this.setErrorsMessages(Array.of(e.message));
      return null;
    });

    if (!response.succeded) {
      this.setErrorsMessages(response.errors);
      return null;
    }

    return response.data as AcademyModel;
  }

  // Registration of course if isn't exists
  private async courseRegistration(): Promise<CourseModel> {
    let courseName = this.academicInfo.value.courseName;

    let newCourse: CourseModel = {
      name: courseName
    };
 
    var response = await this.courseService.create(newCourse)
    .catch((e: HttpErrorResponse) => {
      console.error(e.message)
      this.setErrorsMessages(Array.of(e.message));
      return null;
    });

    if (!response.succeded) {
      this.setErrorsMessages(response.errors);
      return null;
    }

    return response.data as CourseModel;
  }

  /**
   * Append error message on errors list to display for user
   * @param error the message error to append on the errors list
   */
  private setErrorsMessages(errors: string[]) {
    errors.forEach(error => {
      this.errors.push(error);
    });

  }

  /**
   * Create an instance of user to register
   * @returns the user that was create
   */
  private getUser(): UserModel {
    let user: UserModel = {
      /*firstName: this.basicInfo.value.firstName,
      lastName: this.basicInfo.value.lastName,
      phoneNumber: this.basicInfo.value.phoneNumber,
      email: this.basicInfo.value.email,
      birth: this.basicInfo.value.birth,
      genre: this.basicInfo.value.genre,
      role: Constants.TEACHER,
      password: this.securityInfo.value.password*/
    };

    return user;
  }

  private getAcademicLevel(){
    let academicLevelId = this.academicInfo.value.academicLevel;

     let academicLevel:AcademicLevelModel = {
        id:academicLevelId
     }
       
    return academicLevel;
  }

  /**
   * This method is to create the data about teacher that the user are trying to register
   * @param academy the academy of the teacher
   * @param course the course of the course
   */
  private getTeacher(academy: AcademyModel, course: CourseModel, user: UserModel, academicLevel:AcademicLevelModel) {    
    let teacher: TeacherModel = {
      courseId:course.id,
      academyId:academy.id,
      userId:user.id,
      academicLevelId: academicLevel.id
    };

    return teacher;
  }

  ngOnInit(): void {
    this.basicInformationBuild();
    this.academicInformationBuild();
    this.securityInformationBuild();
  }

}
