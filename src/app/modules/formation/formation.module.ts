import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormationListComponent } from './formation-list/formation-list.component';
import { MaterialModule } from '../material/material.module';
import { FormationRoutingModule } from './formation-routing.module';
import { ModuleModule } from '../module/module.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';
import { FormationPreviewComponent } from './formation-preview/formation-preview.component';
import { StudantFormationsComponent } from './studant-formations/studant-formations/studant-formations.component';
import { FormationWatchComponent } from './formation-watch/formation-watch.component';



@NgModule({
  declarations: [FormationListComponent, FormationPreviewComponent, StudantFormationsComponent, FormationWatchComponent],
  exports: [FormationListComponent, FormationPreviewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormationRoutingModule,
    ModuleModule,
    SharedModule,
    DialogsModule
  ]
})
export class FormationModule { }
