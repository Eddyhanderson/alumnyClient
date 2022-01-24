import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { AnswerModel } from 'src/app/models/answer-model/answer.model';
import { AnswerService } from 'src/app/services/answer-service/answer.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  submited: boolean = false;
  descriptEmpty: boolean = false;
  questionId: string;

  @ViewChild('editor') editor: ElementRef<HTMLElement>;
  quills: Quill;

  // Models
  answer: AnswerModel;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private as: AnswerService) {

  }

  ngAfterViewInit(): void {
    this.quills = new Quill(this.editor.nativeElement, {
      theme: 'snow'
    });
  }

  ngOnInit(): void {
    this.getQuestion();
  }

  public async onSubmit() {
    this.descriptEmpty = false;

    if (this.isQuillEmpty(this.quills)) {
      this.descriptEmpty = true;
      return;
    }

    this.submited = true;
    this.getAnswer();
    let creationResult = await this.as.create(this.answer);

    if (creationResult?.succeded) {
      await this.snackBar.open('Resposta criada com sucesso !').afterDismissed().toPromise();
      this.router.navigate(['../answers'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
    else{
      this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
      this.reload();
    }
  }

  private async getQuestion() {
    this.questionId = this.route.snapshot.parent.params.id;
  }

  private getAnswer() {
    this.getQuestion();

    if (this.questionId == null) {
      this.snackBar.open(Constants.FAIL_OPERATION_MESSAGE);
      this.reload();
      return;
    }
    this.answer = {
      content: JSON.stringify(this.quills.getContents()),
      questionId: this.questionId
    }
  }

  private reload(){
    this.router.navigateByUrl(this.router.url);
  }

  private isQuillEmpty(quill) {
    if ((quill.getContents()['ops'] || []).length !== 1) { return false }
    return quill.getText().trim().length === 0
  }
}
