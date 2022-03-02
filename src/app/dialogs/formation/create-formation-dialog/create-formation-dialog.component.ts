import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { FormationService } from 'src/app/services/formation-service/formation.service';

@Component({
  selector: 'app-create-formation-dialog',
  templateUrl: './create-formation-dialog.component.html',
  styleUrls: ['./create-formation-dialog.component.scss']
})
export class CreateFormationDialogComponent implements OnInit {
  formation:FormationModel;

  submited: boolean = false;
  themeControl: FormControl = new FormControl('', [Validators.required]);
  categoryControl: FormControl = new FormControl('', [Validators.required]);
  descriptionControl: FormControl = new FormControl('', [Validators.required, Validators.max(100)]);
  priceControl: FormControl = new FormControl('', Validators.required);

  formationGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateFormationDialogComponent>,
    private service: FormationService) { }

  ngOnInit(): void {
    this.groupFormationForm();
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
      schoolId: JSON.parse(localStorage.school).id
    }    

    var result = await this.service.create(this.formation);

    if (result && result.succeded) {
      await this.snackBar.open("Formação criada com sucesso !").afterDismissed().toPromise();
      this.dialogRef.close(this.formation);
    }else{
      await this.snackBar.open("Formação não criada, tente novamente.").afterDismissed().toPromise();
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



}
