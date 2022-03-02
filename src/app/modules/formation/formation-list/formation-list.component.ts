import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  _reloadStrategy:Subscription
  displayedColumns: string[] = ["name", "initial_date", "final_date", "price", "inscrits", "status"];
  data: TablePaginationAdapter<FormationModel, FormationQuery>;

  // Aux
  waiting = FormationEventStates.Waiting;
  started = FormationEventStates.Started;


  // Fields for query string
  private schoolId: string;
  constructor(private dialog: MatDialog,
    private route: ActivatedRoute,
    private service: FormationService,
    private router: Router) { }

  ngOnInit(): void {    
    this.initDataSource();
    this.setStrategyToReloadPage();
  }

  private initDataSource() {
    this.setQueryField();
    let initialFormationQuery: FormationQuery = {
      schoolId: this.schoolId
    }

    this.data = new TablePaginationAdapter<FormationModel, FormationQuery>((query, param) => this.service.getAll(query, param), initialFormationQuery);
  }

  public onFormationCreate() {
    this.dialog.open(CreateFormationDialogComponent).afterClosed()
    .subscribe((data) => {
      if(data){
        this.router.navigateByUrl(this.router.url);
      }
    });
  }

  private setQueryField() {
    this.schoolId = this.route.snapshot.paramMap.get('id');
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
