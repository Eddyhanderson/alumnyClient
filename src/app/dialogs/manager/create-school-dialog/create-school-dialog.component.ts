import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SchoolIdentityModel } from 'src/app/models/school-identity-model/school-identity-model';
import { SchoolIdentityService } from 'src/app/services/school-identity-service/school-identity.service';

@Component({
  selector: 'app-create-school-dialog',
  templateUrl: './create-school-dialog.component.html',
  styleUrls: ['./create-school-dialog.component.scss']
})
export class CreateSchoolDialogComponent implements OnInit {

  submited: boolean = false;
  nameControl: FormControl = new FormControl('', [Validators.required]);
  acronymControl: FormControl = new FormControl('', Validators.required);
  nifControl: FormControl = new FormControl('', [Validators.required]);

  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneNumberControl: FormControl = new FormControl('', Validators.required);
  adressControl: FormControl = new FormControl('', Validators.required);
  identityGroup: FormGroup;
  schoolGroup: FormGroup;


  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateSchoolDialogComponent>,
    private service: SchoolIdentityService) { }

  ngOnInit(): void {
    this.groupSchoolForm();
    this.groupIdendityForm();
  }

  public async onCreateSchoolIdentity() {
    if (!this.schoolGroup.valid || !this.identityGroup.valid)
      return;

    this.submited = true;

    var schoolIdentity:SchoolIdentityModel = {
      name: this.schoolGroup.value.name,
      nif: this.schoolGroup.value.nif,
      acronym: this.schoolGroup.value.acronym,
      email: this.identityGroup.value.email,
      adress: this.identityGroup.value.adress,
      phoneNumber: this.identityGroup.value.phone
    }

    var result = await this.service.create(schoolIdentity);

    if (result.succeded) {
      this.snackBar.open("Escola criada com sucesso !").afterDismissed();
      this.dialogRef.close();
    }

  }

  private groupSchoolForm(){
    this.schoolGroup = this.fb.group({
      name:this.nameControl,
      acronym: this.acronymControl,
      nif: this.nifControl      
    });
  }

  private groupIdendityForm(){
    this.identityGroup = this.fb.group({
      email: this.emailControl,
      adress: this.adressControl,
      phone:this.phoneNumberControl
    });
  }
  
}
