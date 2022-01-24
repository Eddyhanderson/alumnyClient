import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SchoolModel } from '../../../models/school-model/school.model';
import { UserModel } from '../../../models/user-model/user-model';
import { TeacherSchoolsService } from '../../../services/teacher-schools-service/teacher-schools.service';
import { SchoolService } from '../../../services/school-service/school.service';
import { Constants } from '../../../shared/utils/constants';
import { TeacherService } from '../../../services/teacher-service/teacher.service';
import { TeacherModel } from '../../../models/teacher-model/teacher-model';
import { TeacherSchoolsModel } from '../../../models/teacher-schools-model/teacher-schools.model';
import { AccountService } from '../../../services/account-service/account.service';
import { ManagerModel } from '../../../models/manager-model/manager.model';
import { MatDialog } from '@angular/material/dialog';
import { VideoLessonCreationComponent } from '../../../dialogs/lesson/video/create/video-lesson-creation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: UserModel;
  role: string;

  // Models  if teacher
  teacher: TeacherModel;

  // Models if manager
  manager: ManagerModel;

  // Flags 
  questionOpened:boolean = false;

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
    if (this.role.toUpperCase() === Constants.TEACHER.toUpperCase()) {
      this.getTeacherData();
    } else if (this.role.toUpperCase() === Constants.SCHOOL_MANAGER.toUpperCase()) {
      this.getManagerData();
    }
  }

  private async getTeacherData() {
    this.teacher = JSON.parse(localStorage.teacher);
  }

  private async getManagerData() {
    this.manager = JSON.parse(localStorage.manager);
  }

}
