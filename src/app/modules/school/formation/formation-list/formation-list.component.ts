import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateFormationDialogComponent } from 'src/app/dialogs/school/formation/create-formation-dialog/create-formation-dialog.component';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { FormationQuery } from 'src/app/queries/formation-query/formation-query';
import { TablePaginationAdapter } from 'src/app/shared/utils/table-pagination-adapter/table-pagination-adapter';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss']
})
export class FormationListComponent implements OnInit {
  displayedColumns: string[] = ["name", "initial_date", "final_date", "price", "inscrits", "status"];
  data: TablePaginationAdapter<FormationModel, FormationQuery>;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public onFormationCreate() {
    this.dialog.open(CreateFormationDialogComponent);
  }

}
