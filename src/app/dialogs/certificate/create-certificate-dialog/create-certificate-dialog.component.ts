import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CertificateModel } from 'src/app/models/certificate-models/certificate.model';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { BottomSheetData } from 'src/app/queries/bottom-sheet-data/bottom-sheet.data';
import { CertificateService } from 'src/app/services/certificate-service/certificate.service';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { StudantService } from 'src/app/services/studant-service/studant.service';
import { BottomSheetComponent } from 'src/app/shared/components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-create-certificate-dialog',
  templateUrl: './create-certificate-dialog.component.html',
  styleUrls: ['./create-certificate-dialog.component.scss']
})
export class CreateCertificateDialogComponent implements OnInit {

  bottomData: BottomSheetData = {
    datas: [
      {
        title: 'Emitir certificado',
        action: true,
        description: 'Após emissão do certificado do último estudante a formação estará disponível para manipulação'
      },
      {
        title: 'Cancelar',
        action: false
      }
    ]
  }

  // Models
  formation: FormationModel;
  studant: StudantModel;
  certificate: CertificateModel;
  assignmentMessage: string;

  submited: boolean = false;
  methodControl: FormControl = new FormControl('', [Validators.required]);
  qualitativeResultControl: FormControl = new FormControl('');
  descriptionControl: FormControl = new FormControl('');
  scoreControl: FormControl = new FormControl('');
  maxScoreControl: FormControl = new FormControl('');

  formationGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateCertificateDialogComponent>,
    private bottomSheet: MatBottomSheet,
    private studantService: StudantService,
    private formationService: FormationService,
    private certificateService: CertificateService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.assertParams();
    this.groupFormationForm();
    this.getStudant();
    this.getFormation();
  }

  private async getStudant() {
    let studantId = this.data.studantId;
    console.log(studantId);
    this.studant = await this.studantService.get(studantId);
    console.dir(this.studant);
  }

  private async getFormation() {
    let formationId = this.data.formationId;

    this.formation = await this.formationService.get(formationId);

    if (this.studant && this.formation)
      this.buildSchoolAssignature();
  }

  // Events
  public onEmitCertificate() {
    if (!this.formationGroup.valid) return;

    var ref = this.bottomSheet.open(BottomSheetComponent, {
      data: this.bottomData
    });

    ref.afterDismissed().subscribe(async confimed => {
      if (confimed) {
        this.submited = true;
        console.dir(this.formationGroup);
        this.certificate = {
          assessmentMethod: this.formationGroup.value.method == '1' ? 'quantitative' : 'qualitative',
          assessmentScore: this.formationGroup.value.score,
          maxScore: this.formationGroup.value.maxScore,
          qualitativeResult: this.formationGroup.value.qualitativeResult,
          observation: this.formationGroup.value.description,
          assignmentSchool: this.assignmentMessage,
          subscriptionId: this.data.subscriptionId,
        }

        var result = await this.certificateService.create(this.certificate);

        if (result && result.succeded) {
          this.snackBar.open("Certificado emitido com sucesso");
          this.dialogRef.close(result.data);
        }

      } else {
        this.dialogRef.close(null);
      }
    })

  }

  private assertParams() {
    if (this.data.formationId === 'undefined')
      return new Error();

    if (this.data.studantId === 'undefined')
      return new Error();

    if (this.data.subscriptionId === 'undefined')
      return new Error();
  }

  private buildSchoolAssignature() {
    this.assignmentMessage =
      ` 
      A ${this.formation.schoolName} por meio da plataforma alumny
      certifica que o ${this.studant.firstName} ${this.studant.lastName} concluiu a formação
      ${this.formation.theme} que teve inicio aos ${this.datePipe.transform(this.formation.start, 'yyyy-MM-dd')} e o seu
  término aos ${this.datePipe.transform(this.formation.end, 'yyyy-MM-dd')} composta por ${this.formation.modulesCount}
  módulo(s) e ${this.formation.lessonCount} aula(s) com a classificação supracitado.
      `;
  }

  private groupFormationForm() {
    this.formationGroup = this.fb.group({
      description: this.descriptionControl,
      method: this.methodControl,
      qualitativeResult: this.qualitativeResultControl,
      score: this.scoreControl,
      maxScore: this.maxScoreControl
    });
  }
}
