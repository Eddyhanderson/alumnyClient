import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { OrganListComponent } from '../organ/organ-list/organ-list.component';
import { SchoolListComponent } from '../school/school-list/school-list.component';
import { FormationRequestListComponent } from '../formation-request/formation-request-list/formation-request-list.component';

const routes: Routes = [
  { path: 'home', component: FormationRequestListComponent, runGuardsAndResolvers: 'always' },
  { path: 'organ', component: OrganListComponent },
  { path: 'school', component: SchoolListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
