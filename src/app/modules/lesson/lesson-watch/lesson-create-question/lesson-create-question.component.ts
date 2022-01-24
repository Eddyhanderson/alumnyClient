import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { LessonModel } from 'src/app/models/lesson-model/lesson.model';
import { QuestionModel } from 'src/app/models/question-model/question.model';
import { StudantModel } from 'src/app/models/studant-model/studant.model';
import { LessonService } from 'src/app/services/lesson-service/lesson.service';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-lesson-watch-create-question',
  templateUrl: './lesson-create-question.component.html',
  styleUrls: ['./lesson-create-question.component.scss']
})
export class LessonWatchCreateQuestionComponent implements OnInit, AfterViewInit {


  submited: boolean = false;
  descriptEmpty: boolean = false;
  questionTitle: FormControl = new FormControl('', [Validators.maxLength(100), Validators.required]);

  @ViewChild('editor') editor: ElementRef<HTMLElement>;
  quills: Quill;

  // Models
  lesson: LessonModel;
  question: QuestionModel;
  studant: StudantModel = JSON.parse(localStorage.studant);

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private qs: QuestionService,
    private ls: LessonService) {

  }

  ngAfterViewInit(): void {
    this.quills = new Quill(this.editor.nativeElement, {
      theme: 'snow'
    });
  }

  ngOnInit(): void {
    this.getLesson();
  }

  public async onSubmit() {
    this.descriptEmpty = false;

    if (this.isQuillEmpty(this.quills)) {
      this.descriptEmpty = true;
      return;
    }

    if (!this.questionTitle.valid) return;

    this.submited = true;
    this.getQuestion();
    let creationResult = await this.qs.create(this.question);

    if (creationResult?.succeded) {
      await this.snackBar.open('Questão criada com sucesso !').afterDismissed().toPromise();
      this.router.navigate(['../questions'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
    else
      this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
  }

  private async getLesson() {
    let lessonId = this.route.snapshot.queryParams.lesson;
    if (lessonId)
      this.lesson = await this.ls.get(lessonId);
  }

  private getQuestion() {
    this.question = {
      content: JSON.stringify(this.quills.getContents()),
      studantId: this.studant.id,
      subject: this.questionTitle.value,
      lessonId: this.lesson.id
    }
  }



  private isQuillEmpty(quill) {
    if ((quill.getContents()['ops'] || []).length !== 1) { return false }
    return quill.getText().trim().length === 0
  }

}
