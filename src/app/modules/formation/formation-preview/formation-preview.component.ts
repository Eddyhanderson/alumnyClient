import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormationModel } from 'src/app/models/formation-model/formation-model';
import { ModuleModel } from 'src/app/models/module-model/modules.model';
import { ModuleQuery } from 'src/app/queries/module-query/module-query';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { FormationService } from 'src/app/services/formation-service/formation.service';
import { ModuleService } from 'src/app/services/module-service/module.service';
import { Routes } from 'src/app/shared/utils/routing-constants';
import { MatSelectionListChange } from '@angular/material/list';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formation-preview',
  templateUrl: './formation-preview.component.html',
  styleUrls: ['./formation-preview.component.scss']
})
export class FormationPreviewComponent implements OnInit {
  // Models
  formation: FormationModel;
  lesson: LessonModel;
  modules$: Observable<ModuleModel[]>;
  id: string;

  // Form
  moduleControl: FormControl;

  constructor(private service: FormationService,
    private moduleService: ModuleService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getId();
    if (this.id) {
      this.getormation(this.id);
      this.getModules(this.id)
    }
  }

  public buildImageUrl(url: string) { return Routes.BASE_URL_SERVER_FILE.concat(url) }

  // Events
  public onModuleListChange(change: MatSelectionListChange) {
    change.options.map(async option => {
      if (option.selected) {
        this.lesson = option.value;
      }
    })
  }

  public compare = (a1: any, a2: any) => a1.id === a2.id;

  private getId() {
    this.id = this.route.snapshot.params['id'];
    console.dir(this.route)
  }

  private async getormation(id: string) {
    if (id) {
      this.formation = await this.service.get(this.id);
    }
  }

  private async getModules(formationId: string) {
    let page: PaginationQuery = {
      pageNumber: 1,
      pageSize: 10,
      searchValue: ''
    };
    let query: ModuleQuery = {
      formationId: formationId
    }
    this.modules$ = this.moduleService.getAll(page, query).pipe(map((p) => p.data));
    
    this.modules$.subscribe((m) => {
      if (m != null) {
        this.lesson = m[0].lessons[0];
        console.dir(this.lesson);
        this.moduleControl = new FormControl(this.lesson);
      }
    })
  }



}
