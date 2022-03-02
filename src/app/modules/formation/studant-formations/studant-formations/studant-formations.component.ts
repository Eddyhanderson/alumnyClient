import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { FormationQuery } from 'src/app/queries/formation-query/formation-query';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { FormationEventStates, FormationRequestStates } from 'src/app/shared/utils/constants';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Component({
  selector: 'app-studant-formations',
  templateUrl: './studant-formations.component.html',
  styleUrls: ['./studant-formations.component.scss']
})
export class StudantFormationsComponent implements OnInit {
  waiting = FormationEventStates.Waiting;
  started = FormationEventStates.Started;
  finished = FormationEventStates.Finished;
  closed = FormationEventStates.Closed

  studant: StudantModel;

  data$: PaginationAdapter<FormationModel, FormationQuery>;

  constructor(private service: FormationService) { }

  ngOnInit(): void {
    this.getStudant();
    this.getAllData();
  }

  public getAllData() {
    if (this.studant) {
      var initialFormationQuery = new FormationQuery(null, this.studant.id);
      this.data$ = new PaginationAdapter<FormationModel, FormationQuery>((query, param) => this.service.getAllSubscribed(query, param), initialFormationQuery);
    }
  }

  public buildFormationUrl(formation: FormationModel) {
    if (formation.state == this.waiting)
      return `/certificate/${formation.id}/preview`;
    else if (formation.state == this.started)
      return `/formations/${formation.id}/watch`;
    else if (formation.state == this.finished)
      return `/certificate/list`;
    else if (formation.state == this.closed)
      return `/certificate/list`;
  }

  public getStudant() {
    this.studant = JSON.parse(localStorage.studant);
  }

}
