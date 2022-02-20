import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ArticleLessonCreationComponent } from 'src/app/dialogs/lesson/article/create/article-lesson-creation.component';
import { VideoLessonCreationComponent } from 'src/app/dialogs/lesson/video/create/video-lesson-creation.component';
import { CreateModulesDialogComponent } from 'src/app/dialogs/modules/create-modules-dialog/create-modules-dialog.component';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { ModuleModel } from 'src/app/models/module-model/modules.model';
import { ModuleQuery } from 'src/app/queries/module-query/module-query';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { ModuleService } from 'src/app/services/module-service/module.service';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';
import { Routes } from 'src/app/shared/utils/routing-constants';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {

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

  public onCreateArticle(moduleId: string) {

    this.matDialog.open(ArticleLessonCreationComponent, {
      data: { moduleId: moduleId },
      width: '70%',
      height: '80%'
    });
  }

  public onCreateVideo(moduleId: string) {
    this.matDialog.open(VideoLessonCreationComponent, {
      data: { moduleId: moduleId },
      width: '80%',
      height: '80%'
    });
  }
}
