import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonWatchCreateQuestionComponent } from './lesson-create-question.component';

describe('VideoLessonCreateQuestionComponent', () => {
  let component: LessonWatchCreateQuestionComponent;
  let fixture: ComponentFixture<LessonWatchCreateQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonWatchCreateQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonWatchCreateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});