import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { CertficateListComponent } from './certficate-list/certficate-list.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManamentControlPanelComponent } from '../manager/managment-control-panel/managment-control-panel.component';


@NgModule({
  declarations: [CertficateListComponent, ManamentControlPanelComponent],
  imports: [
    CommonModule,
    CertificateRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class CertificateModule { }
