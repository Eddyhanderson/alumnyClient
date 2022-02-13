import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { DialogsModule } from '../../dialogs/dialogs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagerOrganComponent } from '../organ/manager-organ/manager-organ.component';
import { ManagerSchoolComponent } from '../school/manager-school/manager-school.component';
import { OrganModule } from '../organ/organ.module';
import { SchoolModule } from '../school/school.module';



@NgModule({
  declarations: [ManagerHomeComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    OrganModule,
    SchoolModule,
    SharedModule,
    DialogsModule,
    ReactiveFormsModule
  ] 
})
export class ManagerModule { }

