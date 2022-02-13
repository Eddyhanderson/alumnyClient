import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model/user-model';
import { ManagerModel } from 'src/app/models/manager-model/manager.model';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { AccountService } from 'src/app/services/account-service/account.service';
import { SchoolService } from 'src/app/services/school-service/school.service';
import { ManagerService } from 'src/app/services/manager-service/manager.service';
import { Constants } from 'src/app/shared/utils/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-registration-school',
  templateUrl: './registration-school.component.html',
  styleUrls: ['./registration-school.component.scss']
})
export class RegistrationSchoolComponent implements OnInit {

  // Auxiliary variables
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

  schoolName: FormControl;
  shortName: FormControl;

  password: FormControl;
  cpassword: FormControl;

  //Form group declarations
  schoolInfo: FormGroup;
  managerInfo: FormGroup;
  securityInfo: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private schoolService: SchoolService,
    private managerService: ManagerService,
    private router: Router) 
  {
    this.accountService.logStatus.subscribe(status => {
      this.isLogin = status;
    })
  }

  ngOnInit(): void {
    this.basicInformationBuild();
    this.schoolBuild();
    this.securityInformationBuild();
  }

  /**
   * To create the user manager and to associate with school
   */
  public async submit(e: HTMLButtonElement) {

    e.disabled = true;

    this.inProgress = true;

    let user = this.getUser();

    let school = this.getSchool();

    let authResult = await this.userRegister(user).catch((error) => {
      this.setErrorsMessages(error.error.errors);
      return null;
    });

    if (authResult.authenticated) {

      let responseK = await this.schoolRegister(school)
      .catch((e: HttpErrorResponse) => {
        this.setErrorsMessages(Array.of(e.message));
        return null;
      });

      if (responseK?.succeded) {
        let manager = this.getManager(responseK.data, authResult.user);

        /*let responseX = await this.managerService.create(manager)
        .catch((e: HttpErrorResponse) => {
          this.setErrorsMessages(Array.of(e.message));
          return null;
        });*/
        /*if (!responseX.succeded) {
          this.setErrorsMessages(responseX.errors);
        }*/
        return this.router.navigateByUrl('manager-school/home');
      } else {
        this.setErrorsMessages(responseK.errors);
      }
    } else {
      this.setErrorsMessages(authResult.errors);
    }
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
   * To register the teacher 
   * @param teacher the data about teacher to be persisted
   */
  private async schoolRegister(school: SchoolModel) {
    let response = await this.schoolService.create(school)
      .catch((error: HttpErrorResponse) => { this.setErrorsMessages(Array.of(error.message)); return null; });

    return response;
  }

  /**
   * To group the form controls within the basicInfo form group
   */
  private basicInformationBuild() {
    this.firstName = new FormControl('', [Validators.required, Validators.max(15), Validators.pattern(Constants.NOMENCLATURE_REGEX)]);
    this.lastName = new FormControl('', [Validators.required, Validators.max(15), Validators.pattern(Constants.NOMENCLATURE_REGEX)]);
    this.phoneNumber = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.pattern(''), Validators.pattern(Constants.EMAIL_REGEX)]);
    this.birth = new FormControl('', [Validators.required]);
    this.genre = new FormControl('', [Validators.required]);

    this.managerInfo = this.formBuilder.group(
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
   * To group the form controls within the schoolInfo form group
   */
  private schoolBuild() {
    this.schoolName = new FormControl('', [Validators.required, Validators.pattern(Constants.TEXT_WITH_SPACE_AND_NUMBER_REGEX)]);
    this.shortName = new FormControl('', [Validators.required, Validators.pattern(Constants.NOMENCLATURE_REGEX)]);

    this.schoolInfo = this.formBuilder.group({
      'schoolName': this.schoolName,
      'shortName': this.shortName
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
      /*firstName: this.managerInfo.value.firstName,
      lastName: this.managerInfo.value.lastName,
      phoneNumber: this.managerInfo.value.phoneNumber,
      email: this.managerInfo.value.email,
      birth: this.managerInfo.value.birth,
      genre: this.managerInfo.value.genre,
      role: Constants.MANAGER,
      password: this.securityInfo.value.password*/
    };

    return user;
  }

  /**
   * Create an instance of school to register
   * @returns the user that was create
   */
  private getSchool(): SchoolModel {
    /*
    let school: SchoolModel = {
      name: this.schoolInfo.value.schoolName,
      shortName: this.schoolInfo.value.shortName,
    };

    return school;*/
    return new SchoolModel();
  }

  /**
   * Create an instance of school to register
   * @returns the user that was create
   */
  private getManager(school: SchoolModel, user: UserModel): ManagerModel {

    let manager: ManagerModel = {
      /*user: user,*/
      /*school: school*/
    };

    return manager;
  }

  /**
   * Send the info about user to the server to be registrated
   * @param user contain the data about user
   */
  private userRegister(user: UserModel): Promise<any> {
    if (user == null) return null;

    return this.accountService.registration(user);
  }

}
