import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganListComponent } from './organ-list/organ-list.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [OrganListComponent],
  exports: [OrganListComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class OrganModule { }
