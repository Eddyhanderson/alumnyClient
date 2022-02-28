import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
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
import { MatDialog } from '@angular/material/dialog';
import { CreateFormationDialogComponent } from 'src/app/dialogs/formation/create-formation-dialog/create-formation-dialog.component';
import { CreateFormationRequestDialogComponent } from 'src/app/dialogs/formation-request/create-formation-request-dialog/create-formation-request-dialog.component';
import { FormationRequestService } from 'src/app/services/formation-request/formation-request.service';
import { FormationRequestModel } from 'src/app/models/formation-request-model/formation-request.model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { Constants, FormationRequestStates } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-formation-preview',
  templateUrl: './formation-preview.component.html',
  styleUrls: ['./formation-preview.component.scss']
})
export class FormationPreviewComponent implements OnInit {
  // Flow Control data
  isManager = localStorage.userRole == Constants.MANAGER;
  isSchool = localStorage.userRole == Constants.SCHOOL;

  // Models
  formationRequest: FormationRequestModel;
  formation: FormationModel;
  lesson: LessonModel;
  studant: StudantModel;
  modules$: Observable<ModuleModel[]>;
  id: string;

  // Form
  moduleControl: FormControl;

  // aux
  private _reloadStrategy: Subscription;

  // Formation Request States
  awaitingResponsable = FormationRequestStates.WatingResponsableAction;
  aproved = FormationRequestStates.Aproved;
  rejected = FormationRequestStates.Rejected;
  payed = FormationRequestStates.Payed;

  constructor(
    private formationService: FormationService,
    private requestService: FormationRequestService,
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.setStrategyToReloadPage();
    this.getAllModels();
  }

  private getAllModels() {
    this.getId();
    if (this.id) {
      this.getFormation(this.id);
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

  public onRequestFormation() {
    this.dialog.open(CreateFormationRequestDialogComponent, {
      data: this.formation.id
    }).afterClosed().subscribe((data) => {
      console.dir(data);
      if (data) {
        this.router.navigateByUrl(this.router.url);
      }
    })
  }

  public compare = (a1: any, a2: any) => a1.id === a2.id;

  private getId() {
    this.id = this.route.snapshot.params['id'];
  }

  private async getFormationRequest() {
    if (this.formation && this.studant) {
      this.formationRequest = await this.requestService.get(this.studant.id, this.formation.id);
      console.dir(this.formationRequest);
    }
  }

  private async getFormation(id: string) {
    if (id) {
      this.formation = await this.formationService.get(this.id);
      this.getStudant();
      this.getFormationRequest();
    }
  }

  private getStudant() {
    this.studant = JSON.parse(localStorage.studant);
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

  /* To reload component */
  private setStrategyToReloadPage() {
    this._reloadStrategy = this.router.events.subscribe(
      async (evt) => {
        if (evt instanceof NavigationEnd) {
          await this.getFormationRequest();
        }
      }
    )
  }
}
