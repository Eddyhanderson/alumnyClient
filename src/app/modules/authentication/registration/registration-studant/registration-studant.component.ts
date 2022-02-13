import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AcademicLevelModel } from 'src/app/models/academic-level-model/academic-level.model';
import { AcademyModel } from 'src/app/models/academy-model/academy.model';
import { AuthResult } from 'src/app/models/auth-result/auth-result';
import { CourseModel } from 'src/app/models/course-model/course.model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { UserModel } from 'src/app/models/user-model/user-model';
import { AcademyQuery } from 'src/app/queries/academy-query/academy.query';
import { CourseQuery } from 'src/app/queries/course-query/course.query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { AcademyService } from 'src/app/services/academy-service/academy.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { CourseService } from 'src/app/services/course-service/course.service';
import { StudantService } from 'src/app/services/studant-service/studant.service';
import { SchoolService } from 'src/app/services/school-service-3/school.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-registration-studant',
  templateUrl: './registration-studant.component.html',
  styleUrls: ['./registration-studant.component.scss']
})
export class RegistrationStudantComponent implements OnInit {

  // Auxiliar variables
  errors: string[] = [];
  inProgress: boolean = false;
  isLogin: boolean = false;

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

  // Auto complete containers
  courses$: Observable<CourseModel[]>;
  academies$: Observable<AcademyModel[]>;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private academyService: AcademyService,
    private courseService: CourseService,
    private studantService: StudantService,
    private router: Router,
    private snackBar:MatSnackBar) {
    accountService.logStatus.subscribe(status => {
      this.isLogin = status;
    })
  }

  ngOnInit(): void {
    this.basicInformationBuild();
    this.academicInformationBuild();
    this.securityInformationBuild();

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

    this.academyChangeListen();
    this.courseChangeListen();
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

  private academyChangeListen() {
    this.academyName.valueChanges.subscribe((value) => {
      let key = typeof value === 'string' ? value : value.name;
      this.academies$ = this.getAcademyFiltered(key);
    })
  }

  private getAcademyFiltered(key: string): Observable<AcademyModel[]> {
    let pagination = new PaginationQuery(1, 10, key)

    return this.academyService.getAll(pagination).pipe(map((value) => value.data));
  }

  private courseChangeListen() {
    this.courseName.valueChanges.subscribe((value) => {
      let key = typeof value === 'string' ? value : value.name;
      this.courses$ = this.getCoursesFiltered(key);
    })
  }

  private getCoursesFiltered(key: string): Observable<CourseModel[]> {
    let pagination = new PaginationQuery(1, 10, key)

    return this.courseService.getAll(pagination).pipe(map((value) => value.data));
  }

  /**
   * To create the user and the teacher and submit the data to the server 
   */
  public async submit(e) {

    e.disabled = true;
    this.inProgress = true;

    let user = this.getUser();    
    
    let authResult = await this.userRegister(user);

    if (!authResult.authenticated) {
      this.setErrorsMessages(authResult.errors);
      return;
    }

    let academyLevel = this.getAcademicLevel();
    
    let academy = await this.academyRegistration();
    
    let course = await this.courseRegistration();
    

    let studant = this.getStudant(academy, course, authResult.user, academyLevel);
    console.dir(studant);
    let stt = await this.studantRegister(studant);

    this.inProgress = false;

    if (stt != null){
      this.snackBar.open('Utilizador criado. Seja bem vindo.');      
    }


  }

  /**
   * Send the info about user to the server to be registrated
   * @param user contain the data about user
   */
  private userRegister(user: UserModel): Promise<AuthResult> {
    if (user == null) return null;

    return this.accountService.registration(user);
  }

  /**
   * To register the studant 
   * @param studant the data about studant to be persisted
   */
  private async studantRegister(studant: StudantModel) {
    let crtStt = await this.studantService.create(studant);

    if (crtStt.succeded) {
      return crtStt.data;
    }

    this.setErrorsMessages(crtStt.errors);
  }

  // Registration of academy if isn't exists
  private async academyRegistration(): Promise<AcademyModel> {
    let academyName = this.academicInfo.value.academyName;

    let academy = await this.getAcademy(academyName);

    if (academy == null) {

      let newAcademy: AcademyModel = {
        name: academyName
      };

      var crtResult = await this.academyService.create(newAcademy);

      if (crtResult.succeded)
        return crtResult.data;
    }

    return academy;
  }

  private async getAcademy(name: string) {
    let query = new AcademyQuery(name);
    let academy = await this.academyService.get(query)

    return academy;
  }

  // Registration of course if isn't exists
  private async courseRegistration(): Promise<CourseModel> {
    let courseName = this.academicInfo.value.courseName;

    let course = await this.getCourse(courseName);

    if (course == null) {

      let newCourse: CourseModel = {
        name: courseName
      };

      var crtResult = await this.courseService.create(newCourse);

      if (crtResult.succeded)
        return crtResult.data;
    }

    return course;
  }

  private async getCourse(name: string) {
    let query = new CourseQuery(name);
    let course = await this.courseService.get(query)

    return course;
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
      genre: this.basicInfo.value.genre.toUpperCase(),*/
      role: Constants.STUDANT,
      /*password: this.securityInfo.value.password*/
    };

    return user;
  }

  private getAcademicLevel() {
    console.dir(this.academicInfo);
    let academicLevelId = this.academicInfo.value.academicLevel;

    let academicLevel: AcademicLevelModel = {
      id: academicLevelId
    }

    return academicLevel;
  }

  /**
   * This method is to create the data about teacher that the user are trying to register
   * @param academy the academy of the teacher
   * @param course the course of the course
   */
  private getStudant(academy: AcademyModel, course: CourseModel, user: UserModel, academicLevel: AcademicLevelModel) {
    let studant: StudantModel = {
      courseId: course.id,
      academyId: academy.id,
      userId: user.id,
      academicLevelId: academicLevel.id
    };

    return studant;
  }
}
