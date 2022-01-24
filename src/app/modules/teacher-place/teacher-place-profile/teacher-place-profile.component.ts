import { Component, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StudantRegistrationComponent } from 'src/app/dialogs/teacher-place-studants/studant-registration/studant-registration.component';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { TeacherPlaceStudantsService } from 'src/app/services/teacher-place-studants-service/teacher-place-studants.service';
import { TeacherPlaceRegistrationState, UserRoles } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-teacher-place-profile',
  templateUrl: './teacher-place-profile.component.html',
  styleUrls: ['./teacher-place-profile.component.scss']
})
export class TeacherPlaceProfileComponent implements OnInit {

  teacherPlace: TeacherPlaceModel;
  teacher: TeacherModel;
  studant: StudantModel;
  role: string = localStorage.userRole;

  isTeacher: boolean = this.role.toUpperCase() == UserRoles.Teacher.toUpperCase()
  isRegistered: boolean;

  isOwner: boolean;

  constructor(private route: ActivatedRoute,
    private tps: TeacherPlaceService,
    private tpss: TeacherPlaceStudantsService,
    private dialog: MatDialog) { }


  public async ngOnInit() {
    await this.getTeacherPlace();

    if (this.isTeacher) {
      this.getTeacher();
      this.checkOwner();
    } else {
      this.getStudant();
      this.checkRegistered();
    }
  }

  public onRegister() {
    this.dialog.open(StudantRegistrationComponent, {
      width: '40%',
      height: '70%',
      data: this.teacherPlace 
    })
  }

  private checkOwner() {
    this.isOwner = this.teacherPlace.teacherId == this.teacher.id;
  }

  private async checkRegistered() {

    var registration = await this.tpss.get(this.teacherPlace.id, this.studant.id);    

    if (registration != null)
      this.isRegistered = registration.situation == TeacherPlaceRegistrationState.Registered;    
  }

  private getTeacher() {
    this.teacher = JSON.parse(localStorage.teacher);
  }

  private getStudant() {
    this.studant = JSON.parse(localStorage.studant);
  }

  private async getTeacherPlace() {
    let id = this.route.snapshot.paramMap.get('id');

    this.teacherPlace = await this.tps.get(id);
  }
}
