import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertficateListComponent } from './certficate-list/certficate-list.component';

const routes: Routes = [{
  path: 'list', component: CertficateListComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule { }
