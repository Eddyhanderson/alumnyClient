import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { FormationRequestModel } from 'src/app/models/formation-request-model/formation-request.model';
import { ManagerModel } from 'src/app/models/manager-model/manager.model';
import { OrganModel } from 'src/app/models/organ-model/organ-model';
import { SchoolModel } from 'src/app/models/school-model/school.model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { BottomSheetData } from 'src/app/queries/bottom-sheet-data/bottom-sheet.data';
import { FormationQuery } from 'src/app/queries/formation-query/formation-query';
import { FormationRequestQuery } from 'src/app/queries/formation-request-query/formation-request-query';
import { FormationRequestService } from 'src/app/services/formation-request/formation-request.service';
import { OrganService } from 'src/app/services/organ-service/organ.service';
import { StudantService } from 'src/app/services/studant-service/studant.service';
import { BottomSheetComponent } from 'src/app/shared/components/bottom-sheet/bottom-sheet.component';
import { Constants, FormationRequestStates } from 'src/app/shared/utils/constants';
import { TablePaginationAdapter } from 'src/app/shared/utils/table-pagination-adapter/table-pagination-adapter';

@Component({
  selector: 'app-formation-request-list',
  templateUrl: './formation-request-list.component.html',
  styleUrls: ['./formation-request-list.component.scss']
})
export class FormationRequestListComponent implements OnInit {

  // Data Controll
  role = localStorage.userRole;
  isStudant = this.role == Constants.STUDANT;
  isManager = this.role == Constants.MANAGER;
  isSchool = this.role == Constants.SCHOOL;


  // Formation Request States
  awaitingResponsable = FormationRequestStates.WatingResponsableAction;
  aproved = FormationRequestStates.Aproved;
  rejected = FormationRequestStates.Rejected;
  payed = FormationRequestStates.Payed;

  displayedColumns: string[];
  data: TablePaginationAdapter<FormationRequestModel, FormationRequestQuery>;


  // Models
  studant: StudantModel;
  manager: ManagerModel;
  school: SchoolModel;
  organ: OrganModel;

  // BottomSheet data
  bottomSheetDataForAccept: BottomSheetData = {
    datas: [
      {
        title: 'Aceitar solicitação',
        description: 'Ao aceitar a solicitação o pedido será encaminhado para a academia para proceder com o pagamento',
        action: 'accept'
      },
      {
        title: 'Cancelar',
        action: ''
      }
    ]
  }

  bottomSheetDataForPay: BottomSheetData = {
    datas: [
      {
        title: 'Pagamento feito',
        description: 'A Instituição será notificada e após eles confirmarem o pagamento, o estudante terá acesso a formação.',
        action: 'pay'
      },
      {
        title: 'Cancelar',
        action: ''
      }
    ]
  }

  bottomSheetDataForConfirm: BottomSheetData = {
    datas: [
      {
        title: 'Pagamento feito',
        description: 'Confirmar que o pagamento foi recebido, o aluno terá acesso à formação logo de seguida.',
        action: 'confirm'
      },
      {
        title: 'Cancelar',
        action: ''
      }
    ]
  }

  // Reload aux
  private _reloadStrategy: Subscription;

  constructor(
    private router: Router,
    private service: FormationRequestService,
    private organService: OrganService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar) {
    this.constructTable();
  }

  ngOnInit(): void {
    this.getAllData();
    this.setStrategyToReloadPage();
  }

  public constructTable() {
    if (this.isStudant)
      this.displayedColumns = ["studant", "formation", "school", "price", "start_date", "state", "actions"]
    else if (this.isManager)
      this.displayedColumns = ["studant", "formation", "school", "price", "start_date", "badget", "organ", "state", "actions"]
    else if (this.isSchool)
      this.displayedColumns = ["studant", "formation", "price", "start_date", "state", "actions"]
  }

  // Publich methods
  public async onResponsableAprove(formationRequest: FormationRequestModel) {
    var ref = this.bottomSheet.open(BottomSheetComponent, {
      data: this.bottomSheetDataForAccept
    });

    ref.afterDismissed().subscribe(async a => {
      if (a == 'accept') {
        var data = await this.service.aprove(formationRequest.id, formationRequest);

        if (data) {
          this.snackBar.open("Solicitação Aprovada com Sucesso.")
            .afterDismissed().subscribe(_ => this.router.navigateByUrl(this.router.url))
        } else {
          this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
        }

      }
    })
  }

  public async onManagerPay(request: FormationRequestModel) {

    var ref = this.bottomSheet.open(BottomSheetComponent, {
      data: this.bottomSheetDataForPay
    });

    ref.afterDismissed().subscribe(async a => {
      if (a == 'pay') {
        var data = await this.service.pay(request.id, request);

        if (data) {
          this.snackBar.open("Formação Paga com Sucesso.")
            .afterDismissed().subscribe(_ => this.router.navigateByUrl(this.router.url))
        } else {
          this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
        }
      }
    })
  }

  public async onSchoolConfirm(request: FormationRequestModel) {
    var ref = this.bottomSheet.open(BottomSheetComponent, {
      data: this.bottomSheetDataForConfirm
    });

    ref.afterDismissed().subscribe(async a => {
      if (a == 'confirm') {
        var data = await this.service.confirm(request.id, request);

        if (data) {
          this.snackBar.open("Confirmação feita com Sucesso.")
            .afterDismissed().subscribe(_ => this.router.navigateByUrl(this.router.url))
        } else {
          this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
        }
      }
    })
  }

  private getAllData() {
    if (this.isStudant)
      this.getStudant();
    else if (this.isManager)
      this.getManager();
    else if (this.isSchool)
      this.getSchool();

    this.getFormationRequest();
  }

  private getStudant() {
    this.studant = JSON.parse(localStorage.studant);
  }

  private getManager() {
    this.manager = JSON.parse(localStorage.manager);
  }

  private getSchool() {
    this.school = JSON.parse(localStorage.school);
  }

  private async getFormationRequest() {
    let initialQuery: FormationRequestQuery;

    if (this.isStudant)
      initialQuery = new FormationRequestQuery(this.studant.id, this.studant.responsable);
    else if (this.isManager)
      initialQuery = new FormationRequestQuery('', false, true);
    else if (this.isSchool)
      initialQuery = new FormationRequestQuery('', false, false, true);

    this.data = new TablePaginationAdapter<FormationRequestModel, FormationRequestQuery>((query, param) => this.service.getAll(query, param), initialQuery);

    if (this.isStudant && this.studant.responsable)
      await this.getOrgan();
  }

  private async getOrgan() {
    console.dir(this.studant);
    this.organ = await this.organService.get(this.studant.organId);
  }

  /* To reload component */
  private setStrategyToReloadPage() {
    this._reloadStrategy = this.router.events.subscribe(
      async (evt) => {
        if (evt instanceof NavigationEnd) {
          this.data.setSearchValue = '';
        }
      }
    )
  }

}
