import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateFormationEventComponent } from 'src/app/dialogs/formation-event/create-formation-event/create-formation-event.component';
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
export class ModuleListComponent implements AfterViewInit {

  // Models
  formationId: string;
  formation: FormationModel;

  modules$: PaginationAdapter<ModuleModel, ModuleQuery>;
  private _reloadStrategy: Subscription;

  constructor(private matDialog: MatDialog,
    private route: ActivatedRoute,
    private ms: ModuleService,
    private fs: FormationService,
    private router: Router) { }

  ngAfterViewInit(): void {
    this.getFormation();
    this.initDataSource();
    this.setStrategyToReloadPage();
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
    var ref = this.matDialog.open(CreateModulesDialogComponent, { data: this.formationId });

    ref.afterClosed().subscribe(data => {
      if (data) {
        this.router.navigateByUrl(this.router.url);
      }
    })
  }

  public onPublishFormation() {
    this.matDialog.open(CreateFormationEventComponent, { data: this.formationId });
  }

  public onCreateArticle(moduleId: string) {

    var ref = this.matDialog.open(ArticleLessonCreationComponent, {
      data: { moduleId: moduleId },
      width: '70%',
      height: '80%'
    });

    ref.afterClosed().subscribe(succeeded => {
      if (succeeded) {
        this.router.navigate(['/lesson', 'managment']);
      }
    })
  }

  public onCreateVideo(moduleId: string) {
    var ref = this.matDialog.open(VideoLessonCreationComponent, {
      data: { moduleId: moduleId },
      width: '80%',
      height: '80%'
    });

    ref.afterClosed().subscribe(succeeded => {
      if (succeeded) {
        this.router.navigate(['/lesson', 'managment']);
      }
    })
  }

  /* To reload component */
  private setStrategyToReloadPage() {
    this._reloadStrategy = this.router.events.subscribe(
      async (evt) => {
        if (evt instanceof NavigationEnd) {
          this.modules$.setSearchValue = '';
        }
      }
    )
  }
}
