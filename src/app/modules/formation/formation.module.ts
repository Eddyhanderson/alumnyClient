import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationListComponent } from './formation-list/formation-list.component';
import { FormationModulesComponent } from './formation-modules/formation-modules.component';
import { MaterialModule } from '../material/material.module';
import { FormationRoutingModule } from './formation-routing.module';



@NgModule({
  declarations: [FormationListComponent, FormationModulesComponent],
  exports: [FormationListComponent, FormationModulesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormationRoutingModule
  ]
})
export class FormationModule { }
