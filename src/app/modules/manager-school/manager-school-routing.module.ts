import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerSchoolHomeComponent } from './manager-school-home/manager-school-home.component'

const routes: Routes = [
  { path: 'home', component: ManagerSchoolHomeComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerSchoolRoutingModule { }
