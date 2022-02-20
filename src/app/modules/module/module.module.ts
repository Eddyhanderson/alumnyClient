import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleListComponent } from './module-list/module-list.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [ModuleListComponent],
  exports: [ModuleListComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    MaterialModule
  ]
})
export class ModuleModule { }
