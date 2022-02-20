import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuleListComponent } from "../module/module-list/module-list.component";
import { FormationListComponent } from "./formation-list/formation-list.component";
import { FormationModulesComponent } from "./formation-modules/formation-modules.component";

const routes: Routes = [
    {
      path: ':id', children: [
        { path: '', component: FormationListComponent },
        { path: 'modules/:id', component: ModuleListComponent }
      ]
    }
  ];
  
@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormationRoutingModule{

}