import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateFormationDialogComponent } from 'src/app/dialogs/school/formation/create-formation-dialog/create-formation-dialog.component';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { FormationQuery } from 'src/app/queries/formation-query/formation-query';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { TablePaginationAdapter } from 'src/app/shared/utils/table-pagination-adapter/table-pagination-adapter';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {
  displayedColumns: string[] = ["name", "initial_date", "final_date", "price", "inscrits", "category", "status"];
  data: TablePaginationAdapter<FormationModel, FormationQuery>;

  // Fields for query string
  private schoolId:string;
  constructor(private dialog: MatDialog, 
    private route:ActivatedRoute,
    private service:FormationService) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  private initDataSource() {
    this.setQueryField();
    let initialLessonQuery: FormationQuery = {
      schoolId : this.schoolId
    }

    this.data = new TablePaginationAdapter<FormationModel, FormationQuery>((query, param) => this.service.getAll(query, param), initialLessonQuery);
  }

  public onFormationCreate() {
    this.dialog.open(CreateFormationDialogComponent);
  }

  private setQueryField(){
    this.schoolId = this.route.snapshot.paramMap.get('schoolId');
  }


}
