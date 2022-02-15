import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateModulesDialogComponent } from 'src/app/dialogs/modules/create-modules-dialog/create-modules-dialog.component';

@Component({
  selector: 'app-formation-modules',
  templateUrl: './formation-modules.component.html',
  styleUrls: ['./formation-modules.component.scss']
})
export class FormationModulesComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreateModules() {
    this.matDialog.open(CreateModulesDialogComponent);
  }

}
