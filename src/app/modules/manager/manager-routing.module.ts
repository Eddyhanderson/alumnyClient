import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerOrganComponent } from './manager-organ/manager-organ.component';
import { ManagerSchoolComponent } from './manager-school/manager-school.component';

const routes: Routes = [
  { path: 'home', component: ManagerHomeComponent, runGuardsAndResolvers: 'always' },
  { path: 'organ', component: ManagerOrganComponent },
  { path: 'school', component: ManagerSchoolComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
