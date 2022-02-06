import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { DialogsModule } from '../../dialogs/dialogs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagerOrganComponent } from './manager-organ/manager-organ.component';



@NgModule({
  declarations: [ManagerHomeComponent, ManagerOrganComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MaterialModule,
    SharedModule,
    DialogsModule,
    ReactiveFormsModule
  ] 
})
export class ManagerModule { }

