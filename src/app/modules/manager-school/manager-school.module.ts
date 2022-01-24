import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerSchoolRoutingModule } from './manager-school-routing.module';
import { ManagerSchoolHomeComponent } from './manager-school-home/manager-school-home.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DialogsModule } from '../../dialogs/dialogs.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ManagerSchoolHomeComponent],
  imports: [
    CommonModule,
    ManagerSchoolRoutingModule,
    MaterialModule,
    SharedModule,
    DialogsModule,
    ReactiveFormsModule
  ] 
})
export class ManagerSchoolModule { }

