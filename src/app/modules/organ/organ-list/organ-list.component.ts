import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreateOrganDialogComponent } from 'src/app/dialogs/organ/create-organ/create-organ.component';
import { OrganModel } from 'src/app/models/organ-model/organ-model';
import { OrganQuery } from 'src/app/queries/organ-query/organ-query';
import { TablePaginationAdapter } from 'src/app/shared/utils/table-pagination-adapter/table-pagination-adapter';

@Component({
  selector: 'app-organ-list',
  templateUrl: './organ-list.component.html',
  styleUrls: ['./organ-list.component.scss']
})
export class OrganListComponent implements OnInit {
  data: TablePaginationAdapter<OrganModel, OrganQuery>;
  displayedColumns: string[] = ["codigo", "name", "responsible", "requests"];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreateOrgan() {
    const dialogRef = this.dialog.open(CreateOrganDialogComponent);
  }

}
