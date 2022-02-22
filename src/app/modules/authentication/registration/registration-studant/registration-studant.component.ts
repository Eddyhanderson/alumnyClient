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
import { OrganModel } from 'src/app/models/organ-model/organ-model';
import { OrganService } from 'src/app/services/organ-service/organ.service';
import { OrganQuery } from 'src/app/queries/organ-query/organ-query';
import { Console } from 'console';
import { StudantRegistration } from 'src/app/models/studant-registration/studant-registration';
import { CreationResult } from 'src/app/models/creation-result/creation-result';

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

  mec: FormControl;
  organ: FormControl;
  responsable: FormControl;

  password: FormControl;
  cpassword: FormControl;

  //Form group declarations
  basicInfo: FormGroup;
  profInfo: FormGroup;
  securityInfo: FormGroup;

  // Auto complete containers
  organs$: Observable<OrganModel[]>;

  constructor(private formBuilder: FormBuilder,
    private studantService: StudantService,
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar,
    private organService: OrganService) {
    accountService.logStatus.subscribe(status => {
      this.isLogin = status;
    })
  }

  ngOnInit(): void {
    this.basicInformationBuild();
    this.profissionalBuild();
    this.securityInformationBuild();
    this.getAllOrgans();
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


  private basicInformationBuild() {
    this.firstName = new FormControl('', [Validators.required, Validators.max(15), Validators.pattern(Constants.NOMENCLATURE_REGEX)]);
    this.lastName = new FormControl('', [Validators.required, Validators.max(15), Validators.pattern(Constants.NOMENCLATURE_REGEX)]);
    this.phoneNumber = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.pattern(Constants.EMAIL_REGEX)]);
    this.birth = new FormControl('', [Validators.required]);
    this.genre = new FormControl('', [Validators.required]);

    this.basicInfo = this.formBuilder.group(
      {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        birth: this.birth,
        genre: this.genre
      },
    );
  }


  private profissionalBuild() {
    this.mec = new FormControl('', [Validators.required]);
    this.organ = new FormControl('', [Validators.required]);
    this.responsable = new FormControl('', [Validators.required]);

    this.profInfo = this.formBuilder.group({
      mec: this.mec,
      organ: this.organ,
      responsable: this.responsable
    });
  }

  /**
   * To group the form controls within the securityInfo form group
   */
  private securityInformationBuild() {
    this.password = new FormControl('', [Validators.required, Validators.min(5)]);
    this.cpassword = new FormControl('', [Validators.required, this.confirmPassword(this.password)])

    this.securityInfo = this.formBuilder.group({
      password: this.password,
      cpassword: this.cpassword
    });
  }

  private getAllOrgans() {
    let query = new OrganQuery();

    let page = new PaginationQuery();

    this.organs$ = this.organService.getAll(page, query).pipe(map((response => response.data)));
  }

  /**
   * To create the user and the teacher and submit the data to the server 
   */
  public async submit(e) {

    e.disabled = true;
    this.inProgress = true;

    let data = this.setRegistrationData();

    let crtResult = await this.studantRegister(data);

    if (!crtResult?.succeded) {
      if(crtResult.errors)
        this.setErrorsMessages(crtResult.errors);

      this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
      this.router.navigateByUrl('auth/login');
      this.inProgress = false;
      return;
    }

    this.snackBar.open("Utilizador criado com sucesso").afterDismissed().subscribe(() => {
      this.router.navigateByUrl('auth/login');
    })

    this.inProgress = false;
  }

  /**
   * Send the info about user to the server to be registrated
   * @param user contain the data about user
   */
  private async studantRegister(user: StudantRegistration): Promise<CreationResult<StudantModel>> {
    if (user == null) return null;

    return await this.studantService.registration(user);
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
  private setRegistrationData(): StudantRegistration {
    let registration: StudantRegistration = {
      birth: this.basicInfo.value.birth,
      email: this.basicInfo.value.email,
      firstName: this.basicInfo.value.firstName,
      genre: this.basicInfo.value.genre,
      lastName: this.basicInfo.value.lastName,
      phoneNumber: this.basicInfo.value.phoneNumber,
      password: this.securityInfo.value.password,
      studantCode: this.profInfo.value.mec,
      organId: this.profInfo.value.organ,
      resposanble: this.profInfo.value.responsable == 1 ? true : false
    }

    console.dir(registration);
    return registration;
  }
}
