import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormationEventModel } from 'src/app/models/formation-event-model/formation-event.model';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { FormationEventService } from 'src/app/services/formation-event/formation-event.service';

@Component({
  selector: 'app-create-formation-event',
  templateUrl: './create-formation-event.component.html',
  styleUrls: ['./create-formation-event.component.scss']
})
export class CreateFormationEventComponent implements OnInit {

  submited: boolean = false;
  startControl: FormControl = new FormControl('', [Validators.required]);
  endControl: FormControl = new FormControl('', [Validators.required]);
  limitControl: FormControl = new FormControl('', [Validators.required]);

  //Model
  school: SchoolModel;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateFormationEventComponent>,
    private service: FormationEventService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private formationId: string) { }

  ngOnInit(): void {
    this.groupForm();
    this.getSchool();
  }

  public async onPublish() {
    if (!this.formGroup.valid)
      return;

    this.submited = true;

    var event: FormationEventModel = {
      end: this.formGroup.value.end,
      start: this.formGroup.value.start,
      studantLimit: this.formGroup.value.limit,
      formationId: this.formationId
    }

    console.dir(event);

    var result = await this.service.create(event);

    if (result && result.succeded) {
      await this.snackBar.open("Formação publicada com sucesso !").afterDismissed().toPromise();
      this.router.navigate(['formations', this.school.id]);
      this.dialogRef.close();
    } else {
      await this.snackBar.open("Formação não publicada, tente novamente.").afterDismissed().toPromise();
      this.dialogRef.close();
    }

  }

  private groupForm() {
    this.formGroup = this.fb.group({
      start: this.startControl,
      end: this.endControl,
      limit: this.limitControl
    });
  }

  private getSchool() {
    this.school = JSON.parse(localStorage.school);
  }


}
