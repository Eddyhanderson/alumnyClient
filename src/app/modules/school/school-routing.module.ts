import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormationListComponent } from './formation/formation-list/formation-list.component';
import { FormationModulesComponent } from './formation/formation-modules/formation-modules.component';


const routes: Routes = [
  {
    path: 'formations', children: [
      { path: '', component: FormationListComponent },
      { path: 'modules', component: FormationModulesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
