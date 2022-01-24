import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StudantRegistrationComponent } from 'src/app/dialogs/teacher-place-studants/studant-registration/studant-registration.component';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { TeacherPlaceStudantsService } from 'src/app/services/teacher-place-studants-service/teacher-place-studants.service';
import { TeacherService } from 'src/app/services/teacher-service/teacher.service';
import { TeacherPlaceRegistrationState, UserRoles } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-teacher-place-about',
  templateUrl: './teacher-place-about.component.html',
  styleUrls: ['./teacher-place-about.component.scss']
})
export class TeacherPlaceAboutComponent implements OnInit {

  role: string = localStorage.userRole;
  isTeacher: boolean = this.role.toUpperCase() == UserRoles.Teacher.toUpperCase()
  teacherPlace: TeacherPlaceModel;
  teacher: TeacherModel;
  studant: StudantModel;
  teacherPlaceId: string;

  isOwner: boolean;
  isRegistered: boolean;

  constructor(private ts: TeacherService,
    private tps: TeacherPlaceService,
    private tpss: TeacherPlaceStudantsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { }

  public async ngOnInit() {

    await this.getTeacherPlace();
    
    await this.getTeacher();
    
    if (this.isTeacher) {
      this.checkOwner();
    } else {
      this.getStudant();
      this.checkRegistered();
    }
  }

  public gotoReview() {
    this.router.navigate(["../../review"], { relativeTo: this.route })
  }

  public onRegister() {
    this.dialog.open(StudantRegistrationComponent, {
      width: '40%',
      height: '70%',
      data: this.teacherPlace
    })
  }

  private async getDataFromHistory() {
    this.teacherPlace = history.state.data;
    this.isRegistered = history.state.isRegistered;
    this.isTeacher = history.state.isTeacher;
    this.isOwner = history.state.isOwner;
  }
  private async getTeacherPlace() {
    this.teacherPlaceId = this.route.parent?.parent?.snapshot.params?.id;
    this.teacherPlace = await this.tps.get(this.teacherPlaceId);
  }

  private async getTeacher() {
    console.dir(this.teacherPlace?.teacherId)
    this.teacher = await this.ts.get(this.teacherPlace?.teacherId);
  }
  private checkOwner() {
    let teacher = localStorage.teacher;
    this.isOwner = this.teacherPlace.teacherId == teacher.id;
  }

  private async checkRegistered() {

    var registration = await this.tpss.get(this.teacherPlace.id, this.studant.id);

    if (registration != null) {
      this.isRegistered = registration.situation == TeacherPlaceRegistrationState.Registered;
      console.log(this.isRegistered);
    } else
      this.isRegistered = false;
  }

  private getStudant() {
    this.studant = JSON.parse(localStorage.studant);
  }

}
