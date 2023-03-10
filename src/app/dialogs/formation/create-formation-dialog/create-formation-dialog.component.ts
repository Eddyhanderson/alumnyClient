import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { Constants } from 'src/app/shared/utils/constants';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Component({
  selector: 'app-create-formation-dialog',
  templateUrl: './create-formation-dialog.component.html',
  styleUrls: ['./create-formation-dialog.component.scss']
})
export class CreateFormationDialogComponent implements OnInit {
  public imgUrl: string;
  public imgDir: string;
  formation: FormationModel;

  submited: boolean = false;
  themeControl: FormControl = new FormControl('', [Validators.required]);
  categoryControl: FormControl = new FormControl('', [Validators.required]);
  descriptionControl: FormControl = new FormControl('', [Validators.required, Validators.max(100)]);
  priceControl: FormControl = new FormControl('', Validators.required);

  formationGroup: FormGroup;

  constructor(
    private is: ImageService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateFormationDialogComponent>,
    private service: FormationService) { }

  ngOnInit(): void {
    this.groupFormationForm();
  }

  public async uploadImageEvt(event) {
    var file = event.target.files[0];

    if (file == null) return null;

    let response = await this.is.uploadImageFormation(file).toPromise();

    if (response?.data) {
      this.imgDir = response.data;
      this.imgUrl = Routes.BASE_URL_SERVER_FILE + this.imgDir;
      this.snackBar.open('Miniatura criada com sucesso')
    }
    else {
      this.sendErrorMessage();
    }
  }

  public async onCreateFormation() {
    if (!this.formationGroup.valid)
      return;

    this.submited = true;

    this.formation = {
      theme: this.formationGroup.value.theme,
      category: this.formationGroup.value.category,
      description: this.formationGroup.value.description,
      price: this.formationGroup.value.price,
      picture: this.imgDir,
      schoolId: JSON.parse(localStorage.school).id
    }

    var result = await this.service.create(this.formation);

    if (result && result.succeded) {
      await this.snackBar.open("Forma????o criada com sucesso !").afterDismissed().toPromise();
      this.dialogRef.close(this.formation);
    } else {
      await this.snackBar.open("Forma????o n??o criada, tente novamente.").afterDismissed().toPromise();
      this.dialogRef.close();
    }

  }

  private groupFormationForm() {
    this.formationGroup = this.fb.group({
      description: this.descriptionControl,
      theme: this.themeControl,
      category: this.categoryControl,
      price: this.priceControl
    });
  }

  private sendErrorMessage() {
    this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
  }

}
