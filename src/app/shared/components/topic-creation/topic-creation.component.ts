import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Quill from 'quill';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DisciplineTopicModel } from 'src/app/models/discipline-topic-model/discipline-topic.model';
import { TopicModel } from 'src/app/models/topic-model/topic.model';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { DisciplineTopicService } from 'src/app/services/discipline-topic-service/discipline-topic.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { TopicService } from 'src/app/services/topic-service/topic.service';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-topic-creation',
  templateUrl: './topic-creation.component.html',
  styleUrls: ['./topic-creation.component.scss']
})
export class TopicCreationComponent implements OnInit {
  // To handle with discipline topic of lesson selection
  public disciplineTopicsFiltered$: Observable<DisciplineTopicModel[]>;

  public topicNameCtl: FormControl = new FormControl('', [Validators.required]);

  // Models  
  public disciplineTopic: DisciplineTopicModel;
  public topic: TopicModel;

  file: File;
  fileName: string;
  imgUrl:string;

  // Flags
  descriptEmpty: boolean = false;
  submited: boolean = false;

  @Input() teacherPlaceId: string;

  @Output() topicCreated = new EventEmitter<TopicModel>();


  @ViewChild('editor') editor: ElementRef<HTMLElement>;
  quills: Quill;

  constructor(private ts: TopicService,
    private fb: FormBuilder,
    private dts: DisciplineTopicService,
    private snack: MatSnackBar,
    private is: ImageService) { }

  ngOnInit(): void {
    if (this.teacherPlaceId == null) throw new Error("TeacherPlace required");
    this.disciplineTopicValueChanges();
  }

  ngAfterViewInit(): void {
    this.quills = new Quill(this.editor.nativeElement, {
      theme: 'snow'
    });
  }

  public disciplineTopicValueChanges() {

    this.topicNameCtl.valueChanges.subscribe((value) => {
      let key;
      key = typeof value === 'string' ? value : value.name;
      this.disciplineTopicsFiltered$ = this.getAllDisciplineTopicFilter(key).pipe(map(response => response.data));
      console.dir(this.disciplineTopicsFiltered$);
    })
  }

  public async uploadEvt(event) {
    this.file = event.target.files[0];

    this.fileName = this.file.name;
  }

  public async onTopicCreate() {

    if (!this.topicNameCtl.valid) return;

    if (this.isQuillEmpty(this.quills)) {
      this.descriptEmpty = true;
      return;
    }

    this.submited = true;
    await this.uploadImage();
    await this.disciplineTopicCreation();

    if (this.disciplineTopic == null) {
      this.snack.open(Constants.FAIL_OPERATION_MESSAGE);
      return
    };

    this.topic = {
      disciplineTopicId: this.disciplineTopic.id,
      teacherPlaceId: this.teacherPlaceId,
      description: JSON.stringify(this.quills.getContents()),
      photoProfile:this.imgUrl
    }

    var result = await this.ts.create(this.topic);

    if (result.succeded) {
      await this.snack.open("Tópico criado com sucesso.").afterDismissed().toPromise();
      this.topicCreated.emit(result.data);
      this.cleanData();

    } else {
      this.snack.open(Constants.FAIL_OPERATION_MESSAGE);
    }

  }

  public async  uploadImage() {
    if (this.file != null) {
      this.imgUrl = (await this.is.uploadTopicImage(this.file).toPromise()).data;
    }
  }

  public removeImage() {
    this.file = null;
    this.fileName = null;
  }

  public async disciplineTopicCreation() {
    if (typeof this.topicNameCtl.value === 'string') {
      let disciplineTopic: DisciplineTopicModel = {
        name: this.topicNameCtl.value
      }

      let stt = await this.dts.create(disciplineTopic);

      if (!stt.succeded) {
        this.snack.open(Constants.FAIL_OPERATION_MESSAGE);
        return null;
      }

      this.disciplineTopic = stt.data;
    } else {
      this.disciplineTopic = this.topicNameCtl.value[0];
    }
  }

  public displayFn(disciplineTopic: DisciplineTopicModel) {
    return disciplineTopic && disciplineTopic.name ? disciplineTopic.name : '';
  }

  private cleanData() {
    this.topicNameCtl.setValue("");
    this.quills.setText("");
    this.disciplineTopic = null;
    this.topicCreated = null;
    this.fileName = null;
    this.file = null;
    this.submited = false;
  }

  private getAllDisciplineTopicFilter(value: string) {
    if (value == undefined || value == null)
      return null;

    let query = new PaginationQuery(1, 10, value);

    return this.dts.getAll(query);
  }

  private isQuillEmpty(quill) {
    if ((quill.getContents()['ops'] || []).length !== 1) { return false }
    return quill.getText().trim().length === 0
  }

}
