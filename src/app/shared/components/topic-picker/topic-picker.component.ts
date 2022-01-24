import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TopicModel } from 'src/app/models/topic-model/topic.model';
import { PaginationQuery } from 'src/app/queries/pagination-query/pagination-query';
import { TopicQuery } from 'src/app/queries/topic-query/topic.query';
import { TopicService } from 'src/app/services/topic-service/topic.service';

@Component({
  selector: 'app-topic-picker',
  templateUrl: './topic-picker.component.html',
  styleUrls: ['./topic-picker.component.scss']
})
export class TopicPickerComponent implements OnInit {

  //Models
  public topic: TopicModel;
  public topics: TopicModel[];

  // Form controls
  public topicCtl: FormControl = new FormControl('', [Validators.required]);

  // Flags
  public topicCreation: boolean = false;

  @Input("teacherPlace")
  teacherPlaceId: string;

  @Output("result")
  pickResult = new EventEmitter<FormControl>();

  constructor(private ts: TopicService,) { }

  public async ngOnInit() {
    if (this.teacherPlaceId == null) throw Error("Teacherplace is required");
    await this.getAllTopic();
    this.listenFormChanges();
  }

  public onCreateTopic(topic: TopicModel) {
    if (topic != null) {
      this.topic = topic;
    }
  }

  private async getAllTopic() {
    let param = new TopicQuery();
    param.teacherPlaceId = this.teacherPlaceId;

    let query = new PaginationQuery(1, -1);

    this.topics = (await this.ts.getAll(query, param).toPromise()).data;
  }

  private listenFormChanges(){
    this.topicCtl.valueChanges.subscribe(_ => {
      this.pickResult.emit(this.topicCtl);
    })
  }
}
