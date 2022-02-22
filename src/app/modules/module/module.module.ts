import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleListComponent } from './module-list/module-list.component';
import { MaterialModule } from '../material/material.module';
import { LessonModule } from '../lesson/lesson.module';


@NgModule({
  declarations: [ModuleListComponent],
  exports: [ModuleListComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    MaterialModule,
    LessonModule
  ]
})
export class ModuleModule { }
