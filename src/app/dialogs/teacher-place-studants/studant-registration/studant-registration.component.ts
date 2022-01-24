import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { TeacherPlaceStudantsModel } from 'src/app/models/teacher-place-studants-model/teacher-place-studants.model';
import { TeacherPlaceStudantsService } from 'src/app/services/teacher-place-studants-service/teacher-place-studants.service';
import { Constants, TeacherPlaceRegistrationState } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-studant-registration',
  templateUrl: './studant-registration.component.html',
  styleUrls: ['./studant-registration.component.scss']
})
export class StudantRegistrationComponent implements OnInit {

  private readonly DAYS_IN_MONTH = 31;

  constructor(@Inject(MAT_DIALOG_DATA) public teacherPlace: TeacherPlaceModel,
    public dialogRef: MatDialogRef<StudantRegistrationComponent>,
    private router: Router,
    private tpss: TeacherPlaceStudantsService,
    private snackBar: MatSnackBar,
  ) {


  }

  // Models
  studant: StudantModel;
  total: number;
  months: number = 1;
  cardCtl = new FormControl('', Validators.required);
  registrationModel: TeacherPlaceStudantsModel;

  // Flags
  submited = false;

  ngOnInit(): void {
    this.getPrice();
    this.getStudant();
    this.dialogRef.updateSize('60%', '70%');
  }

  formatLabel = (value: number) => value;

  public onMonthsChange(event: MatSliderChange) {
    if (event.value > 1) {
      this.total = this.teacherPlace.price * event.value;
      this.months = event.value;
    }
  }

  public async onRegistrate() {

    if (this.cardCtl.valid) {
      this.submited = true;
      this.registrationModel = {
        situation: TeacherPlaceRegistrationState.Registered,
        studantId: this.studant.id,
        teacherPlaceId: this.teacherPlace.id,
        months: this.months
      };

      console.dir(this.registrationModel);

      let stt = await this.tpss.create(this.registrationModel);

      if (stt.succeded) {
        await this.snackBar.open(`Seja bem vindo à turma ${this.teacherPlace.name}. O professor ${this.teacherPlace.teacherFirstName} agradece a tua escolha.`)
          .afterDismissed().toPromise();

        this.router.navigate(['/']).then(() => {
          this.router.navigate(["/teacher-place", this.teacherPlace.id, 'profile', 'lessons']);
        });

        this.dialogRef.close(stt.data);
        this.submited = false;

      } else {
        await this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE)
          .afterDismissed().toPromise();
        this.dialogRef.close(null);
        this.submited = false;
      }
    }
  }

  private getStudant() {
    this.studant = JSON.parse(localStorage.studant);
  }

  private getPrice() {
    this.total = this.teacherPlace.price;
  }
}
