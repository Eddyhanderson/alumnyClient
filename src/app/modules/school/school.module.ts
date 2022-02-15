import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FormationModulesComponent } from '../formation/formation-modules/formation-modules.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormationListComponent } from '../formation/formation-list/formation-list.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { FormationModule } from '../formation/formation.module';


@NgModule({
  declarations: [SchoolListComponent],
  exports: [SchoolListComponent],
  imports: [
    MaterialModule,
    CommonModule,
    SchoolRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DialogsModule,
    FormationModule,
    FormationModule
  ]
})
export class SchoolModule { }
