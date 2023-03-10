import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager-service/manager.service';
import { SchoolService } from 'src/app/services/school-service-3/school.service';

import { Constants } from 'src/app/shared/utils/constants';
import { ArticleLessonCreationComponent } from '../../../dialogs/lesson/article/create/article-lesson-creation.component';
import { VideoLessonCreationComponent } from '../../../dialogs/lesson/video/create/video-lesson-creation.component';
import { UserModel } from '../../../models/user-model/user-model';
import { StudantService } from '../../../services/studant-service/studant.service';

@Component({
  selector: 'app-build',
  templateUrl: './app-build.component.html',
  styleUrls: ['./app-build.component.scss']
})
export class AppBuildComponent implements OnInit {

  search: string;
  loaded: boolean;
  role: string = localStorage.getItem('userRole');
  user: UserModel = JSON.parse(localStorage.getItem('user'));
  loginRoute = /auth\/login$/;

  constructor(
    private schoolService: SchoolService,
    private managerService: ManagerService,
    private studantService: StudantService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loaded = false;
    this.setRoleData();
  }

  private async setRoleData() {
    if (this.role.toUpperCase() === Constants.SCHOOL.toUpperCase()) {
      await this.setSchoolData();
    } else if (this.role.toUpperCase() === Constants.MANAGER.toUpperCase()) {
      await this.setManagerData();
    } else if (this.role.toUpperCase() === Constants.STUDANT.toUpperCase()) {
      await this.setStudantData();
    }
  }

  private async setSchoolData() {
    let succeded = await this.schoolService.setSchoolData(this.user.id);
    if (succeded) {
      await this.navigateToSchoolHome();
      this.loaded = true;
    } else {
      this.navigateToLogin();
    }
  }

  private async setManagerData() {
    let succeded = await this.managerService.setManagerData(this.user.id);

    if (succeded) {
      await this.navigateToManagerHome();
      this.loaded = true;
    } else {
      this.navigateToLogin();
    }
  }

  private async setStudantData() {
    let succeded = await this.studantService.setStudantData(this.user.id);

    if (succeded) {
      await this.navigateToStudantHome();
      this.loaded = true;
    } else {
      this.navigateToLogin();
    }
  }

  private async navigateToSchoolHome() {
    if (this.router.url.match(this.loginRoute)) {
      var schoolId = JSON.parse(localStorage.school).id;
      return await this.router.navigate(['formations', schoolId])
    }

    return this.router.navigate[this.router.url];
  }

  private async navigateToManagerHome() {    
    if (this.router.url.match(this.loginRoute))
      await this.router.navigate(['/manager/home'])

    return this.router.navigate[this.router.url];
  }

  private async navigateToStudantHome() {
    if (this.router.url.match(this.loginRoute))
      await this.router.navigate(['/home'])

    return this.router.navigate[this.router.url];
  }

  private async navigateToLogin() {
    // TODO: Fill the case when trying to acess page other than teacher home
    this.router.navigate(["/login"]);
  }
}
