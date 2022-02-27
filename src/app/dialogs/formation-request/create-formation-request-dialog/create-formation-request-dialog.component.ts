import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationRequestModel } from 'src/app/models/formation-request-model/formation-request.model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { FormationRequestService } from 'src/app/services/formation-request/formation-request.service';
import { StudantService } from 'src/app/services/studant-service/studant.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-create-formation-request-dialog',
  templateUrl: './create-formation-request-dialog.component.html',
  styleUrls: ['./create-formation-request-dialog.component.scss']
})
export class CreateFormationRequestDialogComponent implements OnInit, AfterViewInit {
  // Models
  description: string;
  studant: StudantModel;
  responsable: StudantModel;

  // Flags
  submited: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private formationId: string,
    private matSnack: MatSnackBar,
    private requestService: FormationRequestService,
    private studantService: StudantService,
    private dialogRef: MatDialogRef<CreateFormationRequestDialogComponent>) { }


  async ngAfterViewInit() {
    this.getStudant();
    if (this.studant)
      this.getResponsable();
  }

  ngOnInit(): void {

  }

  public getStudant() {
    this.studant = JSON.parse(localStorage.studant);
  }

  private async getResponsable() {
    this.studantService.getResponsable(this.studant.id).then((responsable) => {
      if (!responsable) {
        this.matSnack.open("Parece que o teu órgão não tem responsável. Contacte a Academia.");
        this.dialogRef.close(null);
      } else {
        this.responsable = responsable;
      }
    });

  }

  public async onRequestFormation() {
    if (this.studant) {
      this.submited = true;

      var formationRequest: FormationRequestModel = {
        formationId: this.formationId,
        studantId: this.studant.id,
        studantMessage: this.description
      }

      var result = await this.requestService.create(formationRequest);

      if (result && result.succeded) {
        this.matSnack.open("Solicitação Enviada. Aguarde a resposta do " + this.responsable.firstName);
        this.dialogRef.close(result.data);
        this.submited = false;
      }
    }
  }

}
