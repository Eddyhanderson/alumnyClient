import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormationListComponent } from "./formation-list/formation-list.component";
import { FormationModulesComponent } from "./formation-modules/formation-modules.component";

const routes: Routes = [
    {
      path: ':id', children: [
        { path: '', component: FormationListComponent },
        { path: 'modules/:id', component: FormationModulesComponent }
      ]
    }
  ];
  
@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormationRoutingModule{

}