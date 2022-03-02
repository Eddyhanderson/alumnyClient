import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModuleModel } from 'src/app/models/module-model/modules.model';
import { ImageService } from 'src/app/services/image-service/image.service';
import { ModuleService } from 'src/app/services/module-service/module.service';
import { Constants } from 'src/app/shared/utils/constants';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Component({
  selector: 'app-create-modules-dialog',
  templateUrl: './create-modules-dialog.component.html',
  styleUrls: ['./create-modules-dialog.component.scss']
})
export class CreateModulesDialogComponent implements OnInit {
  // Models
  public modules: ModuleModel;
  public imgUrl: string;
  public imgDir: string;

  // Form Controls
  public nameCtl = new FormControl('', [Validators.required, Validators.maxLength(100)])
  public descriptionCtl = new FormControl('', Validators.required);
  dataFg: FormGroup;

  // Flags 
  submited: boolean = false;

  constructor(private is: ImageService,
    private ms: ModuleService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private matRef: MatDialogRef<CreateModulesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private formationId) { }

  ngOnInit(): void {
    this.buildFormBuilder();
  }

  public buildFormBuilder() {
    this.dataFg = this.fb.group({
      name: this.nameCtl,
      description: this.descriptionCtl,
      picture: this.imgUrl
    })
  }

  public async uploadImageEvt(event) {
    var file = event.target.files[0];

    if (file == null) return null;

    let response = await this.is.uploadImageModule(file).toPromise();

    if (response?.data) {
      this.imgDir = response.data;
      this.imgUrl = Routes.BASE_URL_SERVER_FILE + this.imgDir;
      this.snackBar.open('Miniatura criada com sucesso')
    }
    else {
      this.sendErrorMessage();
    }
  }

  public async onCreateModule() {
    if (!this.dataFg.valid) return;
    this.submited = true;
    this.modules = {
      name: this.dataFg.value.name,
      description: this.dataFg.value.description,
      picture: this.imgDir,
      formationId: this.formationId
    }

    var result = await this.ms.create(this.modules);

    if (result && result.succeded) {
      await this.snackBar.open("Modulo criado com sucesso");

      this.matRef.close(this.modules);
    } else {
      this.sendErrorMessage();
      this.matRef.close();
    }

  }

  private sendErrorMessage() {
    this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
  }

}
