import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FormationModulesComponent } from './formation/formation-modules/formation-modules.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormationListComponent } from './formation/formation-list/formation-list.component';
import { ManagerSchoolComponent } from './manager-school/manager-school.component';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';


@NgModule({
  declarations: [FormationListComponent, FormationModulesComponent, ManagerSchoolComponent],
  exports: [ManagerSchoolComponent],
  imports: [
    MaterialModule,
    CommonModule,
    SchoolRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DialogsModule
  ]
})
export class SchoolModule { }
