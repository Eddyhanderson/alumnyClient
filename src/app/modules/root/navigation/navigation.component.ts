import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolModel } from '../../../models/school-model/school.model';
import { UserModel } from '../../../models/user-model/user-model';
import { TeacherSchoolsService } from '../../../services/teacher-schools-service/teacher-schools.service';
import { Constants } from '../../../shared/utils/constants';
import { TeacherSchoolsModel } from '../../../models/teacher-schools-model/teacher-schools.model';
import { AccountService } from '../../../services/account-service/account.service';
import { ManagerModel } from '../../../models/manager-model/manager.model';
import { MatDialog } from '@angular/material/dialog';
import { VideoLessonCreationComponent } from '../../../dialogs/lesson/video/create/video-lesson-creation.component';
import { Router } from '@angular/router';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: UserModel;
  role: string;

  // Models  if teacher
  school: SchoolModel;

  // Models if manager
  manager: ManagerModel;

  // Models if studant
  studant: StudantModel;

  // Flags 
  questionOpened: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.getUser();
    this.getRole();
    this.getRoleData();
  }



  private getUser() {
    this.user = JSON.parse(localStorage.user);
  }

  private getRole() {
    this.role = localStorage.userRole;
  }

  private getRoleData() {
    if (this.role.toUpperCase() === Constants.SCHOOL.toUpperCase()) {
      this.getSchoolData();
    } else if (this.role.toUpperCase() === Constants.MANAGER.toUpperCase()) {
      this.getManagerData();
    } else if(this.role.toUpperCase() == Constants.STUDANT.toUpperCase())
    {
      this.getStudantData();
    }
  }

  private async getSchoolData() {
    this.school = JSON.parse(localStorage.school);
  }

  private async getManagerData() {
    this.manager = JSON.parse(localStorage.manager);
  }

  private async getStudantData() {
    this.studant = JSON.parse(localStorage.studant);
  }

  public buildImageUrl(url: string) { return Routes.BASE_URL_SERVER_FILE.concat(url) }
}
