import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSchoolDialogComponent } from 'src/app/dialogs/manager/create-school-dialog/create-school-dialog.component';
import { OrganModel } from 'src/app/models/organ-model/organ-model';
import { OrganQuery } from 'src/app/queries/organ-query/organ-query';
import { TablePaginationAdapter } from 'src/app/shared/utils/table-pagination-adapter/table-pagination-adapter';

@Component({
  selector: 'app-manager-school',
  templateUrl: './manager-school.component.html',
  styleUrls: ['./manager-school.component.scss']
})
export class ManagerSchoolComponent implements OnInit {
  displayedColumns: string[] = ["codigo", "name", "nif", "formacoes"];
  data: TablePaginationAdapter<OrganModel, OrganQuery>;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreateSchool() {
    const dialogRef = this.dialog.open(CreateSchoolDialogComponent);
  }

}
