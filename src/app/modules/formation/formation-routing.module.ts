import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModuleListComponent } from "../module/module-list/module-list.component";
import { FormationListComponent } from "./formation-list/formation-list.component";
import { FormationPreviewComponent } from "./formation-preview/formation-preview.component";

const routes: Routes = [
  {
    path: ':id', children: [
      { path: '', component: FormationListComponent },
      { path: 'modules/:id', component: ModuleListComponent },
      { path: 'preview', component: FormationPreviewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule {

}