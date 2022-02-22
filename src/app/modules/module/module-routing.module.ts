import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonManagmentComponent } from '../lesson/lesson-managment/lesson-managment.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
