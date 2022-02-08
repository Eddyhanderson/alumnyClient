import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreateOrganComponent } from 'src/app/dialogs/manager/create-organ/create-organ.component';
import { OrganModel } from 'src/app/models/organ-model/organ-model';
import { OrganQuery } from 'src/app/queries/organ-query/organ-query';
import { TablePaginationAdapter } from 'src/app/shared/utils/table-pagination-adapter/table-pagination-adapter';

@Component({
  selector: 'app-organ',
  templateUrl: './manager-organ.component.html',
  styleUrls: ['./manager-organ.component.scss']
})
export class ManagerOrganComponent implements OnInit {
  data: TablePaginationAdapter<OrganModel, OrganQuery>;
  displayedColumns: string[] = ["codigo", "name", "responsible", "requests"];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreateOrgan() {
    const dialogRef = this.dialog.open(CreateOrganComponent, { width: '40%', height: '70%' });
  }

}
