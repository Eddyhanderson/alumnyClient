import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateFormationDialogComponent } from 'src/app/dialogs/formation/create-formation-dialog/create-formation-dialog.component';
import { FormationEventModel } from 'src/app/models/formation-event-model/formation-event.model';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { FormationQuery } from 'src/app/queries/formation-query/formation-query';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { Constants, FormationEventStates } from 'src/app/shared/utils/constants';
import { TablePaginationAdapter } from 'src/app/shared/utils/table-pagination-adapter/table-pagination-adapter';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {
  displayedColumns: string[] = ["name", "initial_date", "final_date", "price", "inscrits", "status"];
  data: TablePaginationAdapter<FormationModel, FormationQuery>;

  // Aux
  waiting = FormationEventStates.Waiting;
  started = FormationEventStates.Started;


  // Fields for query string
  private schoolId: string;
  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private service: FormationService) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  public getFormationEvent(formation: FormationModel) {
    return this.findFormationEvent(formation);    
  }

  private initDataSource() {
    this.setQueryField();
    let initialFormationQuery: FormationQuery = {
      schoolId: this.schoolId
    }

    console.dir(initialFormationQuery);

    this.data = new TablePaginationAdapter<FormationModel, FormationQuery>((query, param) => this.service.getAll(query, param), initialFormationQuery);
  }

  public onFormationCreate() {
    this.dialog.open(CreateFormationDialogComponent);
  }

  private setQueryField() {
    this.schoolId = this.route.snapshot.paramMap.get('id');
  }

  private findFormationEvent(formation: FormationModel): FormationEventModel {
    return formation.formationEvents.find((fe) => fe.situation.toUpperCase() == Constants.NORMAL_MODEL_STATE.toUpperCase());
  }


}
