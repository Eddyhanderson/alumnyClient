import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerOrganComponent } from './manager-organ/manager-organ.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [ManagerOrganComponent],
  exports: [ManagerOrganComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class OrganModule { }
