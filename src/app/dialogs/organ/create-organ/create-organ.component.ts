import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganModel } from 'src/app/models/organ-model/organ-model';
import { OrganService } from 'src/app/services/organ-service/organ.service';

@Component({
  selector: 'app-create-organ',
  templateUrl: './create-organ.component.html',
  styleUrls: ['./create-organ.component.scss']
})
export class CreateOrganDialogComponent implements OnInit {
  submited: boolean = false;
  orgaoNameControl: FormControl = new FormControl('', [Validators.required]);
  badgetControl: FormControl = new FormControl('', [Validators.required])
  formGroup: FormGroup;


  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateOrganDialogComponent>,
    private service: OrganService) { }

  ngOnInit(): void {
    this.groupForm();
  }

  public async onCreateOrgan() {
    if (!this.formGroup.valid)
      return;
    this.submited = true;

    var organ: OrganModel = {
      name: this.orgaoNameControl.value,
      badget: this.badgetControl.value
    }

    var result = await this.service.create(organ);

    if (result.succeded) {
      this.snackBar.open("Órgão criado com sucesso !").afterDismissed();
      this.dialogRef.close();
    }

  }

  private groupForm() {
    this.formGroup = this.fb.group({
      orgaoName: this.orgaoNameControl,
      badget: this.badgetControl
    })
  }

}
