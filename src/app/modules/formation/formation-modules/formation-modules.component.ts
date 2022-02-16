import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateModulesDialogComponent } from 'src/app/dialogs/modules/create-modules-dialog/create-modules-dialog.component';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { ModulesModel as ModuleModel } from 'src/app/models/module-model/modules.model';
import { ModuleQuery } from 'src/app/queries/module-query/module-query';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { ModuleService } from 'src/app/services/module-service/module.service';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { TablePaginationAdapter } from 'src/app/shared/utils/table-pagination-adapter/table-pagination-adapter';

@Component({
  selector: 'app-formation-modules',
  templateUrl: './formation-modules.component.html',
  styleUrls: ['./formation-modules.component.scss']
})
export class FormationModulesComponent implements OnInit {
  // Models
  formationId: string;
  formation: FormationModel;

  modules$: PaginationAdapter<ModuleModel, ModuleQuery>;
  constructor(private matDialog: MatDialog,
    private route: ActivatedRoute,
    private ms: ModuleService,
    private fs: FormationService) { }

  ngOnInit(): void {
    this.getFormation();
    this.initDataSource();
  }

  // Config view
  private initDataSource() {

    this.setQueryField();

    let initialModuleQuery: ModuleQuery = {
      formationId: this.formationId
    }

    this.modules$ = new PaginationAdapter<ModuleModel, ModuleQuery>((query, param) => this.ms.getAll(query, param), initialModuleQuery);
  }

  private setQueryField() {
    this.formationId = this.route.snapshot.paramMap.get('id');
  }

  private async getFormation() {
    var formationId = this.route.snapshot.paramMap.get("id");
    this.formation = await this.fs.get(formationId);
  }

  public buildImageUrl(url: string) { return Routes.BASE_URL_SERVER_FILE.concat(url) }

  // Events
  public onCreateModules() {
    this.matDialog.open(CreateModulesDialogComponent);
  }

}
