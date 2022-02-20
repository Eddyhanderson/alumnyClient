import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeacherPlaceModel } from 'src/app/models/teacher-place-model/teacher-place.model';

@Component({
  selector: 'app-lesson-detail-form',
  templateUrl: './lesson-detail-form.component.html',
  styleUrls: ['./lesson-detail-form.component.scss']
})
export class LessonDetailFormComponent implements OnInit {

  // To handle with video detail forms
  public titleCtl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(100)])
  public descriptionCtl: FormControl = new FormControl('', Validators.required);
  public isPublic: FormControl = new FormControl(true, Validators.required);
  detailFg: FormGroup;

  constructor(private fb: FormBuilder) { }

  @Output("result")
  pickResult = new EventEmitter<FormGroup>();

  private listenFormChanges() {
    this.detailFg.valueChanges.subscribe(_ => {
      this.pickResult.emit(this.detailFg);
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.listenFormChanges();
  }

  private initForm() {
    this.detailFg = this.fb.group({
      title: this.titleCtl,
      description: this.descriptionCtl,
      isPublic: this.isPublic
    });
  }

}
