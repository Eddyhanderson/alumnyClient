import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { QuestionModel } from 'src/app/models/question-model/question.model';
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

@Component({
  selector: 'app-lesson-watch-questions',
  templateUrl: './lesson-questions.component.html',
  styleUrls: ['./lesson-questions.component.scss']
})
export class LessonWatchQuestionsComponent implements OnInit {

  public questionPagination: PaginationAdapter<QuestionModel, QuestionQuery>;
  public situations = {
    'Solved': { 'state': 'Resolvida', 'tip': 'A questão já foi esclarecida' },
    'Closed': { 'state': 'Fechada', 'tip': 'A questão foi fechada sem ser resolvida' },
    'Opened': { 'state': 'Aberta', 'tip': 'A questão está à ser resolvida' },
    'Waiting': { 'state': 'Em espera', 'tip': 'A questão está à espera da acção do professor' },
    'Analyzing': { 'state': 'Em análise', 'tip': 'A questão está a ser analisada pelo professor' },
  };

  public isOwner: boolean;
  public isTeacher: boolean = localStorage.userRole.toUpperCase() == Constants.SCHOOL.toUpperCase();

  private _reloadStrategy: Subscription;
  private lessonId: string;
  private lesson: LessonModel;
  private teacherPlace: TeacherPlaceModel;
  private teacher: TeacherModel;

  public statePick: BottomSheetData = {
    datas: [
      {
        title: 'Em análise',
        description: 'A questão ainda está a ser analisada',
        action: QuestionSituations.Analyzing
      },
      {
        title: 'Fechada',
        description: 'A questão está indisponível para qualquer tipo de acção',
        action: QuestionSituations.Closed
      },
    ]
  }

  constructor(
    private qs: QuestionService,
    private ls: LessonService,
    private tps: TeacherPlaceService,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.listenParamChanges();
    this.setStrategyToReloadPage();
  }

  public listenParamChanges() {
    this.route.queryParamMap.subscribe(async param => {
      this.lessonId = param.get('lesson');
      if (this.lessonId != null) {
        if (this.isTeacher) {
          this.getTeacher();
          await this.getLesson();
          await this.getTeacherPlace();
          this.checkIfIsOwner();
        }
        this.getQuestions(this.lessonId)
      }
    })
  }

  public getQuestions(lessonId: string) {
    let initParam = new QuestionQuery();
    initParam.situation = QuestionSituations.All;
    initParam.lessonId = lessonId;
    this.questionPagination = new PaginationAdapter((query, param) => this.qs.getAll(query, param), initParam);
  }

  public changeState(question: QuestionModel) {
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

  private async getLesson() {
    this.lesson = await this.ls.get(this.lessonId);
  }

  private async getTeacherPlace() {
    /*this.teacherPlace = await this.tps.get(this.lesson.teacherPlaceId);*/
  }

  private async getTeacher() {
    if (this.isTeacher)
      this.teacher = JSON.parse(localStorage.school);
  }

  private checkIfIsOwner() {
    this.isOwner = this.teacherPlace.teacherId == this.teacher.id;
  }

  /* To reload component */
  private setStrategyToReloadPage() {
    this._reloadStrategy = this.router.events.subscribe(
      (evt) => {
        if (evt instanceof NavigationEnd) {
          this.getQuestions(this.lessonId);
        }
      }
    )
  }
}
