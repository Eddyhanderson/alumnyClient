import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormationRequestListComponent } from './formation-request-list/formation-request-list.component';

const routes: Routes = [{
  path: '', component: FormationRequestListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRequestRoutingModule { }
