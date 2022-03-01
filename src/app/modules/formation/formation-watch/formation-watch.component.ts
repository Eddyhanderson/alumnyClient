import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ArticleLessonViewComponent } from 'src/app/dialogs/lesson/article/view/article-lesson-view.component';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { ModuleModel } from 'src/app/models/module-model/modules.model';
import { LessonQuery } from 'src/app/queries/lesson-query/lesson.query';
import { ModuleQuery } from 'src/app/queries/module-query/module-query';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { ModuleService } from 'src/app/services/module-service/module.service';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';

@Component({
  selector: 'app-formation-watch',
  templateUrl: './formation-watch.component.html',
  styleUrls: ['./formation-watch.component.scss']
})
export class FormationWatchComponent implements OnInit {

  private _reloadStrategy: Subscription;
  // Formation Id
  formationId: string;

  // Models
  modules$: PaginationAdapter<ModuleModel, ModuleQuery>;
  lesson: LessonModel;

  constructor(
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setStrategyToReloadPage();
    this.getFormationId();
    this.getAllLessons();
    this.getFirstLesson();
  }

  // Events
  public onModuleListChange(change: MatSelectionListChange) {
    change.options.map(async option => {
      if (option.selected) {
        this.lesson = option.value;
      }
    })
  }

  public onArticleView(lesson: LessonModel) {
    this.matDialog.open(ArticleLessonViewComponent, {
      height: '70%',
      width: '70%',
      data: lesson
    })
  }

  private getAllLessons() {
    if (this.formationId) {
      let initialQuery: ModuleQuery = {
        formationId: this.formationId
      }

      this.modules$ = new PaginationAdapter((query, param) => this.moduleService.getAll(query, param), initialQuery);
    }
  }

  private getFormationId() {
    this.formationId = this.route.snapshot.params['id'];
  }

  private setStrategyToReloadPage() {
    this._reloadStrategy = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let id = this.modules$.setSearchValue = '';
      }
    })
  }

  private async getFirstLesson() {
    var modules = await this.modules$.getDataSource.pipe(first()).toPromise();

    let module = modules.find(lk => lk.sequence == 1);

    this.lesson = module.lessons[0];
  }

}
