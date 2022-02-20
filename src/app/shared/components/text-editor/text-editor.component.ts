import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import Quill from 'quill';
import Delta from '../../../../../node_modules/@types/quill/node_modules/quill-delta/dist/Delta';
import { Response } from 'src/app/models/response/response';
import { isEqual } from 'lodash';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BehaviorSubject, Subject } from 'rxjs';
import { DocumentLeave as DocumentLeave } from '../../utils/constants';
import { ArticleService } from 'src/app/services/article-service/article.service';
import { ArticleModel } from 'src/app/models/article-model/article.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreationResult } from 'src/app/models/creation-result/creation-result';
import { BottomSheetData } from 'src/app/queries/bottom-sheet-data/bottom-sheet.data';

@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  private _quill: Quill;

  private closeListen = new BehaviorSubject(false);
  private stopListen = new BehaviorSubject(false);

  @Input('closeRequest')
  set setCloseListen(value: boolean) {
    this.closeListen.next(value);
  }

  @Input('stopRequest')
  set setStopListen(value: boolean) {
    this.stopListen.next(value);
  }

  @Input('article')
  article: ArticleModel;

  @Input("moduleId")
  moduleId: string;

  @Output('closeResult')
  closeResult = new EventEmitter<DocumentLeave>();

  @Output('articleResult')
  articleResult = new EventEmitter<ArticleModel>();

  @ViewChild('editor')
  editor: ElementRef<HTMLElement>;

  @ViewChild('toolbar')
  toolbar: ElementRef<HTMLElement>;

  public canSave: boolean = false;
  private lastSaved = new Delta().insert('\n');

  private warn: BottomSheetData = {
    datas: [
      {
        title: 'Salvar conteúdo',
        description: 'Irá salvar o conteúdo que ainda não salvou.',
        action: DocumentLeave.Save
      },
      {
        title: 'Sair sem salvar',
        description: 'O documento irá retroceder à sua última gravação',
        action: DocumentLeave.Discard
      },
      {
        title: 'Cancelar',
        description: 'Continuar a editar o documento',
        action: DocumentLeave.Cancel
      },
    ]
  }

  private inform: BottomSheetData = {
    datas: [
      {
        title: 'Parar a edição',
        description: 'O documento ficará guardado como rascunho, poderá continuar quando quiser.',
        action: DocumentLeave.Close
      },
      {
        title: 'Cancelar',
        description: 'Continuar a editar o documento',
        action: DocumentLeave.Cancel
      },
    ]
  }

  constructor(
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar,
    private as: ArticleService) { }

  ngOnDestroy(): void {
    this.closeListen.unsubscribe();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.editor.nativeElement.classList.add('ql-editor-2');
    this.toolbar.nativeElement.classList.add('ql-toolbar-2');
    this._quill = new Quill(this.editor.nativeElement, {
      theme: 'snow',
      placeholder: 'Escrever conteúdo !',
      modules: {
        toolbar: {
          container: this.toolbar.nativeElement,
        }
      },
      scrollingContainer: 'body'
    });

    if (this.article != null) {
      let delta: Delta = JSON.parse(this.article.delta);
      this._quill.setContents(delta);
    }

    this._quill.focus();
    this.atachEvents();
  }


  public undo() {
    this._quill.getModule('history').undo();
  }

  public redo() {
    this._quill.getModule('history').redo();
  }

  public setHandlers() {
    this._quill.on('text-change', () => {
      this.changeDetection();
    })
  }

  public async save() {
    this.lastSaved = this._quill.getContents();
    let result: Response<ArticleModel> | CreationResult<ArticleModel>;

    if (this.article != null) {
      this.updatArticle(this.lastSaved);
      result = await this.as.update(this.article.id, this.article);
    } else {
      this.createArticle();
      result = await this.as.create(this.article);
    }

    if (result?.data != null) {
      this.article = result.data;

      this.snackBar.open("Documento salvo");
      this.canSave = false;
    } else {
      this.snackBar.open("Algo correu mal. Documento não foi salvo");
    }
  }

  private atachEvents() {
    this._preventQuillJump();
    this.setHandlers();
    this.onClose();
    this.onStop();
  }

  private changeDetection() {
    this.canSave = false;
    let delta = this._quill.getContents();

    // Check if they are the same length
    if (this.lastSaved.ops.length != delta.ops.length) {
      this.canSave = true;
      return;
    }

    let i = 0;
    for (const op of delta.ops) {
      let saveOp = this.lastSaved.ops[i];
      i++;
      // If there are embeds either image or video
      if (typeof op.insert === 'object' && typeof saveOp.insert === 'object') {
        let embeds = Object.keys(op.insert);
        let saveEmbeds = Object.keys(saveOp.insert);

        // If they dont't have the same length can move on
        if (embeds.length != saveEmbeds.length) {
          this.canSave = true;
          break;
        }

        // Comparison between 2 embeds as objects
        if (!isEqual(embeds, saveEmbeds)) {
          this.canSave = true;
          break;
        }
      }// if the inserts are just a strings
      else if (typeof op.insert === 'string' && typeof saveOp.insert === 'string') {
        if (!isEqual(op.insert, saveOp.insert)) {
          this.canSave = true;
          break;
        }
      }

      //Check if they have the same attributes
      if (!isEqual(op.attributes, saveOp.attributes)) {
        this.canSave = true;
        break;
      }
    };
  }

  private onStop() {
    this.stopListen.subscribe(async (request) => {
      if (request) {
        await this.save();
        this.articleResult.emit(this.article);
      }
    })
  }

  private _preventQuillJump() {
    document.querySelectorAll(".ql-picker").forEach(tool => {
      tool.addEventListener("mousedown", function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    });
  }

  private onClose() {
    this.closeListen.subscribe((request) => {
      if (request)
        if (this.canSave)
          this.warningUser();
        else
          this.informUser();
    })
  }

  private informUser() {
    let bottomRef = this.bottomSheet.open(BottomSheetComponent, {
      data: this.inform
    })

    bottomRef.afterDismissed().subscribe(async (action: DocumentLeave) => {
      switch (action) {
        case DocumentLeave.Close: {
          this.closeResult.emit(DocumentLeave.Close);
          break;
        }
        case DocumentLeave.Cancel: {
          this.closeResult.emit(DocumentLeave.Cancel);
          break;
        }
        default: this.closeResult.emit(DocumentLeave.Cancel);
      }
    })

  }

  private async warningUser() {
    let bottomRef = this.bottomSheet.open(BottomSheetComponent, {
      data: this.warn
    })

    bottomRef.afterDismissed().subscribe(async (action: DocumentLeave) => {
      switch (action) {
        case DocumentLeave.Save: {
          await this.save();
          this.closeResult.emit(DocumentLeave.Save);
          break;
        }
        case DocumentLeave.Discard: {
          this.closeResult.emit(DocumentLeave.Discard);
          break;
        }
        case DocumentLeave.Cancel: {
          this.closeResult.emit(DocumentLeave.Cancel);
          break;
        }
        default: this.closeResult.emit(DocumentLeave.Cancel);
      }
    })
  }

  private createArticle() {    
    this.article = new ArticleModel(JSON.stringify(this.lastSaved), this.moduleId);
    this.article.name = this.nameGen();
  }

  private nameGen(): string {
    let name: string;

    for (const op of this.lastSaved.ops) {
      if (typeof op.insert === 'string') {
        name = op.insert.trim().replace('\n', '').split(/\s/, 5).join(' ');
        break;
      }
    }

    return name ?? `Rascunho ${Date.now}`;
  }

  private updatArticle(delta: Delta) {
    this.article.delta = JSON.stringify(delta);
  }
}
