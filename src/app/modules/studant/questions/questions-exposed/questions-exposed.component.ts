import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'lodash';
import { Subscription } from 'rxjs';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { QuestionModel } from 'src/app/models/question-model/question.model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { TeacherModel } from 'src/app/models/teacher-model/teacher-model';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';
import { BottomSheetData } from 'src/app/queries/bottom-sheet-data/bottom-sheet.data';
import { QuestionQuery } from 'src/app/queries/question-query/question.query';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { TeacherPlaceService } from 'src/app/services/teacher-place-service/teacher-place.service';
import { BottomSheetComponent } from 'src/app/shared/components/bottom-sheet/bottom-sheet.component';
import { Constants, QuestionSituations } from 'src/app/shared/utils/constants';
import { PaginationAdapter } from 'src/app/shared/utils/pagination-adapter/pagination-adapter';

type Filter = { id: string, name: string, type: string };

@Component({
  selector: 'app-questions-exposed',
  templateUrl: './questions-exposed.component.html',
  styleUrls: ['./questions-exposed.component.scss']
})
export class QuestionsExposedComponent implements OnInit {


  public questionPagination: PaginationAdapter<QuestionModel, QuestionQuery>;
  public situations = {
    'Solved': { 'state': 'Resolvida', 'tip': 'A questão já foi esclarecida' },
    'Closed': { 'state': 'Fechada', 'tip': 'A questão foi fechada sem ser resolvida' },
    'Opened': { 'state': 'Aberta', 'tip': 'A questão está à ser resolvida' },
    'Waiting': { 'state': 'Em espera', 'tip': 'A questão está à espera da acção do professor' },
    'Analyzing': { 'state': 'Em análise', 'tip': 'A questão está a ser analisada pelo professor' },
  };

  public situationFilters = [
    { name: 'Todas', value: QuestionSituations.All },
    { name: 'Resolvida', value: QuestionSituations.Solved },
    { name: 'Aberta', value: QuestionSituations.Opened },
    { name: 'Fechada', value: QuestionSituations.Closed, },
    { name: 'Em espera', value: QuestionSituations.Waiting },
    { name: 'Em análise', value: QuestionSituations.Analyzing }]

  public isOwner: boolean;
  public isTeacher: boolean = localStorage.userRole.toUpperCase() == Constants.SCHOOL.toUpperCase();

  private _reloadStrategy: Subscription;
  private studant: StudantModel;

  public statePick: BottomSheetData = {
    datas: [
      {
        title: 'Resolvida',
        description: 'A questão está resolvida, impossibilitando qualquer contribuição',
        action: QuestionSituations.Solved
      },
    ]
  }

  // Filter
  filters: Filter[] = new Array();
  questionToClassMates: boolean = false;

  constructor(
    private qs: QuestionService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {    
    this.getStudant();
    this.getQuestions(this.studant.id)
    this.setStrategyToReloadPage();
  }


  public remove(id: string, type: string) {
    var start = this.filters.findIndex(filter => filter.id == id);
    this.filters.splice(start);
    switch (type) {
      case "situation": {
        this.questionPagination.setParam = { situation: QuestionSituations.All }
        break;
      }
    }
  }

  public getStudant() {
    this.studant = JSON.parse(localStorage.studant);
  }

  public getQuestions(studantId: string) {
    let initParam = new QuestionQuery();
    initParam.situation = QuestionSituations.All;
    initParam.studantId = studantId;
    this.questionPagination = new PaginationAdapter((query, param) => this.qs.getAll(query, param), initParam);
  }

  public changeState(question: QuestionModel) {
    if (question.situation == QuestionSituations.Waiting) return;
    this.bottomSheet.open(BottomSheetComponent, {
      data: this.statePick
    }).afterDismissed().subscribe(async state => {
      if (state != null) {
        var response = await this.qs.stateUpdate(question.id, state);

        if (response?.data != null) {
          await this.snackBar.open("Situação da questão alterada").afterDismissed().toPromise();
          this.router.navigateByUrl(this.router.url);
        } else
          this.snackBar.open("Situação não actualizada, tente novamente.")
      }
    })
  }

  public gotoQuestion(question: QuestionModel) {
    this.router.navigate(['/question', question.id, 'answer'], { state: { data: question } })
  }

  public async onSituationPicker(situation: any) {
    let type = 'situation';
    let index = this.filters.findIndex(f => f.type == type);
    this.filters.splice(index)
    this.filters.push({ id: situation.value, name: situation.name, type: type });
    this.questionPagination.setParam = { situation: situation.value };
  }

  /* To reload component */
  private setStrategyToReloadPage() {
    this._reloadStrategy = this.router.events.subscribe(
      (evt) => {
        if (evt instanceof NavigationEnd) {
          this.getQuestions(this.studant.id);
        }
      }
    )
  }

}
