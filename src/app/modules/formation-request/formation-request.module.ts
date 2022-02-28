import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationRequestRoutingModule } from './formation-request-routing.module';
import { FormationRequestListComponent } from './formation-request-list/formation-request-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FormationRequestListComponent],
  imports: [
    CommonModule,
    FormationRequestRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class FormationRequestModule { }
