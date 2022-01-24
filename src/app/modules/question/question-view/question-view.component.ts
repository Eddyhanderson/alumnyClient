import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Quill from 'quill';
import { QuestionModel } from 'src/app/models/question-model/question.model';
import { QuestionService } from 'src/app/services/question-service/question.service';
import Delta from '../../../../../node_modules/@types/quill/node_modules/quill-delta/dist/Delta';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements OnInit, AfterViewInit {
  editor: any;
  question: QuestionModel;
  questionId: string;
  private _quill: Quill;

  @ViewChild('view', { static: true }) view: ElementRef<HTMLElement>

  public situations = {
    'Solved': { 'state': 'Resolvida' },
    'Closed': { 'state': 'Fechada' },
    'Opened': { 'state': 'Aberta' },
    'Waiting': { 'state': 'Em espera' },
    'Analyzing': { 'state': 'Em análise' },
  };

  constructor(private route: ActivatedRoute, private qs: QuestionService) { }

  ngOnInit(): void {}

  public async ngAfterViewInit() {
    await this.getQuestionFromHistory();

    if (this.question !== null)
      await this.getQuestionFromRoute();
    await this.buildEditor();
  }

  public async getQuestionFromRoute() {
    this.questionId = this.route.snapshot.params.id;

    var response = await this.qs.get(this.questionId);

    if (response?.data != null)
      this.question = response.data;
  }

  public getQuestionFromHistory() {
    this.question = history.state.data;    
  }

  public buildEditor() {
    if (this.question) {
      this._quill = new Quill(this.view.nativeElement, {
        readOnly: true,
        theme: 'bubble'
      });

      let content: Delta = JSON.parse(this.question.content);

      this._quill.setContents(content);
    }
  }
}
